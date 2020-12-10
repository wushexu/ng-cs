import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {reduce, uniq} from 'underscore';
import {combineLatest, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Schedule} from '../model-api/schedule';
import {Class} from '../model-api/class';
import {ClassService} from './class.service';
import {ScheduleFilter, SummaryStatisticParams} from '../model-app/schedule-params';
import {DeptMajorService} from './dept-major.service';
import {SummaryStatistic} from '../model-app/summary-statistic';
import {ScheduleService} from './schedule.service';


@Injectable()
export class SummaryStatisticService {

  summaryBaseUrl: string;

  summaryStatisticMap: Map<string, SummaryStatistic> = new Map<string, SummaryStatistic>();
  dailySchedulesForStatisticMap: Map<string, Schedule[]> = new Map<string, Schedule[]>();

  constructor(protected http: HttpClient,
              private scheduleService: ScheduleService,
              private deptMajorService: DeptMajorService,
              private classService: ClassService) {
    const base = environment.apiBase;
    this.summaryBaseUrl = `${base}/schedules-summary-statis`;
  }

  requestSummary(filter: ScheduleFilter, summaryParams: SummaryStatisticParams): Observable<object> {

    console.log(filter);

    const params = [];
    for (const name in filter) {
      if (!filter.hasOwnProperty(name)) {
        continue;
      }
      params.push(`${name}=${filter[name]}`);
    }
    params.push(`distinct=${summaryParams.distinct}`);

    const url = this.summaryBaseUrl + '?' + params.join('&');
    console.log(url);

    return this.http.get<object>(url);
  }

  private doBuildSummary(schedules: Schedule[]): SummaryStatistic {

    const summary = new SummaryStatistic();
    if (!schedules || schedules.length === 0) {
      return summary;
    }

    const classesMap: Map<number, Class> = this.classService.classesMap;
    for (const schedule of schedules) {
      schedule.theClass = classesMap.get(schedule.classId);
    }

    summary.classCount = uniq(schedules.map(s => s.classId)).length;
    summary.studentCount = reduce(uniq(schedules.map(s => s.theClass)).map(c => c ? c.size : 0),
      (sum, size) => sum + size || 0, 0);
    summary.classroomCount = uniq(schedules.map(s => s.siteId)).length;
    summary.teacherCount = uniq(schedules.map(s => s.teacherId)).length;
    summary.theoryCourseCount = uniq(schedules.filter(s => s.courseType === 'N').map(s => s.courseCode)).length;
    summary.trainingCourseCount = uniq(schedules.filter(s => s.courseType === 'T').map(s => s.courseCode)).length;

    return summary;
  }


  buildSummaryOfDate(date: string): Observable<SummaryStatistic> {

    const cachedSummary = this.summaryStatisticMap.get(date);
    if (cachedSummary) {
      return of(cachedSummary);
    }

    const url = `${this.scheduleService.schedulesBaseUrl}?date=${date}`;
    console.log(url);

    const $schedules = this.http.get<Schedule[]>(url);
    const $classesMap: Observable<Map<number, Class>> = this.classService.getClassesMap();

    return combineLatest([
      $schedules,
      $classesMap])
      .pipe(
        map(([
               schedules,
               classesMap]) => {

          console.log('Count: ' + schedules.length);
          console.log(schedules);

          const summary = this.doBuildSummary(schedules);

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

        this.summaryStatisticMap.set(cachedKey, summary);

        return summary;
      })
    );
  }

}
