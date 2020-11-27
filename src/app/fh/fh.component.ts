import {Component, OnInit, OnDestroy, AfterViewInit, ElementRef, ViewChild} from '@angular/core';

import * as echarts from 'echarts';
import {EChartOption} from 'echarts';
import {Subscription} from 'rxjs';

import {ChartConfig} from '../common/ChartConfig';


@Component({
  selector: 'app-fh',
  templateUrl: './fh.component.html',
  styleUrls: ['./fh.component.css']
})
export class FhComponent extends ChartConfig implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chart') chartDiv: ElementRef;

  myChart: echarts.ECharts;

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.refreshChart();
  }

  ngOnDestroy(): void {
  }

  refreshChart(keepData = true): void {
    if (this.myChart) {
      // this.myChart.clear();
      this.myChart.dispose();
    }

    const holder: HTMLDivElement = this.chartDiv.nativeElement as HTMLDivElement;
    this.myChart = echarts.init(holder, this.chartDarkTheme ? 'dark' : null/*, {renderer: 'svg'}*/); // light

    const xAxis: EChartOption.XAxis = this.chartTranspose ? {type: 'value'} : {type: 'category'};
    const yAxis: EChartOption.YAxis = this.chartTranspose ? {type: 'category'} : {type: 'value'};

    const dataset = {
      dimensions: [
        {
          name: 'cat',
          displayName: '商品分类',
          type: 'ordinal'
        },
        {
          name: 'zj',
          displayName: '交易量（元）',
          type: 'int'
        }
      ],
      source: [
        {
          zj: 976000,
          cat: '其他'
        },
        {
          zj: 746000,
          cat: '农产品'
        },
        {
          zj: 531000,
          cat: '家具'
        },
        {
          zj: 690000,
          cat: '家电'
        },
        {
          zj: 779000,
          cat: '建材'
        },
        {
          zj: 723000,
          cat: '服装'
        },
        {
          zj: 841000,
          cat: '生鲜冷链'
        },
        {
          zj: 959000,
          cat: '电子产品'
        },
        {
          zj: 701000,
          cat: '食品'
        }
      ]
    };

    const series = [
      {
        type: 'bar',
        name: '交易量（元）'
      }
    ];

    const option: EChartOption = Object.assign(this.buildOption(), {
        tooltip: {trigger: 'axis'},
        xAxis,
        yAxis,
        dataset,
        series
      }
    );

    this.myChart.setOption(option);
  }

}
