import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

import {DEBUG, MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {ScheduleFilter, StatisticParams} from '../../model-app/schedule-params';
import {TimeScope} from '../../model-app/schedule-query-def';
import {CompleteQuery} from '../common/complete-query';
import {ScheduleContext} from '../../model-app/schedule-context';
import {ScheduleGrouping} from '../../model-app/schedule-grouping';
import {ScheduleAggregated} from '../../model-api/schedule-aggregated';
import {SchedulesStatistic} from '../../model-table-data/schedules-statistic';
import {TermWeekService} from '../../service/term-week.service';


declare type OutputStyle = 'table' | 'calendar-chart' | 'chart';

@Component({
  selector: 'app-schedule-statis',
  templateUrl: './schedule-statis.component.html',
  styleUrls: ['./schedule-statis.component.css']
})
export class ScheduleStatisComponent extends CompleteQuery implements OnInit {

  schedulesStatis: SchedulesStatistic;

  monthStatis: SchedulesStatistic;
  termStatis: SchedulesStatistic;

  outputStyle: OutputStyle = 'table';

  grouping: ScheduleGrouping = new ScheduleGrouping();


  constructor(private scheduleService: ScheduleService,
              private termWeekService: TermWeekService) {
    super();
  }

  ngOnInit(): void {
    this.selectedDate = moment();
    this.selectedMonth = this.selectedDate.format(MONTH_PICKER_FORMAT);
  }

  canShowCalendarChart(): boolean {
    return this.grouping.isGroupByDateOnly()
      && (this.timeScope === 'month' || this.timeScope === 'term');
  }

  async execute() {

    if (!this.grouping.anySelected()) {
      alert('请选择至少一个统计维度');
      return;
    }

    //
    if (this.outputStyle === 'calendar-chart') {
      if (!this.canShowCalendarChart()) {
        this.outputStyle = 'table';
      }
    }

    const context: ScheduleContext = this.setupContext();
    if (!context) {
      return;
    }

    const filter: ScheduleFilter = context.filter;

    const groupBy = context.grouping.generateGroupBy();
    const statisticParams: StatisticParams = new StatisticParams();
    statisticParams.groupBy = groupBy;

    const schedules = await this.scheduleService.statistic(filter, statisticParams).toPromise();

    await this.setupSchedules(context, schedules);
  }


  setupContext(): ScheduleContext | null {
    const context: ScheduleContext = super.setupContext();
    if (context) {
      context.grouping = Object.assign(new ScheduleGrouping(), this.grouping);
    }

    return context;
  }

  async setupSchedules(context: ScheduleContext, schedules: ScheduleAggregated[]) {

    if (DEBUG) {
      console.log(context);
    }

    const schedulesStatis = new SchedulesStatistic(context);
    schedulesStatis.schedules = schedules;

    const titleParts: string[] = [];

    this.evalTitleNonTimePart(titleParts, context);
    this.evalTitleTimePart(titleParts, context);

    const titleMain = titleParts.join(' ');

    schedulesStatis.title = `${titleMain} 课表统计`;

    this.schedulesStatis = schedulesStatis;

    if (this.timeScope === 'month') {
      if (context.grouping.isGroupByDateOnly()) {
        this.monthStatis = schedulesStatis;
      }
    } else if (this.timeScope === 'term') {
      if (context.grouping.isGroupByDateOnly()) {
        if (!context.term.weeks) {
          context.term.weeks = await this.termWeekService.getTermWeeks(context.term).toPromise();
        }
        this.termStatis = schedulesStatis;
      }
    }
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
    // this.schedulesStatis = null;
    // console.log(this.outputStyle);
  }


}
