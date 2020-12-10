import {ScheduleDatasource} from './schedule-datasource';
import {ScheduleAggregated} from '../model-api/schedule-aggregated';

export class SchedulesStatistic extends ScheduleDatasource {

  schedules: ScheduleAggregated[];
}
