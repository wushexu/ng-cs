import {Pipe, PipeTransform} from '@angular/core';

import {DateDim} from '../../model-api/date-dim';


@Pipe({name: 'weekdayLabel'})
export class WeekdayLabelPipe implements PipeTransform {

  transform(dateDim: DateDim): string {

    if (!dateDim) {
      return '';
    }
    if (!dateDim.weekdayLabel) {
      DateDim.setDateLabels(dateDim);
    }
    return dateDim.weekdayLabel;
  }
}
