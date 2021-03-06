import {TimeScope} from './schedule-query-def';

export class ScheduleGrouping {

  groupByDept = false;
  groupByMajor = false;
  groupByClassYear = false;
  groupByClass = false;
  groupByLesson = false;
  groupByClassroom = false;
  groupByTeacher = false;
  groupByCourse = false;
  groupByCourseCate = false;
  // groupByLesson = false;
  groupByCourseType = false;
  groupByTime = false;

  timeGroupBy: TimeScope = 'day';

  clearGroupBys() {
    this.groupByDept = false;
    this.groupByMajor = false;
    this.groupByClassYear = false;
    this.groupByClass = false;
    this.groupByLesson = false;
    this.groupByClassroom = false;
    this.groupByTeacher = false;
    this.groupByCourse = false;
    this.groupByCourseCate = false;
    // this.groupByLesson = false;
    this.groupByCourseType = false;
    this.groupByTime = false;
  }

  groupByTeacherOnly() {
    this.clearGroupBys();
    this.groupByTeacher = true;
  }

  groupByClassroomOnly() {
    this.clearGroupBys();
    this.groupByClassroom = true;
  }

  groupByDateOnly() {
    this.clearGroupBys();
    this.groupByTime = true;
    this.timeGroupBy = 'day';
  }

  isGroupByDateOnly(): boolean {
    return !this.groupByDept
      && !this.groupByMajor
      && !this.groupByClassYear
      && !this.groupByClass
      && !this.groupByLesson
      && !this.groupByClassroom
      && !this.groupByTeacher
      && !this.groupByCourse
      && !this.groupByCourseCate
      && !this.groupByCourseType
      && this.groupByTime
      && this.timeGroupBy === 'day';
  }

  generateGroupBy(): string {
    const fields: string[] = [];
    if (this.groupByDept) {
      fields.push('deptId');
    }
    if (this.groupByMajor) {
      fields.push('majorId');
    }
    if (this.groupByClassYear) {
      fields.push('classYear');
    }
    if (this.groupByClass) {
      fields.push('classId');
    }
    if (this.groupByLesson) {
      fields.push('lesson');
    }
    if (this.groupByClassroom) {
      fields.push('siteId');
    }
    if (this.groupByTeacher) {
      fields.push('teacherId');
    }
    if (this.groupByCourse) {
      fields.push('courseCode');
    }
    if (this.groupByCourseCate) {
      fields.push('courseCate');
    }
    // if (this.groupByLesson) {
    //   fields.push('lesson');
    // }
    if (this.groupByCourseType) {
      fields.push('courseType');
    }
    if (this.groupByTime) {
      const timeGroupBy = this.timeGroupBy;
      if (timeGroupBy === 'day') {
        fields.push('date');
      } else if (timeGroupBy === 'week') {
        fields.push('termId');
        fields.push('weekno');
      } else if (timeGroupBy === 'month') {
        fields.push('yearMonth');
      } else if (timeGroupBy === 'term') {
        fields.push('termId');
      }
    }

    return fields.join(',');
  }

  anySelected(): boolean {
    return this.generateGroupBy().length > 0;
  }

}
