import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

import {MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {ScheduleFilter} from '../../model-app/schedule-params';
import {TimeScope} from '../../model-app/schedule-query-def';
import {Schedule} from '../../model-api/schedule';
import {CompleteQuery} from '../common/complete-query';
import {ScheduleContext} from '../../model-app/schedule-context';


declare type OutputStyle = 'table' | 'calendar-chart' | 'chart';

@Component({
  selector: 'app-schedule-statis',
  templateUrl: './schedule-statis.component.html',
  styleUrls: ['./schedule-statis.component.css']
})
export class ScheduleStatisComponent extends CompleteQuery implements OnInit {

  // weekSchedule: WeekSchedule;
  // monthSchedule: MonthSchedule;
  // termSchedule: TermSchedule;

  outputStyle: OutputStyle = 'table';

  groupByDept = false;
  groupByMajor = false;
  groupByClassYear = false;
  groupByClass = false;
  groupByClassroom = false;
  groupByTeacher = false;
  groupByCourse = false;
  groupByCourseCate = false;
  groupByLesson = false;
  groupByTrainingType = false;
  groupByTime = false;

  timeGroupBy: 'date' | 'week' | 'month' | 'term' = 'date';


  constructor(private scheduleService: ScheduleService) {
    super();
  }

  ngOnInit(): void {
    this.selectedDate = moment();
    this.selectedMonth = this.selectedDate.format(MONTH_PICKER_FORMAT);
  }


  async execute() {

    const context: ScheduleContext = this.setupContext();
    if (!context) {
      return;
    }

    const filter: ScheduleFilter = context.filter;

    // const schedules = await this.scheduleService.querySchedules(filter).toPromise();

    // await this.setupSchedules(context, schedules);
  }


  async setupSchedules(context: ScheduleContext, schedules: Schedule[]) {

    console.log(context);

    const titleParts: string[] = [];

    this.evalTitleNonTimePart(titleParts, context);
    this.evalTitleTimePart(titleParts, context);

    const titleMain = titleParts.join(' ');

    // flatSchedules.title = `${titleMain} 课表统计`;

  }

  clearGroupBys() {
    this.groupByDept = false;
    this.groupByMajor = false;
    this.groupByClassYear = false;
    this.groupByClass = false;
    this.groupByClassroom = false;
    this.groupByTeacher = false;
    this.groupByCourse = false;
    this.groupByCourseCate = false;
    this.groupByLesson = false;
    this.groupByTrainingType = false;
    this.groupByTime = false;
  }

  groupByTeacherOnly() {
    this.clearGroupBys();
    this.groupByTeacher = true;
  }

  groupByClassroomOnly() {
    this.clearGroupBys();
    this.groupByClassroom = true;
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
