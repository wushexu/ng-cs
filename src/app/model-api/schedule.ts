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
  trainingType: string; // N: 理论课；S: 校内实训；E: 企业实训

  siteId?: number;
  classId?: number;
  courseCode?: string;
  teacherId?: number;

  site?: Site;
  theClass?: Class;
  course?: Course;
  teacher?: Teacher;

  static classTooltip(theClass: Class): string {
    if (!theClass) {
      return null;
    }
    const {dept, major} = theClass;

    const tips = [];
    if (dept) {
      tips.push(`系部：${dept.name}`);
    }
    if (major) {
      tips.push(`专业：${major.name}`);
    }
    return tips.join('\n');
  }

  static courseTooltip(course: Course): string {
    if (!course) {
      return '';
    }

    const tips = [];

    if (course.style) {
      tips.push(`课程性质：${course.style}`);
    }
    if (course.cate) {
      tips.push(`课程类别：${course.cate}`);
    }
    if (course.examineMethod) {
      tips.push(`考核方式：${course.examineMethod}`);
    }
    if (course.locationType) {
      tips.push(`场地要求：${course.locationType}`);
    }
    return tips.join('\n');
  }
}
