import {flatten, groupBy} from 'underscore';

import {Schedule} from '../model/schedule';
import {WeekSchedule} from './week-schedule';
import {TermDim} from './term-dim';
import {DaySchedule} from './day-schedule';

export class TermSchedule {

  termDim: TermDim;
  weekSchedules: WeekSchedule[];

  constructor(termDim: TermDim, schedules: Schedule[]) {
    this.termDim = termDim;
    const weeks = termDim.weeks;

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
