import {DATE_FORMAT} from '../config';
import {CalendarChart, CalenderDateData} from './calendar-chart';
import {FlatSchedulesStatis} from '../model-table-data/flat-schedules-statis';

export interface DailySchedule {
  date: string;
  lessonCount: number;
}

export abstract class StatisCalendarChart extends CalendarChart {

  abstract get scheduleDatasource(): FlatSchedulesStatis;


  buildDataset(): any[] {

    const [startDate, endDatePlus1Moment] = this.getStartEndDates();

    const dailySchedules: DailySchedule[] = this.scheduleDatasource.schedules
      .map(sa => {
        return {date: sa.date, lessonCount: sa.lessonCount};
      });

    const dateMap: Map<string, DailySchedule> = new Map<string, DailySchedule>();

    for (const dailySchedule of dailySchedules) {
      dateMap.set(dailySchedule.date, dailySchedule);
    }

    const data: DailySchedule[] = [];

    const dateMoment = startDate.clone();
    while (dateMoment.isBefore(endDatePlus1Moment, 'day')) {
      const date = dateMoment.format(DATE_FORMAT);
      let dailySchedule = dateMap.get(date);
      if (!dailySchedule) {
        dailySchedule = {date, lessonCount: 0};
      }
      data.push(dailySchedule);
      dateMoment.add(1, 'day');
    }

    return data.map(ds => {
      const dateData: CalenderDateData = {
        dayOfMonth: +ds.date.substr(8), // YYYY-MM-DD
        lessonsCount: ds.lessonCount,
        tooltip: ds.lessonCount === 0 ? '无课' : `${ds.lessonCount}节课`
      };
      return {value: [ds.date, ds.lessonCount], dateData};
    });
  }

}
