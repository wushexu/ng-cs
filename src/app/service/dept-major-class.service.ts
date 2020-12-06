import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {MatDialog} from '@angular/material/dialog';

import {Observable, of} from 'rxjs';

import {environment} from '../../environments/environment';
import {Dept} from '../model-api/dept';
import {Major} from '../model-api/major';
import {Class} from '../model-api/class';


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

const major1: Major = {
  id: 1,
  degree: '高职',
  name: '理化测试与质检技术(无损检测技术)',
  shortName: '理化',
  dept: dept1
};

const major2: Major = {
  id: 2,
  degree: '高职',
  name: '计算机应用',
  shortName: '计算机应用',
  dept: dept2
};

const major3: Major = {
  id: 3,
  degree: '高职',
  name: '软件工程',
  shortName: '软件工程',
  dept: dept2
};

@Injectable()
export class DeptMajorClassService {

  constructor(protected http: HttpClient) {
    // let apiBase = environment.apiBase || '';
    // this.baseUrl = `${apiBase}/profile`;
  }


  getDepts(): Observable<Dept[]> {
    return of([dept1, dept2]);
  }

  getDeptWithMajors(): Observable<Dept[]> {
    dept1.majors = [major1];
    dept2.majors = [major2, major3];
    return of([dept1, dept2]);
  }

  getMajors(): Observable<Major[]> {
    return of([major1, major2, major3]);
  }

  getClasses(): Observable<Class[]> {

    return of([
      {
        id: 1,
        classNo: 1,
        degree: '高职',
        name: '理化19-1',
        size: 40,
        year: 2019,
        dept: dept1,
        major: major1
      },
      {
        id: 2,
        classNo: 2,
        degree: '高职',
        name: '理化19-2',
        size: 40,
        year: 2019,
        dept: dept1,
        major: major1
      },
      {
        id: 3,
        classNo: 1,
        degree: '高职',
        name: '计算机1',
        size: 40,
        year: 2019,
        dept: dept2,
        major: major2
      },
      {
        id: 4,
        classNo: 1,
        degree: '高职',
        name: '计算机2',
        size: 40,
        year: 2019,
        dept: dept2,
        major: major2
      },
      {
        id: 5,
        classNo: 1,
        degree: '高职',
        name: '软工1',
        size: 40,
        year: 2019,
        dept: dept2,
        major: major3
      },
      {
        id: 6,
        classNo: 2,
        degree: '高职',
        name: '软工2',
        size: 40,
        year: 2019,
        dept: dept2,
        major: major3
      }
    ]);
  }

  getClassByIdc(idc: string): Observable<Class> {
    return of({
        id: 6,
        classNo: 2,
        degree: '高职',
        name: '软工2',
        size: 40,
        year: 2019,
        dept: dept1,
        major: major1
      }
    );
  }

}
