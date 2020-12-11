import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

import * as echarts from 'echarts';
import {EChartOption} from 'echarts';

import {ChartConfig} from './chart-config';


export interface Dataset {
  dimensions: any[];
  source: any[];
}

@Component({template: ''})
export abstract class GenericChartComponent extends ChartConfig implements AfterViewInit {
  @ViewChild('chart') chartDiv: ElementRef;

  myChart: echarts.ECharts;
  currentDataset: Dataset;

  ngAfterViewInit(): void {

    this.refreshChart();
  }

  abstract buildDataset(dims): Dataset;

  refreshChart(keepData: boolean = false): void {
    if (!this.chartDiv) {
      return;
    }
    const dims = [];

    let dataset;
    if (keepData && this.currentDataset) {
      dataset = this.currentDataset;
    } else {
      // console.log(dataset.source.length);
      // console.log('result dimensions: ' + JSON.stringify(dataset.dimensions, null, 2));
      dataset = this.buildDataset(dims);
      this.currentDataset = dataset;
    }

    if (this.myChart) {
      // this.myChart.clear();
      this.myChart.dispose();
    }

    const holder = this.chartDiv.nativeElement as HTMLDivElement;
    this.myChart = echarts.init(holder, this.chartDarkTheme ? 'dark' : null/*, {renderer: 'svg'}*/); // light

    if (this.chartType === 'pie' && dims.length === 2) {
      // 两级饼图
      this.buildTwoLayerPie(dims, dataset);
      return;
    }

    this.buildChart(dims, dataset);
  }

  buildTwoLayerPie(dims: string[], dataset: Dataset): void {

    const dim1Name = 'a';
    const dim2Name = 'b';

    const innerData = [];
    const outerData = [];
    const dim1 = dims[0];
    for (const row of dataset.source) {
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

    const option: EChartOption = Object.assign(this.buildOption(), {
        series: [
          {
            name: dim1Name,
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '30%'],
            label: {
              position: 'inner'
            },
            data: innerData
          },
          {
            name: dim2Name,
            type: 'pie',
            radius: ['40%', '55%'],
            data: outerData
          }
        ]
      }
    );

    this.myChart.setOption(option);
  }


  buildChart(dims: string[], dataset: Dataset): void {

    const type = this.chartType;
    const series = [];
    const dsDims = dataset.dimensions;
    if (dims.length > 1) {
      for (let di = 1; di < dsDims.length; di++) {
        const serie: any = {type, name: dsDims[di].displayName};
        if (this.chartTranspose && type !== 'pie') {
          serie.encode = {x: di, y: 0};
        }
        series.push(serie);
      }
    } else {
      const seriesName = dsDims[1].displayName;
      const serie: any = {type, name: seriesName};
      if (this.chartTranspose && type !== 'pie') {
        serie.encode = {x: 1, y: 0};
      }
      series.push(serie);
    }
    series.forEach(serie => {
      if (this.chartStack) {
        serie.stack = 'A';
        if (type === 'line') {
          serie.areaStyle = {};
        }
      }
    });

    // console.log(JSON.stringify(series, null, 2));

    const xAxis: EChartOption.XAxis = this.chartTranspose ? {type: 'value'} : {type: 'category'};
    const yAxis: EChartOption.YAxis = this.chartTranspose ? {type: 'category'} : {type: 'value'};

    const option: EChartOption = Object.assign(this.buildOption(), {
        tooltip: {trigger: 'axis'},
        dataset,
        xAxis,
        yAxis,
        series
      }
    );

    console.log(option);
    // console.log(JSON.stringify(option, null, 2));

    this.myChart.setOption(option);
  }

}
