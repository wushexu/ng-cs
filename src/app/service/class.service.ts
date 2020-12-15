import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, combineLatest, of} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Major} from '../model-api/major';
import {Class} from '../model-api/class';
import {DeptMajorService} from './dept-major.service';
import {DATA_CACHE_TIME} from '../config';


@Injectable()
export class ClassService {

  classesBaseUrl: string;

  $classes: Observable<Class[]>;

  classesMap: Map<number, Class>;

  constructor(protected http: HttpClient,
              private deptMajorService: DeptMajorService) {
    const base = environment.apiBase;
    this.classesBaseUrl = `${base}/classes`;

    setInterval(() => {
        this.$classes = null;
        this.classesMap = null;
      },
      DATA_CACHE_TIME);
  }


  getClasses(): Observable<Class[]> {
    if (this.$classes) {
      return this.$classes;
    }

    const $majorsMap = this.deptMajorService.getMajorsMap();
    const $classes = this.http.get<Class[]>(this.classesBaseUrl);
    this.$classes = combineLatest([$majorsMap, $classes])
      .pipe(
        map(([majorsMap, classes]) => {
          const classesMap = new Map<number, Class>();
          for (const cla of classes) {
            classesMap.set(cla.id, cla);
            const major = majorsMap.get(cla.majorId);
            if (major) {
              cla.major = major;
              cla.dept = major.dept;
            }
          }
          this.classesMap = classesMap;

          classes.sort((c1, c2) => c1.name.localeCompare(c2.name));

          return classes;
        }),
        shareReplay()
      );

    return this.$classes;
  }

  getClassesMap(): Observable<Map<number, Class>> {
    if (this.classesMap) {
      return of(this.classesMap);
    }

    return this.getClasses()
      .pipe(
        map(classes => this.classesMap)
      );
  }

  getClassByIdc(idc: string): Observable<Class> {
    return this.http.get<Class>(`${this.classesBaseUrl}/idc/${idc}`);
  }

}
