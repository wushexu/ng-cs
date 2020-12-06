import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {Course} from '../model-api/course';
import {environment} from '../../environments/environment';


@Injectable()
export class CourseService {

  coursesBaseUrl: string;

  $courses: Observable<Course[]>;

  coursesMap: Map<string, Course>;

  constructor(protected http: HttpClient) {
    const base = environment.apiBase;
    this.coursesBaseUrl = `${base}/courses`;
  }

  getCourses(): Observable<Course[]> {
    if (!this.$courses) {
      this.$courses = this.http.get<Course[]>(this.coursesBaseUrl)
        .pipe(
          tap(courses => {
            const coursesMap = new Map<string, Course>();
            for (const course of courses) {
              coursesMap.set(course.code, course);
            }
            this.coursesMap = coursesMap;
          }),
          shareReplay()
        );
    }
    return this.$courses;
  }

  getCoursesMap(): Observable<Map<string, Course>> {
    if (this.coursesMap) {
      return of(this.coursesMap);
    }

    return this.getCourses().pipe(
      map(courses => this.coursesMap)
    );
  }

}
