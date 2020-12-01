import {times, constant} from 'underscore';

import {Schedule} from '../model/schedule';
import {Lesson} from './lesson';
import {DateDim} from '../model/date-dim';

export class DaySchedule {

  dateDim: DateDim;
  lessons: Lesson[]; // null as placeholder
  noPlaceholderLessons: Lesson[];
  timeIndexLessons: Lesson[];

  // lesson9 = false;

  constructor(dateDim: DateDim, schedules: Schedule[]) {

    this.dateDim = dateDim;
    this.timeIndexLessons = [];

    // check in one day; sort, check overlap

    const lessons: Lesson[] = times(5, constant(null));

    const removalMark: Lesson = {span: 1};

    let lastLesson = null;
    for (const schedule of schedules) {
      const {timeStart, timeEnd} = schedule;
      const index = timeStart >> 1;
      const span = (timeEnd - timeStart + 1) >> 1;
      const thisLesson: Lesson = {schedule, span, startIndex: index};

      if (span > 1) {
        for (let i = 1; i < span; i++) {
          lessons[index + i] = removalMark;
          this.timeIndexLessons[index + i] = thisLesson;
        }
      }
      if (index > 0 && lastLesson) {
        const lastSchedule = lastLesson.schedule;
        // overlap
        if (lastSchedule && lastSchedule.timeEnd >= timeStart) {
          continue;
        }
      }
      lessons[index] = thisLesson;
      this.timeIndexLessons[index] = thisLesson;
      lastLesson = thisLesson;
      // if (timeStart === 9) {
      //   this.lesson9 = true;
      // }
    }

    this.lessons = lessons.filter(l => l !== removalMark);
    this.noPlaceholderLessons = this.lessons.filter(l => l);
  }

}
