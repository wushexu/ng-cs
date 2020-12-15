import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Dept} from '../model-api/dept';
import {Major} from '../model-api/major';
import {DATA_CACHE_TIME} from '../config';


@Injectable()
export class DeptMajorService {

  deptsBaseUrl: string;
  majorsBaseUrl: string;

  $depts: Observable<Dept[]>;
  $deptWithMajors: Observable<Dept[]>;

  $majors: Observable<Major[]>;

  deptsMap: Map<number, Dept>;
  majorsMap: Map<number, Major>;

  constructor(protected http: HttpClient) {
    const base = environment.apiBase;
    this.deptsBaseUrl = `${base}/depts`;
    this.majorsBaseUrl = `${base}/majors`;

    setInterval(() => {
        this.$depts = null;
        this.$deptWithMajors = null;
        this.$majors = null;
        this.deptsMap = null;
        this.majorsMap = null;
      },
      DATA_CACHE_TIME);
  }


  getDepts(): Observable<Dept[]> {
    if (this.$depts) {
      return this.$depts;
    }

    this.$depts = this.http.get<Dept[]>(this.deptsBaseUrl)
      .pipe(
        tap(depts => {
          const deptsMap = new Map<number, Dept>();
          for (const dept of depts) {
            deptsMap.set(dept.id, dept);
          }
          this.deptsMap = deptsMap;
        }),
        shareReplay()
      );

    return this.$depts;
  }

  getDeptWithMajors(): Observable<Dept[]> {
    if (this.$deptWithMajors) {
      return this.$deptWithMajors;
    }

    const $depts = this.getDepts();
    const $majors = this.getMajors();
    this.$deptWithMajors = combineLatest([$depts, $majors])
      .pipe(
        map(([depts, majors]) => {
          for (const dept of depts) {
            dept.majors = [];
          }
          for (const major of majors) {
            const dept = this.deptsMap.get(major.deptId);
            if (dept) {
              dept.majors.push(major);
            }
          }
          return depts;
        }),
        shareReplay()
      );

    return this.$deptWithMajors;
  }

  getMajors(): Observable<Major[]> {
    if (this.$majors) {
      return this.$majors;
    }

    const $depts = this.getDepts();
    const $majors = this.http.get<Major[]>(this.majorsBaseUrl);
    this.$majors = combineLatest([$depts, $majors])
      .pipe(
        map(([depts, majors]) => {
          const majorsMap = new Map<number, Major>();
          for (const major of majors) {
            majorsMap.set(major.id, major);
            major.dept = this.deptsMap.get(major.deptId);
          }
          this.majorsMap = majorsMap;

          majors.sort((c1, c2) => c1.name.localeCompare(c2.name));

          return majors;
        }),
        shareReplay()
      );
    return this.$majors;
  }

  getDeptsMap(): Observable<Map<number, Dept>> {
    if (this.deptsMap) {
      return of(this.deptsMap);
    }

    return this.getDepts()
      .pipe(
        map(depts => this.deptsMap)
      );
  }

  getMajorsMap(): Observable<Map<number, Major>> {
    if (this.majorsMap) {
      return of(this.majorsMap);
    }

    return this.getMajors()
      .pipe(
        map(majors => this.majorsMap)
      );
  }

}
