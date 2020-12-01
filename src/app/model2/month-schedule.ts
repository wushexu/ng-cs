import {groupBy, flatten} from 'underscore';

import {Schedule} from '../model/schedule';
import {WeekSchedule} from './week-schedule';
import {MonthDim} from './month-dim';
import {DaySchedule} from './day-schedule';

export class MonthSchedule {

  monthDim: MonthDim;
  weekSchedules: WeekSchedule[];

  constructor(monthDim: MonthDim, schedules: Schedule[]) {
    this.monthDim = monthDim;
    const weeks = monthDim.weeks;

    const weekSchedules: WeekSchedule[] = [];

    const weekGroups = groupBy(schedules, 'weekno');
    for (const week of weeks) {
      const schedulesOfWeek: Schedule[] = weekGroups['' + week.weekno] || [];
      weekSchedules.push(new WeekSchedule(week, schedulesOfWeek));
    }

    this.weekSchedules = weekSchedules;
  }

  get daySchedules(): DaySchedule[] {
    if (!this.weekSchedules) {
      return null;
    }
    return flatten(this.weekSchedules.map(ws => ws.daySchedules));
  }
}
