import {ScheduleContext} from '../model-app/schedule-context';

export class ScheduleDatasource {

  context: ScheduleContext;
  title?: string;

  constructor(context: ScheduleContext) {
    this.context = context;
  }
}
