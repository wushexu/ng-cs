import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {groupBy, pairs, uniq, flatten} from 'underscore';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {sum} from '../common/util';
import {Schedule} from '../model-api/schedule';
import {ScheduleFilter, SummaryStatisticParams} from '../model-app/schedule-params';
import {SummaryStatistic} from '../model-app/summary-statistic';
import {ScheduleService} from './schedule.service';
import {ScheduleAggregated} from '../model-api/schedule-aggregated';
import {DATA_CACHE_TIME, DEBUG} from '../config';


export declare type SummaryDrillType = 'class' | 'site' | 'teacher' | 'courseN' | 'courseT';

@Injectable()
export class SummaryStatisticService {

  summaryBaseUrl: string;

  summaryStatisticMap: Map<string, SummaryStatistic> = new Map<string, SummaryStatistic>();
  dailySchedulesForStatisticMap: Map<string, Schedule[]> = new Map<string, Schedule[]>();

  constructor(protected http: HttpClient,
              private scheduleService: ScheduleService) {
    const base = environment.apiBase;
    this.summaryBaseUrl = `${base}/schedules-summary-statis`;

    setInterval(() => {
        this.summaryStatisticMap.clear();
        this.dailySchedulesForStatisticMap.clear();
      },
      DATA_CACHE_TIME / 2);
  }

  requestSummary(filter: ScheduleFilter, summaryParams: SummaryStatisticParams): Observable<object> {

    if (DEBUG) {
      console.log(filter);
    }

    const params = [];
    for (const name in filter) {
      if (!filter.hasOwnProperty(name)) {
        continue;
      }
      params.push(`${name}=${filter[name]}`);
    }
    params.push(`distinct=${summaryParams.distinct}`);

    const url = this.summaryBaseUrl + '?' + params.join('&');
    if (DEBUG) {
      console.log(url);
    }

    return this.http.get<object>(url);
  }

  private doBuildSummary(schedules: Schedule[]): SummaryStatistic {

    const summary = new SummaryStatistic();
    if (!schedules || schedules.length === 0) {
      return summary;
    }

    summary.classCount = uniq(flatten(schedules.map(s => s.classIds))).length;
    summary.studentCount = sum(uniq(flatten(schedules.map(s => s.classes))).map(c => c?.size));
    summary.classroomCount = uniq(schedules.map(s => s.siteId)).length;
    summary.teacherCount = uniq(flatten(schedules.map(s => s.teacherIds))).length;
    summary.theoryCourseCount = uniq(schedules.filter(s => s.courseType === 'N').map(s => s.courseCode)).length;
    summary.trainingCourseCount = uniq(schedules.filter(s => s.courseType === 'T').map(s => s.courseCode)).length;

    return summary;
  }


  buildSummaryOfDate(date: string): Observable<SummaryStatistic> {

    const cachedSummary = this.summaryStatisticMap.get(date);
    if (cachedSummary) {
      return of(cachedSummary);
    }

    return this.scheduleService.query({date})
      .pipe(
        map((
          schedules) => {

          if (DEBUG) {
            console.log('Count: ' + schedules.length);
            // console.log(schedules);
          }

          const summary = this.doBuildSummary(schedules);
          summary.date = date;

          this.summaryStatisticMap.set(date, summary);
          this.dailySchedulesForStatisticMap.set(date, schedules);

          return summary;
        })
      );
  }


  buildSummaryOfLesson(date: string, lessonIndex: number): Observable<SummaryStatistic> {

    const cachedKey = `${date}:${lessonIndex}`;
    const cachedSummary = this.summaryStatisticMap.get(cachedKey);
    if (cachedSummary) {
      return of(cachedSummary);
    }

    return this.buildSummaryOfDate(date).pipe(
      map(daySummary => {

        const daySchedules = this.dailySchedulesForStatisticMap.get(date) || [];
        // lessonIndex: 1-5,
        const ts = lessonIndex * 2 - 1;
        const lessonSchedules = daySchedules.filter(s => s.timeStart <= ts && ts <= s.timeEnd);
        const summary = this.doBuildSummary(lessonSchedules);
        summary.date = date;
        summary.lesson = lessonIndex;

        this.summaryStatisticMap.set(cachedKey, summary);

        return summary;
      })
    );
  }

  private joinClasses(daySchedules: Schedule[]): Schedule[] {

    const schedules: Schedule[] = [];
    for (const schedule of daySchedules) {
      const classes = schedule.classes;
      if (classes.length === 0) {
        continue;
      }
      if (classes.length === 1) {
        schedule.theClass = classes[0];
        schedule.classId = schedule.theClass?.id;
        schedules.push(schedule);
      } else {
        for (const cla of classes) {
          const sch: Schedule = Object.assign(new Schedule(), schedule);
          sch.theClass = cla;
          sch.classId = cla.id;
          sch.classIds = [cla.id];
          sch.classes = [cla];
          // sch.classesCount = 1;
          schedules.push(sch);
        }
      }
    }
    return schedules;
  }

  private joinTeachers(daySchedules: Schedule[]): Schedule[] {

    const schedules: Schedule[] = [];
    for (const schedule of daySchedules) {
      const teachers = schedule.teachers;
      if (teachers.length === 0) {
        continue;
      }
      if (teachers.length === 1) {
        schedule.teacher = teachers[0];
        schedule.teacherId = schedule.teacher.id;
        schedules.push(schedule);
      } else {
        for (const tea of teachers) {
          const sch: Schedule = Object.assign(new Schedule(), schedule);
          sch.teacher = tea;
          sch.teacherId = tea.id;
          sch.teacherIds = [tea.id];
          sch.teachers = [tea];
          // sch.teachersCount = 1;
          schedules.push(sch);
        }
      }
    }
    return schedules;
  }

  private sumFromDailySchedules(date: string,
                                drillType: SummaryDrillType,
                                daySchedules: Schedule[]): ScheduleAggregated[] {

    let idField: string;
    let objField: string;
    if (drillType.startsWith('course')) {
      idField = 'courseCode';
      objField = 'course';
      const courseType = drillType.substr(6); // N/T
      daySchedules = daySchedules.filter(s => s.courseType === courseType);
    } else {
      idField = drillType + 'Id';
      if (drillType === 'class') {
        objField = 'theClass';
      } else {
        objField = drillType;
      }
    }
    if (drillType === 'class') {
      daySchedules = this.joinClasses(daySchedules);
    }
    if (drillType === 'teacher') {
      daySchedules = this.joinTeachers(daySchedules);
    }

    return pairs(groupBy(daySchedules, idField))
      .map(([idValueStr, schedules]) => {
        const obj = schedules[0][objField];
        const lessonCount = sum(schedules.map(s => s.lessonSpan));
        return {[objField]: obj, lessonCount};
      });
  }

  drillSummaryOfDate(date: string, drillType: SummaryDrillType): Observable<ScheduleAggregated[]> {

    return this.buildSummaryOfDate(date).pipe(
      map(daySummary => {
        if (DEBUG) {
          console.log(daySummary);
        }

        const daySchedules: Schedule[] = this.dailySchedulesForStatisticMap.get(date) || [];

        return this.sumFromDailySchedules(date, drillType, daySchedules);
      })
    );
  }

  drillSummaryOfLesson(date: string, lessonIndex: number, drillType: SummaryDrillType): Observable<ScheduleAggregated[]> {

    return this.buildSummaryOfDate(date).pipe(
      map(daySummary => {
        if (DEBUG) {
          console.log(daySummary);
        }

        const daySchedules: Schedule[] = this.dailySchedulesForStatisticMap.get(date) || [];
        // lessonIndex: 1-5,
        const ts = lessonIndex * 2 - 1;
        const lessonSchedules = daySchedules.filter(s => s.timeStart <= ts && ts <= s.timeEnd);

        return this.sumFromDailySchedules(date, drillType, lessonSchedules);
      })
    );
  }

}
