import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {MatDialog} from '@angular/material/dialog';

import {Observable, of} from 'rxjs';

import {environment} from '../../environments/environment';
import {Schedule} from '../model/schedule';
import {Dept} from '../model/dept';
import {Major} from '../model/major';
import {Class} from '../model/class';
import {Course} from '../model/course';
import {Teacher} from '../model/teacher';
import {Site} from '../model/site';


@Injectable()
export class ClassroomService {

  // constructor(protected http: HttpClient,
  //             protected dialog: MatDialog) {
  //   super(http, dialog);
  //   let apiBase = environment.apiBase || '';
  //   this.baseUrl = `${apiBase}/profile`;
  // }

  getClassrooms(): Observable<Site[]> {

    const dept1: Dept = {
      id: 1,
      name: '工程技术系',
      shortName: '工程系',
      type: null
    };

    const dept2: Dept = {
      id: 2,
      name: '信息技术系',
      shortName: '工程系',
      type: null
    };

    return of([
      {
        id: 1,
        capacity: 0,
        code: '90194',
        memo: null,
        multimedia: '',
        name: '信息223A',
        name4training: '',
        roomType: '标准教室',
        shortName: null,
        dept: dept2
      },
      {
        id: 2,
        capacity: 0,
        code: '90195',
        memo: null,
        multimedia: '',
        name: 'JX2-206',
        name4training: '',
        roomType: '合班教室',
        shortName: null,
        dept: dept1
      }
    ]);
  }

}
