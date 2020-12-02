import {Course} from './course';
import {Teacher} from './teacher';
import {Class} from './class';
import {Site} from './site';

export class Schedule {
  id: number;
  termYear: number;
  termMonth: number;

  weekno: number;
  dayOfWeek: number;
  date: string;

  timeStart: number;
  timeEnd: number;
  trainingType: string; // N: 理论课；S: 校内实现；E: 企业实训

  siteId?: number;
  classId?: number;
  courseCode?: number;
  teacherId?: number;

  site?: Site;
  theClass?: Class;
  course?: Course;
  teacher?: Teacher;

}
