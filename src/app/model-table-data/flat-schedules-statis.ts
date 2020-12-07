import {ScheduleDatasource} from './schedule-datasource';
import {ScheduleAggregated} from '../model-api/schedule-aggregated';

export class FlatSchedulesStatis extends ScheduleDatasource {

  schedules: ScheduleAggregated[];
}
