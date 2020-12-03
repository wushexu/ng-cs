import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import * as moment from 'moment';
import * as echarts from 'echarts';

import {MonthSchedule} from '../../model2/month-schedule';
import {DaySchedule} from '../../model2/day-schedule';
import {ScheduleCalendarChart} from '../../common/schedule-calendar-chart';
import {ScheduleContext} from '../../model2/schedule-context';

@Component({
  selector: 'app-month-schedule-chart',
  templateUrl: './month-schedule-chart.component.html',
  styleUrls: ['./month-schedule-chart.component.css']
})
export class MonthScheduleChartComponent extends ScheduleCalendarChart implements AfterViewInit, OnChanges {
  @ViewChild('chart') chartDiv: ElementRef;

  @Input() monthSchedule: MonthSchedule;
  @Input() context: ScheduleContext;

  inputDataReady(): boolean {
    return !!this.monthSchedule;
  }

  getCalendarRange(): string | string[] {
    const monthDim = this.monthSchedule.monthDim;
    return monthDim.yearMonth;
  }

  getStartEndDates(): moment.Moment[] {
    const monthDim = this.monthSchedule.monthDim;
    const dateMoment = moment(monthDim.yearMonth + '-01');
    const nextMonth01 = dateMoment.clone().add(1, 'month');
    return [dateMoment, nextMonth01];
  }

  getDaySchedulesWithLessons(): DaySchedule[] {
    return this.monthSchedule.daySchedulesWithLessons;
  }

  ngAfterViewInit(): void {
    const holder: HTMLDivElement = this.chartDiv.nativeElement as HTMLDivElement;
    this.myChart = echarts.init(holder);

    this.refreshChart();
  }

  setTitle(): void {
    const monthDim = this.monthSchedule.monthDim;
    this.title = `${monthDim.year}年${monthDim.month}月 课表`;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshChart();
  }

}
