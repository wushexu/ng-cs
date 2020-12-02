import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

import {Moment} from 'moment';
import * as moment from 'moment';

import * as echarts from 'echarts';
import {EChartOption} from 'echarts';
import Format = echarts.EChartOption.Tooltip.Format;

import {MonthSchedule} from '../../model2/month-schedule';
import {ScheduleContext} from '../../model2/schedule-context';
import {ChartConfig} from '../../common/ChartConfig';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {DATE_FORMAT} from '../../config';

@Component({
  selector: 'app-month-schedule-chart',
  templateUrl: './month-schedule-chart.component.html',
  styleUrls: ['./month-schedule-chart.component.css']
})
export class MonthScheduleChartComponent extends ChartConfig implements AfterViewInit {

  @ViewChild('chart') chartDiv: ElementRef;

  @Input() monthSchedule: MonthSchedule;
  @Input() context: ScheduleContext;

  chartHeight = 600;

  myChart: echarts.ECharts;

  ngAfterViewInit(): void {
    this.refreshChart();
  }

  refreshChart(keepData = true): void {

    if (!this.monthSchedule) {
      return;
    }

    if (this.myChart) {
      // this.myChart.clear();
      this.myChart.dispose();
    }

    const holder: HTMLDivElement = this.chartDiv.nativeElement as HTMLDivElement;
    this.myChart = echarts.init(holder, this.chartDarkTheme ? 'dark' : null/*, {renderer: 'svg'}*/); // light

    const monthDim = this.monthSchedule.monthDim;
    const daySchedules: DaySchedule[] = this.monthSchedule.daySchedulesWithLessons;

    const dateMap: Map<string, DaySchedule> = new Map<string, DaySchedule>();

    for (const daySchedule of daySchedules) {
      const dateDim: DateDim = daySchedule.dateDim;
      dateMap.set(dateDim.date, daySchedule);
    }

    const data: DaySchedule[] = [];

    const dateMoment = moment(monthDim.yearMonth + '-01');
    const nextMonth01 = dateMoment.clone().add(1, 'month');

    let maxLessonSpansCount = 0;

    while (dateMoment.isBefore(nextMonth01, 'day')) {
      const ds = dateMoment.format(DATE_FORMAT);
      let daySchedule = dateMap.get(ds);
      if (daySchedule) {
        if (daySchedule.lessonSpansCount > maxLessonSpansCount) {
          maxLessonSpansCount = daySchedule.lessonSpansCount;
        }
      } else {
        const dateDim = DateDim.fromMoment(dateMoment);
        daySchedule = DaySchedule.emptySchedule(dateDim);
      }
      data.push(daySchedule);
      dateMoment.add(1, 'day');
    }

    const visualMapMax = maxLessonSpansCount > 5 ? maxLessonSpansCount : 5;

    const scatterData: any[] = data.map(d => [d.dateDim.date, 1, d]);
    const heatmapData: any[] = data.map(d => [d.dateDim.date, d.lessonSpansCount, d]);

    const option1: EChartOption = {
      tooltip: {
        formatter(params: Format) {
          // const daySchedule = params.value[2] as DaySchedule;
          // console.log(daySchedule);
          const count = params.value[1];
          return count > 0 ? count + '节课' : '无课';
        }
      },

      visualMap: [{
        show: false,
        min: 0,
        max: visualMapMax,
        calculable: true,
        seriesIndex: [2],
        orient: 'horizontal',
        left: 'center',
        bottom: 20,
        inRange: {
          color: ['#e0ffff', '#006edd'],
          opacity: 0.3
        },
        controller: {
          inRange: {
            opacity: 0.5
          }
        }
      }],

      calendar: [{
        left: 'center',
        top: 'middle',
        cellSize: [70, 70],
        yearLabel: {show: false},
        orient: 'vertical',
        dayLabel: {
          firstDay: 1,
          nameMap: 'cn'
        },
        monthLabel: {
          show: false
        },
        range: monthDim.yearMonth
      }],

      series: [
        {
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0.1,
          label: {
            show: true,
            formatter(params) {
              const daySchedule = params.value[2] as DaySchedule;
              // console.log(daySchedule);
              return daySchedule.dateDim.dayOfMonth + '\n\n\n\n';
            },
            color: '#000'
          },
          data: scatterData
        },
        {
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0.1,
          label: {
            show: true,
            formatter(params) {
              const daySchedule = params.value[2] as DaySchedule;
              const lc = daySchedule.lessonSpansCount;
              if (lc === 0) {
                return '';
              }
              return '\n\n\n' + lc + '\n';
            },
            fontSize: 14,
            fontWeight: 700,
            color: '#a00'
          },
          data: scatterData
        },
        {
          name: '节数',
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: heatmapData
        }
      ]
    };

    const option: EChartOption = Object.assign(this.buildOption(), option1);

    this.myChart.setOption(option);
  }

}
