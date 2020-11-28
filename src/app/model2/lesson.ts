import {Schedule} from '../model/schedule';

export interface Lesson {
  schedule?: Schedule;
  startIndex?: number; // 0-4
  span: number;
}
