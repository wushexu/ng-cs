export class ScheduleGrouping {

  groupByDept = false;
  groupByMajor = false;
  groupByClassYear = false;
  groupByClass = false;
  groupByClassroom = false;
  groupByTeacher = false;
  groupByCourse = false;
  groupByCourseCate = false;
  // groupByLesson = false;
  groupByTrainingType = false;
  groupByTime = false;

  timeGroupBy: 'date' | 'week' | 'month' | 'term' = 'date';

  clearGroupBys() {
    this.groupByDept = false;
    this.groupByMajor = false;
    this.groupByClassYear = false;
    this.groupByClass = false;
    this.groupByClassroom = false;
    this.groupByTeacher = false;
    this.groupByCourse = false;
    this.groupByCourseCate = false;
    // this.groupByLesson = false;
    this.groupByTrainingType = false;
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
    if (this.groupByTrainingType) {
      fields.push('trainingType');
    }
    if (this.groupByTime) {
      const timeGroupBy = this.timeGroupBy;
      if (timeGroupBy === 'date') {
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
