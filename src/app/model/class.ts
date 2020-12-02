import {Major} from './major';

export class Class {
  id: number;
  name: string;
  degree: string;
  year: number;
  classNo: number;
  size: number;

  majorId?: number;
  major?: Major;

}
