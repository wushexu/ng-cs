import {ScheduleDatasource} from './schedule-datasource';
import {Schedule} from '../model/schedule';

export class FlatSchedules extends ScheduleDatasource {

  schedules: Schedule[];
}
