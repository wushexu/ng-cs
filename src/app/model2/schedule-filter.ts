import {object} from 'underscore';
import {Schedule} from '../model/schedule';

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


export class ScheduleFilter extends Schedule {

  yearMonth: string;
}
