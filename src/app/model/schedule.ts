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

// {
//   "id": 1,
//   "date": "2020-10-12",
//   "day_of_week": 1,
//   "term_month": 9,
//   "term_year": 2020,
//   "time_end": 2,
//   "time_start": 1,
//   "training_type": 'E',
//   "weekno": 6,
//   "course_code": "2001367",
//   "site_id": 240,
//   "teacher_id": 1,
//   "the_class_id": 1
// }
}
