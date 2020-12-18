import {ScheduleDatasource} from './schedule-datasource';
import {ScheduleAggregated} from '../model-api/schedule-aggregated';
import {ScheduleContext} from '../model-app/schedule-context';

export class SchedulesStatistic extends ScheduleDatasource {

  schedules: ScheduleAggregated[];

  constructor(context: ScheduleContext) {
    super(context);
  }
}
