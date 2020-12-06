import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {combineLatest, Observable, of} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Site} from '../model-api/site';
import {DeptMajorService} from './dept-major.service';


@Injectable()
export class ClassroomService {

  classroomsBaseUrl: string;

  $classrooms: Observable<Site[]>;

  classroomsMap: Map<number, Site>;

  constructor(protected http: HttpClient,
              private deptMajorService: DeptMajorService) {
    const base = environment.apiBase;
    this.classroomsBaseUrl = `${base}/sites`;
  }

  getClassrooms(): Observable<Site[]> {

    if (this.$classrooms) {
      return this.$classrooms;
    }

    const $classrooms = this.http.get<Site[]>(this.classroomsBaseUrl);
    this.$classrooms = combineLatest([this.deptMajorService.getDepts(), $classrooms])
      .pipe(
        map(([depts, rooms]) => {
          const roomsMap = new Map<number, Site>();
          for (const room of rooms) {
            roomsMap.set(room.id, room);
            room.dept = depts.find(d => d.id === room.deptId);
          }
          this.classroomsMap = roomsMap;
          return rooms;
        }),
        shareReplay()
      );

    return this.$classrooms;
  }

  getClassroomsMap(): Observable<Map<number, Site>> {
    if (this.classroomsMap) {
      return of(this.classroomsMap);
    }

    return this.getClassrooms()
      .pipe(
        map(rooms => this.classroomsMap)
      );
  }

  getClassroom(id: number): Observable<Site> {
    if (this.classroomsMap) {
      return of(this.classroomsMap.get(id));
    }
    return this.http.get<Site>(`${this.classroomsBaseUrl}/${id}`);
  }

}
