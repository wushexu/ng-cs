import {Pipe, PipeTransform} from '@angular/core';

import {DateDim} from '../../model-api/date-dim';
import {Schedule} from '../../model-api/schedule';


@Pipe({name: 'scheduleDate'})
export class ScheduleDateLabelPipe implements PipeTransform {

  transform(schedule: Schedule): string {
    const dateDim = new DateDim(schedule.date, schedule.dayOfWeek);
    DateDim.setDateLabels(dateDim);
    return `${dateDim.dateLabel}（${dateDim.weekdayLabel}）`;
  }
}
