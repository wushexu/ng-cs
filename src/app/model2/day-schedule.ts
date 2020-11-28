import {compact, times, constant} from 'underscore';

import {Schedule} from '../model/schedule';
import {Lesson} from './lesson';
import {DateDim} from '../model/date-dim';

export class DaySchedule {

  dateDim: DateDim;
  lessons: Lesson[];
  sequencedLessons: Lesson[];

  // lesson9 = false;

  constructor(dateDim: DateDim, schedules: Schedule[]) {

    this.dateDim = dateDim;
    this.sequencedLessons = [];

    // check in one day; sort, check overlap

    const lessons: Lesson[] = times(5, constant({span: 1}));

    let lastLesson = null;
    for (const schedule of schedules) {
      const {timeStart, timeEnd} = schedule;
      const index = timeStart >> 1;
      const span = (timeEnd - timeStart + 1) >> 1;
      const thisLesson: Lesson = {schedule, span, startIndex: index};

      if (span > 1) {
        for (let i = 1; i < span; i++) {
          lessons[index + i] = null;
          this.sequencedLessons[index + i] = thisLesson;
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
      this.sequencedLessons[index] = thisLesson;
      lastLesson = thisLesson;
      // if (timeStart === 9) {
      //   this.lesson9 = true;
      // }
    }

    this.lessons = compact(lessons);
  }

}
