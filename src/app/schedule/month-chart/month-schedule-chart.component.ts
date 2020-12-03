import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import * as moment from 'moment';
import * as echarts from 'echarts';

import {MonthSchedule} from '../../model2/month-schedule';
import {DaySchedule} from '../../model2/day-schedule';
import {ScheduleCalendarChart} from '../../common/schedule-calendar-chart';
import {ScheduleDatasource} from '../../model2/schedule-datasource';

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
    this.myChart = echarts.init(holder);
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.refreshChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshChart();
  }

}
