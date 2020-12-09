import {Course} from './course';
import {Teacher} from './teacher';
import {Class} from './class';
import {Site} from './site';

export class Schedule {
  id: number;
  termId: string;

  weekno: number;
  dayOfWeek: number;
  date: string;

  timeStart: number;
  timeEnd: number;
  courseType: string; // N: 理论课；T: 实训课
  trainingType: string; // S: 校内实训；E: 企业实训

  siteId?: number;
  classId?: number;
  courseCode?: string;
  teacherId?: number;

  site?: Site;
  theClass?: Class;
  course?: Course;
  teacher?: Teacher;

}
