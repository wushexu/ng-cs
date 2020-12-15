import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import * as moment from 'moment';
import {init as echartsInit} from 'echarts';

import {MonthSchedule} from '../../model-table-data/month-schedule';
import {DaySchedule} from '../../model-table-data/day-schedule';
import {ScheduleCalendarChart} from '../../common/schedule-calendar-chart';
import {ScheduleDatasource} from '../../model-table-data/schedule-datasource';

@Component({
  selector: 'app-month-schedule-chart',
  templateUrl: './month-schedule-chart.component.html',
  styleUrls: ['./month-schedule-chart.component.css']
})
export class MonthScheduleChartComponent extends ScheduleCalendarChart implements AfterViewInit, OnChanges {
  @ViewChild('chart') chartDiv: ElementRef;

  @Input() monthSchedule: MonthSchedule;
  @Input() showTitle;

  get scheduleDatasource(): ScheduleDatasource {
    return this.monthSchedule;
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

  resetChart(): void {
    if (this.myChart) {
      this.myChart.dispose();
    }
    const holder: HTMLDivElement = this.chartDiv.nativeElement as HTMLDivElement;
    this.myChart = echartsInit(holder);
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.refreshChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshChart();
  }

}
