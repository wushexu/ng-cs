import {ScheduleDatasource} from './schedule-datasource';
import {Schedule} from '../model-api/schedule';
import {ScheduleContext} from '../model-app/schedule-context';

export class FlatSchedules extends ScheduleDatasource {

  schedules: Schedule[];

  constructor(context: ScheduleContext) {
    super(context);
  }
}
