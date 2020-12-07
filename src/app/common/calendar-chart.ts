import {Moment} from 'moment';

import * as echarts from 'echarts';
import {EChartOption} from 'echarts';
import Format = echarts.EChartOption.Tooltip.Format;

import {ScheduleDatasource} from '../model-table-data/schedule-datasource';

export interface CalenderDateData {
  dayOfMonth: number;
  lessonsCount: number;
  tooltip: string;
}

export abstract class CalendarChart {

  showTitle = true;
  cellSize = 70;
  showMonthLabel = false;
  chartPaddingBottom = 30;

  chartWidth = this.cellSize * 9;
  // const cellRows = Math.ceil((startDate.day() - 1 + data.length) / 7);
  // this.chartHeight = this.calendarTop + cellRows * this.cellSize + this.chartPaddingBottom;
  chartHeight = 50 + this.cellSize + Math.ceil((7 - 1 + 31) / 7) * this.cellSize + this.chartPaddingBottom; // 570

  myChart: echarts.ECharts;
  viewInitialized = false;

  abstract get scheduleDatasource(): ScheduleDatasource;

  abstract getCalendarRange(): string | string[];

  abstract getStartEndDates(): Moment[];

  abstract resetChart(): void;

  abstract buildDataset(): any[];

  get calendarTop(): number {
    return (this.showTitle && this.scheduleDatasource.title ? 50 : 0) + this.cellSize;
  }

  inputDataReady(): boolean {
    return !!this.scheduleDatasource;
  }

  refreshChart(): void {

    if (!this.viewInitialized || !this.inputDataReady()) {
      return;
    }

    this.resetChart();

    const dataset: any[] = this.buildDataset();

    let visualMapMax = 4;

    for (const item of dataset) {
      const lessonCount = item.value[1];
      if (lessonCount > visualMapMax) {
        visualMapMax = lessonCount;
      }
    }

    const option1: EChartOption = {
      color: null,
      title: this.showTitle && this.scheduleDatasource.title ? {
        text: this.scheduleDatasource.title,
        top: 10,
        left: 'center'
      } : null,
      tooltip: {
        formatter(params: Format) {
          const dateData = params.data.dateData as CalenderDateData;
          // console.log(dateData);
          return dateData.tooltip;
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {
            show: true,
            pixelRatio: 2
          }
        }
      },
      visualMap: [{
        show: false,
        min: 0,
        max: visualMapMax,
        calculable: true,
        seriesIndex: [2],
        orient: 'vertical',
        left: 'right',
        top: 'middle',
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
        top: this.calendarTop,
        cellSize: [this.cellSize, this.cellSize],
        yearLabel: {show: false},
        orient: 'vertical',
        dayLabel: {
          firstDay: 1,
          nameMap: 'cn'
        },
        monthLabel: {
          show: this.showMonthLabel,
          nameMap: 'cn'
        },
        range: this.getCalendarRange()
      }],

      series: [
        {
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0.1,
          label: {
            show: true,
            formatter(params) {
              const dateData = params.data.dateData as CalenderDateData;
              return '\n' + dateData.dayOfMonth + '\n\n\n';
            },
            color: '#000'
          },
          data: dataset
        },
        {
          type: 'scatter',
          coordinateSystem: 'calendar',
          symbolSize: 0.1,
          label: {
            show: true,
            formatter(params) {
              const dateData = params.data.dateData as CalenderDateData;
              const lc = dateData.lessonsCount;
              if (lc === 0) {
                return '';
              }
              return '\n\n\n' + lc + '\n';
            },
            fontSize: 14,
            fontWeight: 700,
            color: '#a00'
          },
          data: dataset
        },
        {
          name: 'recordCount/LessonCount',
          type: 'heatmap',
          coordinateSystem: 'calendar',
          data: dataset
        }
      ]
    };

    console.log(option1);
    this.myChart.setOption(option1);
  }

}
