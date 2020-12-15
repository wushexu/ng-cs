import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

import {EChartsOption, init as echartsInit} from 'echarts';

import {ChartConfig} from './chart-config';
import {Dimension} from '../model-app/schedule-cube';
import {DEBUG} from '../config';

export interface ChartDimension {
  name?: string;
  type?: 'number' | 'float' | 'int' | 'ordinal' | 'time';
  displayName?: string;
}

export interface Dataset {
  dimensions: ChartDimension[];
  source: any[];
}

@Component({template: ''})
export abstract class GenericChartComponent extends ChartConfig implements AfterViewInit {
  @ViewChild('chart') chartDiv: ElementRef;

  myChart: any;
  dataset: Dataset;

  dimensions: Dimension[];

  ngAfterViewInit(): void {

    this.refreshChart();
  }

  abstract buildDataset(): boolean;

  beforeBuildChartOption() {

  }

  afterBuildChartOption(option: EChartsOption) {

  }

  refreshChart(keepData: boolean = false): void {
    if (!this.chartDiv) {
      return;
    }

    if (!keepData || !this.dataset) {
      // console.log(dataset.source.length);
      // console.log('result dimensions: ' + JSON.stringify(dataset.dimensions, null, 2));
      const ok = this.buildDataset();
      if (!ok || !this.dataset) {
        return;
      }
    }

    if (this.myChart) {
      // this.myChart.clear();
      this.myChart.dispose();
    }

    const holder = this.chartDiv.nativeElement as HTMLDivElement;
    this.myChart = echartsInit(holder, this.chartDarkTheme ? 'dark' : null/*, {renderer: 'svg'}*/); // light

    this.beforeBuildChartOption();

    if (this.chartType === 'pie' && this.dimensions.length === 2) {
      // 两级饼图
      this.buildTwoLayerPie();
      return;
    }

    this.buildChart();
  }

  buildTwoLayerPie(): void {

    const dimensions = this.dimensions;
    const innerData = [];
    const outerData = [];
    const dim1 = dimensions[0].name;
    for (const row of this.dataset.source) {
      let sum = 0;
      for (const dimVal in row) {
        if (!row.hasOwnProperty(dimVal)) {
          continue;
        }
        if (dimVal !== dim1) {
          const val = row[dimVal];
          if (val) {
            outerData.push({name: dimVal, value: val});
            sum += val;
          }
        }
      }
      innerData.push({name: row[dim1], value: sum});
    }

    const option: EChartsOption = Object.assign(this.buildOption(), {
        series: [
          {
            name: dimensions[0].displayName,
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner'
            },
            data: innerData
          },
          {
            name: dimensions[1].displayName,
            type: 'pie',
            radius: ['40%', '55%'],
            data: outerData
          }
        ]
      }
    );

    this.afterBuildChartOption(option);

    this.myChart.setOption(option);
  }


  buildChart(): void {

    const dataset = this.dataset;
    const type = this.chartType;
    const series = [];
    const dsDims = dataset.dimensions;
    if (this.dimensions.length > 1) {
      for (let di = 1; di < dsDims.length; di++) {
        const serie: any = {type, name: dsDims[di].displayName};
        if (this.chartTranspose && type !== 'pie') {
          serie.encode = {x: di, y: 0};
        }
        series.push(serie);
      }

      if (this.chartStack && (type === 'line' || type === 'bar')) {
        series.forEach(serie => {
          serie.stack = 'A';
          if (type === 'line') {
            serie.areaStyle = {};
          }
        });
      }
    } else {
      const seriesName = dsDims[1].displayName;
      const serie: any = {type, name: seriesName};
      if (this.chartTranspose && type !== 'pie') {
        serie.encode = {x: 1, y: 0};
      }
      series.push(serie);
    }

    // console.log(JSON.stringify(series, null, 2));

    const option: EChartsOption = Object.assign(this.buildOption(), {
        dataset,
        xAxis: {
          type: this.chartTranspose ? 'value' : 'category',
          axisLine: {
            show: true
          }
        },
        yAxis: {
          type: this.chartTranspose ? 'category' : 'value',
          axisLine: {
            show: true
          }
        },
        series
      }
    );

    if (DEBUG) {
      console.log(option);
      // console.log(JSON.stringify(option, null, 2));
    }

    this.afterBuildChartOption(option);

    this.myChart.setOption(option);
  }

}
