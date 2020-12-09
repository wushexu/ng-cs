import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Schedule} from '../model-api/schedule';
import {Class} from '../model-api/class';
import {Course} from '../model-api/course';
import {Teacher} from '../model-api/teacher';
import {Site} from '../model-api/site';
import {ClassService} from './class.service';
import {ScheduleFilter, StatisticParams} from '../model-app/schedule-params';
import {DeptMajorService} from './dept-major.service';
import {TeacherService} from './teacher.service';
import {ClassroomService} from './classroom.service';
import {CourseService} from './course.service';
import {ScheduleAggregated} from '../model-api/schedule-aggregated';
import {Dept} from '../model-api/dept';
import {Major} from '../model-api/major';


@Injectable()
export class ScheduleService {

  schedulesBaseUrl: string;
  statisBaseUrl: string;

  constructor(protected http: HttpClient,
              private deptMajorService: DeptMajorService,
              private classService: ClassService,
              private teacherService: TeacherService,
              private classroomService: ClassroomService,
              private courseService: CourseService) {
    const base = environment.apiBase;
    this.schedulesBaseUrl = `${base}/schedules`;
    this.statisBaseUrl = `${base}/schedules-statis`;
  }

  querySchedules(filter: ScheduleFilter): Observable<Schedule[]> {

    console.log(filter);

    const params = [];
    for (const name in filter) {
      if (!filter.hasOwnProperty(name)) {
        continue;
      }
      params.push(`${name}=${filter[name]}`);
    }

    const url = this.schedulesBaseUrl + '?' + params.join('&');
    console.log(url);

    const $schedules = this.http.get<Schedule[]>(url);

    const $classesMap: Observable<Map<number, Class>> = this.classService.getClassesMap();
    const $coursesMap: Observable<Map<string, Course>> = this.courseService.getCoursesMap();
    const $teachersMap: Observable<Map<number, Teacher>> = this.teacherService.getTeachersMap();
    const $sitesMap: Observable<Map<number, Site>> = this.classroomService.getClassroomsMap();

    return combineLatest([
      $schedules,
      $classesMap,
      $coursesMap,
      $teachersMap,
      $sitesMap])
      .pipe(
        map(([
               schedules,
               classesMap,
               coursesMap,
               teachersMap,
               sitesMap]) => {

          for (const schedule of schedules) {
            schedule.theClass = classesMap.get(schedule.classId);
            schedule.course = coursesMap.get(schedule.courseCode);
            schedule.teacher = teachersMap.get(schedule.teacherId);
            schedule.site = sitesMap.get(schedule.siteId);
          }

          console.log('Count: ' + schedules.length);
          console.log(schedules);

          return schedules;
        })
      );
  }

  statisticSchedules(filter: ScheduleFilter, statisticParams: StatisticParams): Observable<ScheduleAggregated[]> {

    console.log(filter);

    const params = [];
    for (const name in filter) {
      if (!filter.hasOwnProperty(name)) {
        continue;
      }
      params.push(`${name}=${filter[name]}`);
    }
    params.push(`groupBy=${statisticParams.groupBy}`);

    const url = this.statisBaseUrl + '?' + params.join('&');
    console.log(url);

    const $schedules = this.http.get<ScheduleAggregated[]>(url);

    const $classesMap: Observable<Map<number, Class>> = this.classService.getClassesMap();
    const $coursesMap: Observable<Map<string, Course>> = this.courseService.getCoursesMap();
    const $teachersMap: Observable<Map<number, Teacher>> = this.teacherService.getTeachersMap();
    const $sitesMap: Observable<Map<number, Site>> = this.classroomService.getClassroomsMap();

    return combineLatest([
      $schedules,
      $classesMap,
      $coursesMap,
      $teachersMap,
      $sitesMap])
      .pipe(
        map(([
               schedules,
               classesMap,
               coursesMap,
               teachersMap,
               sitesMap]) => {

          for (const schedule of schedules) {
            if (schedule.termId) {
              //
            }
            if (schedule.classId) {
              schedule.theClass = classesMap.get(schedule.classId);
            }
            if (schedule.deptId) {
              const deptsMap: Map<number, Dept> = this.deptMajorService.deptsMap;
              schedule.dept = deptsMap.get(schedule.deptId);
            }
            if (schedule.majorId) {
              const majorsMap: Map<number, Major> = this.deptMajorService.majorsMap;
              schedule.major = majorsMap.get(schedule.majorId);
            }
            if (schedule.courseCode) {
              schedule.course = coursesMap.get(schedule.courseCode);
            }
            if (schedule.teacherId) {
              schedule.teacher = teachersMap.get(schedule.teacherId);
            }
            if (schedule.siteId) {
              schedule.site = sitesMap.get(schedule.siteId);
            }
          }

          console.log('Count: ' + schedules.length);
          console.log(schedules);

          return schedules;
        })
      );
  }

}
