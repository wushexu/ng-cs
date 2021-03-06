import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Moment} from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent {

  @Input() selectedDate: string | Moment;
  @Output() selected: EventEmitter<Moment> = new EventEmitter<Moment>();

  dateSelected(): void {
    const date = this.selectedDate;
    if (!date) {
      this.selected.emit(null);
    } else if (typeof date === 'string') {
      this.selected.emit(moment(date));
    } else {
      this.selected.emit(date);
    }
  }

  roll(days: number): void {
    if (!this.selectedDate) {
      return;
    }
    this.selectedDate = moment(this.selectedDate).add(days, 'days');
    this.selected.emit(this.selectedDate);
  }

}
