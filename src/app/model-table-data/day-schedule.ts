import {Schedule} from '../model-api/schedule';
import {Lesson} from '../model-app/lesson';
import {DateDim} from '../model-api/date-dim';
import {ScheduleContext} from '../model-app/schedule-context';
import {ScheduleDatasource} from './schedule-datasource';

export class DaySchedule extends ScheduleDatasource {

  dateDim: DateDim;
  lessons: Lesson[]; // null as placeholder
  noPlaceholderLessons: Lesson[];
  timeIndexLessons: Lesson[];

  schedules: Schedule[];
  lessonSpansCount: number;

  constructor(dateDim: DateDim, schedules: Schedule[]) {
    super();

    // schedules.sort((a, b) => a.timeStart - b.timeStart);

    this.dateDim = dateDim;
    this.timeIndexLessons = [];
    this.schedules = schedules;
    this.lessonSpansCount = 0;

    // check in one day; sort, check overlap

    const lessons: Lesson[] = [null, null, null, null, null];

    const removeMarker: Lesson = {span: 1};

    let lastLesson: Lesson = null;
    for (const schedule of schedules) {
      const {timeStart, timeEnd} = schedule;
      const index = timeStart >> 1;
      const span = (timeEnd - timeStart + 1) >> 1;

      const thisLesson: Lesson = {schedule, span, startIndex: index};

      if (lastLesson) {
        const lastSchedule = lastLesson.schedule;
        if (lastSchedule) {
          // overlap
          if (timeStart === lastSchedule.timeStart) {
            // TODO: merge
            continue;
          } else if (timeStart <= lastSchedule.timeEnd) {
            continue;
          }
        }
      }
      this.lessonSpansCount += span;
      if (span > 1) {
        for (let i = 1; i < span; i++) {
          lessons[index + i] = removeMarker;
          this.timeIndexLessons[index + i] = thisLesson;
        }
      }
      lessons[index] = thisLesson;
      this.timeIndexLessons[index] = thisLesson;
      lastLesson = thisLesson;
    }

    this.lessons = lessons.filter(l => l !== removeMarker);
    this.noPlaceholderLessons = this.lessons.filter(l => l);
  }

  static emptySchedule(dateDim: DateDim): DaySchedule {
    return new DaySchedule(dateDim, []);
  }

  static lessonsHtml(daySchedule: DaySchedule, context: ScheduleContext): string {
    if (daySchedule.noPlaceholderLessons.length === 0) {
      return '无课';
    }
    let indent = '&nbsp;&nbsp;&nbsp;';
    indent += indent;
    const lf = '<br>';
    let text = '';
    for (const {schedule} of daySchedule.noPlaceholderLessons) {
      const {timeStart, timeEnd, course, theClass, site, teacher, courseType, trainingType} = schedule;
      const ampm = timeStart < 5 ? '（上午）' : '（下午）';
      text += `${ampm}${timeStart}-${timeEnd}${lf}`;
      if (!context.course && course) {
        text += `${indent}${course.name}${lf}`;
      }
      if (!context.theClass && theClass) {
        text += `${indent}${theClass.name}${lf}`;
      }
      if (!context.site) {
        if (site || courseType === 'T') {
          let siteText = site ? site.name : '';
          if (trainingType === 'S') {
            siteText = '（实训）' + siteText;
          } else if (trainingType === 'E') {
            siteText = '（企业实训）' + siteText;
          }
          text += `${indent}${siteText}${lf}`;
        }
      }
      if (!context.teacher && teacher) {
        text += `${indent}${teacher.name}${lf}`;
      }
    }
    return text;
  }

}
