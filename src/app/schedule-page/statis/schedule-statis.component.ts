import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

import {MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {ScheduleFilter} from '../../model2/schedule-filter';
import {WeekSchedule} from '../../model2/week-schedule';
import {MonthSchedule} from '../../model2/month-schedule';
import {TermSchedule} from '../../model2/term-schedule';
import {MonthDim} from '../../model2/month-dim';
import {TermDim} from '../../model2/term-dim';
import {TermWeekService} from '../../service/term-week.service';
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



  constructor(private scheduleService: ScheduleService,
              private termWeekService: TermWeekService) {
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


  evalTitle(titlePerspectivePart: string, titleTimeScopePart: string): string {
    return `${titlePerspectivePart} ${titleTimeScopePart} 课表`;
  }

  async setupSchedules(filter: ScheduleFilter, schedules: Schedule[]) {

    console.log(filter);

    let titlePerspectivePart = '';
    switch (this.perspective) {
      case 'class':
        titlePerspectivePart = this.selectedClass.name;
        break;
      case 'teacher':
        titlePerspectivePart = this.selectedTeacher.name;
        break;
      case 'classroom':
        titlePerspectivePart = this.selectedClassroom.name;
        break;
    }

    const term = this.selectedTerm;
    switch (this.timeScope) {
      case 'day':
        const dateDim: DateDim = DateDim.fromMoment(this.selectedDate);
        this.daySchedule = new DaySchedule(dateDim, schedules);
        this.daySchedule.context = filter.context;
        this.daySchedule.title = this.evalTitle(titlePerspectivePart, dateDim.date);
        break;
      case 'week':
        this.weekSchedule = new WeekSchedule(this.selectedWeek, schedules);
        this.weekSchedule.context = filter.context;
        this.weekSchedule.title = this.evalTitle(titlePerspectivePart, `第${this.selectedWeek.weekno}周`);
        break;
      case 'month':
        const yearMonth = this.selectedMonth;
        const weeks = await this.termWeekService.getMonthWeeks(term, yearMonth).toPromise();
        const monthDim: MonthDim = new MonthDim(yearMonth, weeks);
        this.monthSchedule = new MonthSchedule(monthDim, schedules);
        this.monthSchedule.context = filter.context;
        this.monthSchedule.title = this.evalTitle(titlePerspectivePart, `${monthDim.year}年${monthDim.month}月`);
        break;
      case 'term':
        const termWeeks = await this.termWeekService.getTermWeeks(term).toPromise();
        const termDim: TermDim = {term, weeks: termWeeks};
        this.termSchedule = new TermSchedule(termDim, schedules);
        this.termSchedule.context = filter.context;
        this.termSchedule.title = this.evalTitle(titlePerspectivePart, term.name);
        break;
    }
  }


  outputStyleChanged() {
    // console.log(this.outputStyle);
  }


}
