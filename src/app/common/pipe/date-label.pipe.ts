import {Pipe, PipeTransform} from '@angular/core';

import {DateDim} from '../../model-api/date-dim';


@Pipe({name: 'dateLabel'})
export class DateLabelPipe implements PipeTransform {

  transform(dateDim: DateDim): string {

    if (!dateDim) {
      return '';
    }
    if (!dateDim.dateLabel) {
      DateDim.setDateLabels(dateDim);
    }
    return dateDim.dateLabel;
  }
}
