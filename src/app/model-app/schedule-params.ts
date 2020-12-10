export class ScheduleFilter {

  /* Schedule properties Begin */

  termId?: string;

  weekno?: number;
  dayOfWeek?: number;
  date?: string;

  timeStart?: number;
  // timeEnd?: number;
  courseType?: string;
  trainingType?: string;

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
  aggFields?: string; // recordCount,lessonCount, lessonTime
}

export class SummaryStatisticParams {

  distinct: string;
  aggFields?: string;
}
