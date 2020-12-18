import {flatten, groupBy} from 'underscore';

import {Schedule} from '../model-api/schedule';
import {WeekSchedule} from './week-schedule';
import {TermDim} from '../model-app/term-dim';
import {DaySchedule} from './day-schedule';
import {ScheduleDatasource} from './schedule-datasource';
import {ScheduleContext} from '../model-app/schedule-context';

export class TermSchedule extends ScheduleDatasource {

  termDim: TermDim;
  weekSchedules: WeekSchedule[];

  constructor(context: ScheduleContext, termDim: TermDim, schedules: Schedule[]) {
    super(context);

    this.termDim = termDim;
    const weeks = termDim.weeks;

    const weekSchedules: WeekSchedule[] = [];

    const weekGroups = groupBy(schedules, 'weekno');
    for (const week of weeks) {
      const schedulesOfWeek: Schedule[] = weekGroups['' + week.weekno] || [];
      weekSchedules.push(new WeekSchedule(context, week, schedulesOfWeek));
    }

    this.weekSchedules = weekSchedules;
  }

  get daySchedules(): DaySchedule[] {
    if (!this.weekSchedules) {
      return null;
    }
    return flatten(this.weekSchedules.map(ws => ws.daySchedules));
  }

  get daySchedulesWithLessons(): DaySchedule[] {
    return this.daySchedules.filter(ds => ds.lessons.find(l => l));
  }
}
