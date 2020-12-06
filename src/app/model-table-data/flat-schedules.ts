import {ScheduleDatasource} from './schedule-datasource';
import {Schedule} from '../model-api/schedule';

export class FlatSchedules extends ScheduleDatasource {

  schedules: Schedule[];
}
