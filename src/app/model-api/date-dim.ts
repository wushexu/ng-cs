import {Moment} from 'moment';
import * as moment from 'moment';

import {DATE_FORMAT} from '../config';

export class DateDim {

  date: string;
  weekno: number;
  dayOfWeek: number; // 1: Monday
  dayOfMonth: number;

  year?: number;
  month?: number;
  holiday?: boolean;

  dateLabel?: string;
  weekdayLabel?: string;

  constructor(date: string, dayOfWeek?: number, weekno?: number) {
    this.date = date;
    this.dayOfWeek = dayOfWeek;
    this.weekno = weekno;
    this.dayOfMonth = +date.substr(8);
  }

  static fromMoment(mom: Moment): DateDim {
    const date = mom.format(DATE_FORMAT);
    const dayOfWeek = mom.day();
    const dateDim = new DateDim(date, dayOfWeek);
    dateDim.dayOfMonth = mom.date();
    return dateDim;
  }

  static setDateLabels(dateDim: DateDim): void {
    // const mom = moment(dateDim.date);
    // dateDim.dateLabel = mom.format(...);
    dateDim.dateLabel = dateDim.date;
    dateDim.weekdayLabel = ['日', '一', '二', '三', '四', '五', '六'][dateDim.dayOfWeek % 7];
  }

}
