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
    for (let i = 0; i < 7; i++) {
      if (daySchedules[i]) {
        continue;
      }
      const mom = mom0.clone();
      if (i > 0) {
        mom.add(i, 'days');
      }
      const dateDim: DateDim = DateDim.fromMoment(mom);
      dateDim.weekno = week.weekno;
      DateDim.setDateLabels(dateDim);

      daySchedules[i] = DaySchedule.emptySchedule(dateDim);
    }

    const timeLessons: Lesson[][] = [];
    for (let lessonIndex = 0; lessonIndex < 5; lessonIndex++) {
      const weekLessons: Lesson[] = [];
      timeLessons.push(weekLessons);
      for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
        const daySchedule = daySchedules[dayIndex];
        const sLesson = daySchedule.timeIndexLessons[lessonIndex];
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

  get daySchedulesWithLessons(): DaySchedule[] {
    return this.daySchedules.filter(ds => ds.lessons.find(l => l));
  }
}
