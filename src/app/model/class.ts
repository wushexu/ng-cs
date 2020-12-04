import {Major} from './major';
import {Dept} from './dept';

export class Class {
  id: number;
  name: string;
  degree: string;
  year: number;
  classNo: number;
  size: number;

  deptId?: number;
  majorId?: number;

  dept?: Dept;
  major?: Major;

}
