import {Moment} from 'moment';
import * as moment from 'moment';

import {DATE_FORMAT} from '../config';

const WeekDaysZh = ['日', '一', '二', '三', '四', '五', '六'];

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
    if (dateDim.dayOfWeek) {
      dateDim.weekdayLabel = WeekDaysZh[dateDim.dayOfWeek % 7];
    }
    if (!dateDim.date) {
      return;
    }

    dateDim.dateLabel = dateDim.date;

    if (!dateDim.dayOfWeek) {
      const mom = moment(dateDim.date);
      dateDim.dayOfWeek = mom.day();
      dateDim.weekdayLabel = WeekDaysZh[dateDim.dayOfWeek % 7];
    }
  }

  static fullDateLabel(mom: Moment): string {
    const weekdayLabel = WeekDaysZh[mom.day() % 7];
    return `${mom.year()}年${mom.month() + 1}月${mom.date()}日（周${weekdayLabel}）`;
  }

}
