import {Course} from './course';
import {Teacher} from './teacher';
import {Class} from './class';
import {Site} from './site';
import {MergedClass} from '../model-app/merged-class';
import {MergedTeacher} from '../model-app/merged-teacher';

export class Schedule {
  id: number;
  termId: string;

  weekno: number;
  dayOfWeek: number;
  date: string;

  timeStart: number; // 1,3,5,7,9
  timeEnd: number; // 2,4,6,8,10
  // timeSpan: number;
  lessonSpan: number;
  courseType: string; // N: 理论课；T: 实训课
  trainingType: string; // S: 校内实训；E: 企业实训

  classIds: number[];
  teacherIds: number[];

  siteId?: number;
  classId?: number;
  courseCode?: string;
  teacherId?: number;
  classesCount?: number;
  teachersCount?: number;

  site?: Site;
  course?: Course;
  theClass?: Class | MergedClass;
  teacher?: Teacher | MergedTeacher;

  // classes?: Class[];
  // teachers?: Teacher[];

  static getLessonLabel(lessonIndex: number/* 1-5 */) {
    const indexZh = ['一', '二', '三', '四', '五'][lessonIndex - 1];
    return `第${indexZh}节`;
  }
}
