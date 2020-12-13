import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {Teacher} from '../model-api/teacher';
import {environment} from '../../environments/environment';
import {DATA_CACHE_TIME} from '../config';


@Injectable()
export class TeacherService {

  teachersBaseUrl: string;

  $teachers: Observable<Teacher[]>;

  teachersMap: Map<number, Teacher>;

  constructor(protected http: HttpClient) {
    const base = environment.apiBase;
    this.teachersBaseUrl = `${base}/teachers`;

    setInterval(() => {
        this.$teachers = null;
        this.teachersMap = null;
      },
      DATA_CACHE_TIME);
  }


  filterTeachers(params: { size?: number, key?: string } = {}): Observable<Teacher[]> {
    // tslint:disable-next-line:prefer-const
    let {size, key} = params;
    if (typeof size === 'undefined') {
      size = 10;
    }

    // const numericKey = /\d+/.test(key);

    return this.getTeachers().pipe(
      map(teachers => {
        const filtered = [];
        let count = 0;
        for (const teacher of teachers) {
          if (!key || teacher.name.indexOf(key) >= 0 || teacher.code.indexOf(key) >= 0) {
            filtered.push(teacher);
            count++;
            if (size > 0 && count >= size) {
              break;
            }
          }
        }
        return filtered;
      })
    );
  }

  getTeacherByIdc(idc: string): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.teachersBaseUrl}/idc/${idc}`);
  }

  getTeachers(): Observable<Teacher[]> {
    if (!this.$teachers) {
      this.$teachers = this.http.get<Teacher[]>(this.teachersBaseUrl)
        .pipe(
          tap(teachers => {
            const teachersMap = new Map<number, Teacher>();
            for (const teacher of teachers) {
              teachersMap.set(teacher.id, teacher);
            }
            this.teachersMap = teachersMap;
          }),
          shareReplay()
        );
    }
    return this.$teachers;
  }

  getTeachersMap(): Observable<Map<number, Teacher>> {
    if (this.teachersMap) {
      return of(this.teachersMap);
    }

    return this.getTeachers().pipe(
      map(teachers => this.teachersMap)
    );
  }

}
