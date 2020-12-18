import {DaySchedule} from './day-schedule';
import {ScheduleDatasource} from './schedule-datasource';
import {ScheduleContext} from '../model-app/schedule-context';

export class ScopedDaySchedule extends ScheduleDatasource {
  daySchedule: DaySchedule;
  scopeLabel: string;
  scopeObj?: any;

  constructor(context: ScheduleContext) {
    super(context);
  }
}
