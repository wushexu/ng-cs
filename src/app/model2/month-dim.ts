import {Week} from '../model/week';

export class MonthDim {
  yearMonth: string;
  year: number;
  month: number;

  weeks: Week[];

  constructor(yearMonth: string, weeks: Week[]) {
    this.yearMonth = yearMonth;
    this.weeks = weeks;
    this.year = parseInt(yearMonth.substr(0, 4));
    this.month = parseInt(yearMonth.substr(5));
  }

}
