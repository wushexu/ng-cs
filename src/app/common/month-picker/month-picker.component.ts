import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';

import * as moment from 'moment';
import {Moment} from 'moment';

import {DATE_FORMATS, MONTH_PICKER_FORMAT} from '../../config';


const MY_FORMATS = {
  parse: {
    dateInput: MONTH_PICKER_FORMAT,
  },
  display: {...DATE_FORMATS.display, dateInput: MONTH_PICKER_FORMAT},
};

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MonthPickerComponent {
  @Input() yearMonth: string;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  monthSelected(date: Moment, dp: MatDatepicker<any>): void {
    this.selected.emit(date.format(MONTH_PICKER_FORMAT));
    dp.close();
  }


  roll(months: number): void {
    if (!this.yearMonth) {
      return;
    }
    this.yearMonth = moment(this.yearMonth + '-01')
      .add(months, 'months')
      .format(MONTH_PICKER_FORMAT);
    this.selected.emit(this.yearMonth);
  }
}
