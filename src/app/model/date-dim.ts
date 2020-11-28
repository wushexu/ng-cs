import * as moment from 'moment';

export class DateDim {

  static DATE_FORMAT = 'YYYYMMDD';
  static DATE_DISPLAY_FORMAT = 'YYYY-MM-DD';

  date: string;
  weekno: number;
  dayOfWeek: number; // 1: Monday

  year?: number;
  month?: number;
  holiday?: boolean;

  dateLabel?: string;
  weekdayLabel?: string;

  static setDateLabels(dateDim: DateDim): void {
    const mom = moment(dateDim.date);
    dateDim.dateLabel = mom.format(DateDim.DATE_DISPLAY_FORMAT);
    dateDim.weekdayLabel = ['一', '二', '三', '四', '五', '六', '日'][dateDim.dayOfWeek - 1];
  }

// {
//   "date": "20200907",
//   "day_of_week": 1,
//   "holiday": 0,
//   "month": 9,
//   "weekno": 1,
//   "year": 2020
// }
}
