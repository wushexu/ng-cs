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
import {DEBUG} from '../config';
import {MergedClass} from '../model-app/merged-class';
import {MergedTeacher} from '../model-app/merged-teacher';


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

  query(filter: ScheduleFilter): Observable<Schedule[]> {

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

    const url = this.schedulesBaseUrl + '?' + params.join('&');
    if (DEBUG) {
      console.log(url);
    }

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
            schedule.course = coursesMap.get(schedule.courseCode);
            schedule.site = sitesMap.get(schedule.siteId);

            this.processClass(schedule, classesMap);
            this.processTeacher(schedule, teachersMap);
          }

          if (DEBUG) {
            console.log('Count: ' + schedules.length);
            // console.log(schedules);
          }

          return schedules;
        })
      );
  }

  private processClass(schedule: Schedule, classesMap: Map<number, Class>): void {

    const classIds = schedule.classIds;
    if (classIds && classIds.length > 0) {
      if (classIds.length === 1) {
        schedule.theClass = classesMap.get(classIds[0]);
      } else {
        const classes = classIds.map(id => classesMap.get(id)).filter(c => c);
        if (classes.length === 1) {
          schedule.theClass = classes[0];
        } else if (classes.length > 1) {
          schedule.theClass = MergedClass.mergeClasses(classes);
          schedule.classes = classes;
        }
      }
    }
    if (!schedule.classes) {
      if (schedule.theClass) {
        schedule.classes = [schedule.theClass];
      } else {
        schedule.classes = [];
      }
    }
  }

  private processTeacher(schedule: Schedule, teachersMap: Map<number, Teacher>): void {

    const teacherIds = schedule.teacherIds;
    if (teacherIds && teacherIds.length > 0) {
      if (teacherIds.length === 1) {
        schedule.teacher = teachersMap.get(teacherIds[0]);
      } else {
        const teachers = teacherIds.map(id => teachersMap.get(id)).filter(c => c);
        if (teachers.length === 1) {
          schedule.teacher = teachers[0];
        } else if (teachers.length > 1) {
          schedule.teacher = MergedTeacher.mergeTeachers(teachers);
          schedule.teachers = teachers;
        }
      }
    }
    if (!schedule.teachers) {
      if (schedule.teacher) {
        schedule.teachers = [schedule.teacher];
      } else {
        schedule.teachers = [];
      }
    }
  }

  statistic(filter: ScheduleFilter, statisticParams: StatisticParams): Observable<ScheduleAggregated[]> {

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
    params.push(`groupBy=${statisticParams.groupBy}`);

    const url = this.statisBaseUrl + '?' + params.join('&');
    if (DEBUG) {
      console.log(url);
    }

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

          if (DEBUG) {
            console.log('Count: ' + schedules.length);
            // console.log(schedules);
          }

          return schedules;
        })
      );
  }

}
