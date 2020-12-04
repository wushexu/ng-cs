import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

import {MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {ScheduleFilter, TimeScope} from '../../model2/schedule-filter';
import {WeekSchedule} from '../../model2/week-schedule';
import {MonthSchedule} from '../../model2/month-schedule';
import {TermSchedule} from '../../model2/term-schedule';
import {Schedule} from '../../model/schedule';
import {GeneralScheduleComponent} from '../common/general-schedule.component';


declare type OutputStyle = 'table' | 'calendar-chart' | 'chart';

@Component({
  selector: 'app-schedule-statis',
  templateUrl: './schedule-statis.component.html',
  styleUrls: ['./schedule-statis.component.css']
})
export class ScheduleStatisComponent extends GeneralScheduleComponent implements OnInit {

  daySchedule: DaySchedule;
  weekSchedule: WeekSchedule;
  monthSchedule: MonthSchedule;
  termSchedule: TermSchedule;

  outputStyle: OutputStyle = 'table';


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


  // evalTitle(titlePerspectivePart: string, titleTimeScopePart: string): string {
  //   return `${titlePerspectivePart} ${titleTimeScopePart} 课表`;
  // }

  async setupSchedules(filter: ScheduleFilter, schedules: Schedule[]) {

    console.log(filter);

    // TODO:
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
        this.ensureOutputStyle(['table', 'chart']);
        break;
      case 'week':
        this.ensureOutputStyle(['table', 'chart']);
        break;
    }
  }

  outputStyleChanged() {
    // console.log(this.outputStyle);
  }


}
