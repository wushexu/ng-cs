import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MAT_DATE_FORMATS} from '@angular/material/core';

// import * as moment from 'moment';
import {Moment} from 'moment';
import {MatDatepicker} from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM',
  },
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'YYYY-MM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-monthpicker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.css'],
  providers: [
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class MonthPickerComponent {
  @Input() yearMonth: string | Moment;
  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  monthSelected(date: Moment, dp: MatDatepicker<any>): void {
    this.yearMonth = date;
    this.selected.emit(date.format('YYYY-MM'));
    dp.close();
  }
}
