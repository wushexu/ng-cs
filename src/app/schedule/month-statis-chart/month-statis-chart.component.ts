import {
  AfterViewInit, Component, ElementRef, Input,
  OnChanges, SimpleChanges, ViewChild
} from '@angular/core';

import * as moment from 'moment';
import * as echarts from 'echarts';

import {StatisCalendarChart} from '../../common/statis-calendar-chart';
import {FlatSchedulesStatis} from '../../model-table-data/flat-schedules-statis';

@Component({
  selector: 'app-month-statis-chart',
  templateUrl: './month-statis-chart.component.html',
  styleUrls: ['./month-statis-chart.component.css']
})
export class MonthStatisChartComponent extends StatisCalendarChart implements AfterViewInit, OnChanges {
  @ViewChild('chart') chartDiv: ElementRef;

  @Input() monthStatis: FlatSchedulesStatis;
  @Input() showTitle;

  get scheduleDatasource(): FlatSchedulesStatis {
    return this.monthStatis;
  }

  getCalendarRange(): string | string[] {
    return this.monthStatis.context.yearMonth;
  }

  getStartEndDates(): moment.Moment[] {
    const yearMonth = this.monthStatis.context.yearMonth;
    const dateMoment = moment(yearMonth + '-01');
    const nextMonth01 = dateMoment.clone().add(1, 'month');
    return [dateMoment, nextMonth01];
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
