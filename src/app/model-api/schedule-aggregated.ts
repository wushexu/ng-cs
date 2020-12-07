import {Course} from './course';
import {Teacher} from './teacher';
import {Class} from './class';
import {Site} from './site';

export class ScheduleAggregated {
  termId?: string;

  weekno?: number;
  dayOfWeek?: number;
  date?: string;

  timeStart?: number;
  timeEnd?: number;
  trainingType?: string; // N: 理论课；S: 校内实训；E: 企业实训

  siteId?: number;
  classId?: number;
  courseCode?: string;
  teacherId?: number;

  //

  // lesson?: number; // 1-4
  // yearMonth?: string;
  deptId?: number;
  majorId?: number;
  classYear?: number;

  // agg(sum) fields

  recordCount?: number;
  lessonCount?: number;
  lessonTime?: number;

  // local

  site?: Site;
  theClass?: Class;
  course?: Course;
  teacher?: Teacher;

}
