import {object} from 'underscore';

export type Perspective = 'class' | 'teacher' | 'classroom';
export type TimeScope = 'day' | 'week' | 'month' | 'term';

export class PerspectiveDef {
  static All: PerspectiveDef[] = [
    {key: 'class', name: '班级'},
    {key: 'teacher', name: '教师'},
    {key: 'classroom', name: '教室'}
  ];

  static KeyNameMap = object(PerspectiveDef.All.map(p => [p.key, p.name]));

  key: Perspective;
  name: string;

  static getName(key: Perspective): string {
    return PerspectiveDef.KeyNameMap[key];
  }
}

export class TimeScopeDef {
  static All: TimeScopeDef[] = [
    {key: 'day', name: '单日'},
    {key: 'week', name: '单周'},
    {key: 'month', name: '单月'},
    {key: 'term', name: '学期'}
  ];

  static KeyNameMap = object(TimeScopeDef.All.map(p => [p.key, p.name]));

  key: TimeScope;
  name: string;

  static getName(key: TimeScope): string {
    return TimeScopeDef.KeyNameMap[key];
  }
}


export class ScheduleFilter {

  /* Schedule properties Begin */

  termYear?: number;
  termMonth?: number;

  weekno?: number;
  dayOfWeek?: number;
  date?: string;

  timeStart?: number;
  // timeEnd?: number;
  trainingType?: string; // N: 理论课；S: 校内实训；E: 企业实训

  siteId?: number;
  classId?: number;
  courseCode?: string;
  teacherId?: number;

  /* Schedule properties End */

  lesson?: number; // 1-4
  yearMonth?: string;
  deptId?: number;
  majorId?: number;
  classYear?: number;

  courseCate?: string;
}
