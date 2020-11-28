import {each, groupBy} from 'underscore';

import * as moment from 'moment';

import {DaySchedule} from './day-schedule';
import {Schedule} from '../model/schedule';
import {Week} from '../model/week';
import {DateDim} from '../model/date-dim';
import {Lesson} from './lesson';

export class WeekSchedule {
  week: Week;
  daySchedules: DaySchedule[];

  timeLessons: Lesson[][];

  constructor(week: Week, schedules: Schedule[]) {

    this.week = week;

    // check in one week

    const daySchedules: DaySchedule[] = [];

    const dayGroups = groupBy(schedules, 'dayOfWeek');
    each(dayGroups, (schedulesOfDay: Schedule[],
                     dayStr) => {
      const day: number = parseInt(dayStr);
      const index = day - 1; // 0-6
      const {weekno, dayOfWeek, date} = schedulesOfDay[0];
      const dateDim: DateDim = {weekno, dayOfWeek, date};
      DateDim.setDateLabels(dateDim);
      daySchedules[index] = new DaySchedule(dateDim, schedulesOfDay);
    });

    const mom0 = moment(week.firstDay, DateDim.DATE_FORMAT);
    for (let i = 0; i < 7; i++) {
      if (daySchedules[i]) {
        continue;
      }
      const mom = mom0.clone();
      if (i > 0) {
        mom.add(i, 'days');
      }
      const date = mom.format(DateDim.DATE_FORMAT);
      const dateDim: DateDim = {weekno: week.weekno, dayOfWeek: i + 1, date};
      DateDim.setDateLabels(dateDim);

      daySchedules[i] = {dateDim, lessons: [], sequencedLessons: []};
    }

    const timeLessons: Lesson[][] = [];
    for (let lessonIndex = 0; lessonIndex < 5; lessonIndex++) {
      const weekLessons: Lesson[] = [];
      timeLessons.push(weekLessons);
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const daySchedule = daySchedules[dayIndex];
        const sLesson = daySchedule.sequencedLessons[lessonIndex];
        if (sLesson) {
          if (sLesson.startIndex === lessonIndex) {
            weekLessons.push(sLesson);
          }
        } else {
          weekLessons.push(null);
        }
      }
    }

    this.daySchedules = daySchedules;
    this.timeLessons = timeLessons;
  }
}
