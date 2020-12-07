import {ScheduleContext} from '../model-app/schedule-context';
import {DaySchedule} from '../model-table-data/day-schedule';
import {DateDim} from '../model-api/date-dim';
import {DATE_FORMAT} from '../config';
import {ScheduleDatasource} from '../model-table-data/schedule-datasource';
import {CalendarChart, CalenderDateData} from './calendar-chart';

export abstract class ScheduleCalendarChart extends CalendarChart {

  abstract get scheduleDatasource(): ScheduleDatasource;

  abstract getDaySchedulesWithLessons(): DaySchedule[];


  buildDataset(): any[] {

    const [startDate, endDatePlus1Moment] = this.getStartEndDates();

    const daySchedules: DaySchedule[] = this.getDaySchedulesWithLessons();

    const dateMap: Map<string, DaySchedule> = new Map<string, DaySchedule>();

    for (const daySchedule of daySchedules) {
      const dateDim: DateDim = daySchedule.dateDim;
      dateMap.set(dateDim.date, daySchedule);
    }

    const data: DaySchedule[] = [];

    const dateMoment = startDate.clone();
    while (dateMoment.isBefore(endDatePlus1Moment, 'day')) {
      const ds = dateMoment.format(DATE_FORMAT);
      let daySchedule = dateMap.get(ds);
      if (!daySchedule) {
        const dateDim = DateDim.fromMoment(dateMoment);
        daySchedule = DaySchedule.emptySchedule(dateDim);
      }
      data.push(daySchedule);
      dateMoment.add(1, 'day');
    }

    const context: ScheduleContext = this.scheduleDatasource.context;

    return data.map(daySchedule => {
      const dateData: CalenderDateData = {
        dayOfMonth: daySchedule.dateDim.dayOfMonth,
        lessonsCount: daySchedule.lessonSpansCount,
        tooltip: DaySchedule.lessonsHtml(daySchedule, context)
      };
      return {value: [daySchedule.dateDim.date, daySchedule.lessonSpansCount], dateData};
    });
  }

}
