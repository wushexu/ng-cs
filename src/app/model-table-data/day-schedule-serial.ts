import {ScopedDaySchedule} from './scoped-day-schedule';
import {ScheduleDatasource} from './schedule-datasource';
import {ScheduleContext} from '../model-app/schedule-context';

export class DayScheduleSerial extends ScheduleDatasource {

  scopedDaySchedules: ScopedDaySchedule[];

  constructor(context: ScheduleContext) {
    super(context);
  }
}
