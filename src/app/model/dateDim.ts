export class DateDim {
  date: string;
  weekno: number;
  dayOfWeek: number; // 1: Monday

  year?: number;
  month?: number;
  holiday?: boolean;

// {
//   "date": "20200907",
//   "day_of_week": 1,
//   "holiday": 0,
//   "month": 9,
//   "weekno": 1,
//   "year": 2020
// }
}
