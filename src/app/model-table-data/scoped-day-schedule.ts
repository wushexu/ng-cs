import {DaySchedule} from './day-schedule';
import {ScheduleDatasource} from './schedule-datasource';

export class ScopedDaySchedule extends ScheduleDatasource {
  daySchedule: DaySchedule;
  scopeLabel: string;
  scopeObj?: any;
}
