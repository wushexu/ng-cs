import {each, groupBy} from 'underscore';

import * as moment from 'moment';

import {DATE_FORMAT} from '../config';
import {DaySchedule} from './day-schedule';
import {Schedule} from '../model-api/schedule';
import {Week} from '../model-api/week';
import {DateDim} from '../model-api/date-dim';
import {Lesson} from '../model-app/lesson';
import {ScheduleDatasource} from './schedule-datasource';

export class WeekSchedule extends ScheduleDatasource {
  week: Week;
  daySchedules: DaySchedule[];

  timeLessons: Lesson[][];

  constructor(week: Week, schedules: Schedule[]) {
    super();

    this.week = week;

    // check in one week

    const daySchedules: DaySchedule[] = [];

    const dayGroups = groupBy(schedules, 'dayOfWeek');
    each(dayGroups, (schedulesOfDay: Schedule[],
                     dayStr) => {
      const day: number = parseInt(dayStr);
      const index = day - 1; // 0-6
      const {weekno, dayOfWeek, date} = schedulesOfDay[0];
      const dateDim: DateDim = new DateDim(date, dayOfWeek, weekno);
      DateDim.setDateLabels(dateDim);
      daySchedules[index] = new DaySchedule(dateDim, schedulesOfDay);
    });

    const mom0 = moment(week.firstDay, DATE_FORMAT);
    for (let index = 0; index < 7; index++) {
      if (daySchedules[index]) {
        continue;
      }
      const mom = mom0.clone();
      if (index > 0) {
        mom.add(index, 'days');
      }
      const dateDim: DateDim = DateDim.fromMoment(mom);
      dateDim.weekno = week.weekno;
      DateDim.setDateLabels(dateDim);

      daySchedules[index] = DaySchedule.emptySchedule(dateDim);
    }

    const timeLessons: Lesson[][] = [];
    for (let index = 0; index < 5; index++) {
      const weekLessons: Lesson[] = [];
      timeLessons.push(weekLessons);
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const daySchedule = daySchedules[dayIndex];
        const sLesson = daySchedule.timeIndexLessons[index];
        if (sLesson) {
          if (sLesson.startIndex === index) {
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

  get daySchedulesWithLessons(): DaySchedule[] {
    return this.daySchedules.filter(ds => ds.lessons.find(l => l));
  }
}
