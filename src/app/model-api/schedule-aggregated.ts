import {Course} from './course';
import {Teacher} from './teacher';
import {Class} from './class';
import {Site} from './site';
import {Dept} from './dept';
import {Major} from './major';
import {Term} from './term';

export class ScheduleAggregated {
  termId?: string;

  weekno?: number;
  dayOfWeek?: number;
  date?: string;

  timeStart?: number;
  timeEnd?: number;
  courseType: string;
  trainingType?: string;

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

  term?: Term;
  site?: Site;
  dept?: Dept;
  major?: Major;
  theClass?: Class;
  course?: Course;
  teacher?: Teacher;

}
