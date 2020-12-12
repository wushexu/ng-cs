import {object} from 'underscore';
import {ScheduleGrouping} from './schedule-grouping';
import {ScheduleAggregated} from '../model-api/schedule-aggregated';

export interface Dimension {
  name: string;
  displayName: string;
}

export interface Measure {
  name: string;
  displayName: string;
}

const Dimensions: Dimension[] = [
  {name: 'date', displayName: '日期'},
  {name: 'week', displayName: '学周'},
  {name: 'month', displayName: '月份'},
  {name: 'term', displayName: '学期'},
  {name: 'dept', displayName: '系部'},
  {name: 'major', displayName: '专业'},
  {name: 'classYear', displayName: '入学年'},
  {name: 'class', displayName: '班级'},
  {name: 'classroom', displayName: '教室'},
  {name: 'teacher', displayName: '教师'},
  {name: 'courseCate', displayName: '课程类别'},
  {name: 'course', displayName: '课程'},
  {name: 'courseType', displayName: '理论/实训'}
];

export const DimensionsMap = object(Dimensions.map(d => [d.name, d])) as { [name: string]: Dimension };

export const LessonCountMeasure: Measure = {name: 'lessonCount', displayName: '节数'};


export function evalDimensions(grouping: ScheduleGrouping): string[] {

  const dims = [];
  if (grouping.groupByTime) {
    const timeGroupBy = grouping.timeGroupBy;
    if (timeGroupBy === 'day') {
      dims.push('date');
    } else if (timeGroupBy === 'week') {
      dims.push('week');
    } else if (timeGroupBy === 'month') {
      dims.push('month');
    } else if (timeGroupBy === 'term') {
      dims.push('term');
    }
  }

  if (grouping.groupByClass) {
    dims.push('class');
  } else {
    if (grouping.groupByMajor) {
      dims.push('major');
    } else {
      if (grouping.groupByDept) {
        dims.push('dept');
      }
    }
    if (grouping.groupByClassYear) {
      dims.push('classYear');
    }
  }

  if (grouping.groupByClassroom) {
    dims.push('classroom');
  }
  if (grouping.groupByTeacher) {
    dims.push('teacher');
  }

  if (grouping.groupByCourse) {
    dims.push('course');
  } else {
    if (grouping.groupByCourseCate) {
      dims.push('courseCate');
    }
  }

  if (grouping.groupByCourseType) {
    dims.push('courseType');
  }

  return dims;
}

export function prepareData(schedules: ScheduleAggregated[], grouping: ScheduleGrouping): any[] {
  return schedules.map(s => {
    const d: any = {};
    if (grouping.groupByTime) {
      const timeGroupBy = grouping.timeGroupBy;
      if (timeGroupBy === 'day') {
        d.date = s.date;
      } else if (timeGroupBy === 'week') {
        d.week = s.weekno;
      } else if (timeGroupBy === 'month') {
        d.month = s.yearMonth;
      } else if (timeGroupBy === 'term') {
        d.term = s.termId;
      }
    }

    if (grouping.groupByClass) {
      d.class = s.theClass?.name;
    } else {
      if (grouping.groupByMajor) {
        d.major = s.major.name;
      } else {
        if (grouping.groupByDept) {
          d.dept = s.dept?.name;
        }
      }
      if (grouping.groupByClassYear) {
        d.classYear = s.classYear;
      }
    }

    if (grouping.groupByClassroom) {
      d.classroom = s.site?.name;
    }
    if (grouping.groupByTeacher) {
      d.teacher = s.teacher?.name;
    }

    if (grouping.groupByCourse) {
      d.course = s.course?.name;
    } else {
      if (grouping.groupByCourseCate) {
        d.courseCate = s.courseCate || '-';
      }
    }

    if (grouping.groupByCourseType) {
      d.courseType = s.courseType === 'N' ? '理论' : '实训';
    }
    d.lessonCount = s.lessonCount;
    return d;
  });
}
