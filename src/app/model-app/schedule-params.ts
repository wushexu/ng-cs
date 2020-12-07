export class ScheduleFilter {

  /* Schedule properties Begin */

  termId?: string;

  weekno?: number;
  dayOfWeek?: number;
  date?: string;

  timeStart?: number;
  // timeEnd?: number;
  trainingType?: string; // N: 理论课；S: 校内实训；E: 企业实训

  siteId?: number;
  classId?: number;
  courseCode?: string;
  teacherId?: number;

  /* Schedule properties End */

  lesson?: number; // 1-4
  yearMonth?: string;
  deptId?: number;
  majorId?: number;
  classYear?: number;
  courseCate?: string;
}

export class StatisticParams {

  groupBy: string;
}
