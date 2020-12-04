import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

import {MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {ScheduleFilter, TimeScope} from '../../model2/schedule-filter';
import {WeekSchedule} from '../../model2/week-schedule';
import {MonthSchedule} from '../../model2/month-schedule';
import {TermSchedule} from '../../model2/term-schedule';
import {ScopedDaySchedule} from '../../model2/scoped-day-schedule';
import {Schedule} from '../../model/schedule';
import {DayScheduleSerial} from '../../model2/day-schedule-serial';
import {ScheduleContext} from '../../model2/schedule-context';
import {GeneralScheduleComponent} from '../common/general-schedule.component';
import {Dept} from '../../model/dept';
import {Major} from '../../model/major';


declare type OutputStyle = 'table' | 'calendar-chart';

@Component({
  selector: 'app-integrated-query',
  templateUrl: './integrated-query.component.html',
  styleUrls: ['./integrated-query.component.css']
})
export class IntegratedQueryComponent extends GeneralScheduleComponent implements OnInit {

  weekSchedule: WeekSchedule;
  monthSchedule: MonthSchedule;
  termSchedule: TermSchedule;
  dayScheduleSerial: DayScheduleSerial;

  outputStyle: OutputStyle = 'table';

  selectedDept: Dept;
  selectedMajor: Major;


  constructor(private scheduleService: ScheduleService) {
    super();
  }

  ngOnInit(): void {
    this.selectedDate = moment();
    this.selectedMonth = this.selectedDate.format(MONTH_PICKER_FORMAT);

  }

  async execute() {

    const filter: ScheduleFilter = this.setupFilter();
    if (!filter) {
      return;
    }

    const schedules = await this.scheduleService.querySchedules(filter).toPromise();

    await this.setupSchedules(filter, schedules);

  }

  setupFilter(): ScheduleFilter | null {

    const filter: ScheduleFilter = new ScheduleFilter();

    const ok1 = this.setupTimeFilter(filter);
    if (!ok1) {
      return null;
    }

    // const ok2 = this.setupPerspectiveFilter(filter);
    // if (!ok2) {
    //   return null;
    // }

    return filter;
  }


  evalTitle(titlePerspectivePart: string, titleTimeScopePart: string): string {
    return `${titlePerspectivePart} ${titleTimeScopePart} 课表`;
  }

  async setupSchedules(filter: ScheduleFilter, schedules: Schedule[]) {

    console.log(filter);

  }

  setupDayScheduleSerial() {

    if (this.dayScheduleSerial) {
      return;
    }

    let daySchedules: DaySchedule[];
    let context: ScheduleContext;
    let title: string;

    switch (this.timeScope) {
      case 'week':
        if (!this.weekSchedule) {
          return;
        }
        daySchedules = this.weekSchedule.daySchedulesWithLessons;
        context = this.weekSchedule.context;
        title = this.weekSchedule.title;
        break;
      case 'month':
        if (!this.monthSchedule) {
          return;
        }
        daySchedules = this.monthSchedule.daySchedulesWithLessons;
        context = this.monthSchedule.context;
        title = this.monthSchedule.title;
        break;
      case 'term':
        if (!this.termSchedule) {
          return;
        }
        daySchedules = this.termSchedule.daySchedulesWithLessons;
        context = this.termSchedule.context;
        title = this.termSchedule.title;
        break;
      default:
        return;
    }

    if (!daySchedules) {
      this.dayScheduleSerial = null;
      return;
    }

    const scopedDaySchedules: ScopedDaySchedule[] = daySchedules
      .map(ds => {
        const sds = new ScopedDaySchedule();
        const dateDim = ds.dateDim;
        if (!dateDim.weekdayLabel) {
          DateDim.setDateLabels(dateDim);
        }

        sds.daySchedule = ds;
        sds.scopeLabel = `${dateDim.date}（${dateDim.weekdayLabel}）`;
        sds.scopeObj = dateDim;
        return sds;
      });

    this.dayScheduleSerial = {scopedDaySchedules, context, title};
  }

  ensureOutputStyle(outputStyles: OutputStyle[]): void {
    if (outputStyles.indexOf(this.outputStyle) === -1) {
      this.outputStyle = outputStyles[0];
    }
  }

  timeScopeSelected(timeScope: TimeScope) {
    super.timeScopeSelected(timeScope);
    switch (this.timeScope) {
      case 'day':
        this.outputStyle = 'table';
        break;
      case 'week':
        this.outputStyle = 'table';
        break;
    }
  }

  outputStyleChanged() {
    // console.log(this.outputStyle);
  }

  deptSelected(dept: Dept) {
    this.selectedDept = dept;
    console.log(dept);
  }

  majorSelected(major: Major) {
    this.selectedMajor = major;
    console.log(major);
  }

}
