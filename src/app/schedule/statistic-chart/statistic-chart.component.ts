import {AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

import {groupBy, sortBy} from 'underscore';

import {ChartDimension, GenericChartComponent} from '../../common/generic-chart.component';
import {SchedulesStatistic} from '../../model-table-data/schedules-statistic';
import {ScheduleAggregated} from '../../model-api/schedule-aggregated';
import {ScheduleContext} from '../../model-app/schedule-context';
import {ScheduleGrouping} from '../../model-app/schedule-grouping';
import {Dimension, DimensionsMap, evalDimensions, LessonCountMeasure, prepareData} from '../../model-app/schedule-cube';
import {BreakpointObserver} from '@angular/cdk/layout';
import {DEBUG} from '../../config';
import {errorHandler} from '../../common/util';


@Component({
  selector: 'app-statistic-chart',
  templateUrl: './statistic-chart.component.html',
  styleUrls: ['./statistic-chart.component.css']
})
export class StatisticChartComponent extends GenericChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() schedulesStatis: SchedulesStatistic;
  @Input() showTitle: boolean;

  chartWidth = 1100;
  chartHeight = 600;
  transparentBackground = false;

  topNOptions = [
    {value: 0, label: '全部'},
    {value: 10, label: 'Top 10'},
    {value: 20, label: 'Top 20'},
    {value: 50, label: 'Top 50'},
    {value: 100, label: 'Top 100'}
  ];
  topNOption = this.topNOptions[0];

  chartTypeOptions = [
    {value: 'bar', label: '柱状图'},
    {value: 'line', label: '折线图'},
    {value: 'pie', label: '饼状图'},
    {value: 'scatter', label: '散点图'}
  ];
  chartTypeOption = this.chartTypeOptions[0];
  chartType = this.chartTypeOption.value;

  constructor(private breakpointObserver: BreakpointObserver, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    const breakPointCols = new Map<string, number[]>([
      ['(max-width: 499px)', [400, 300]],
      ['(max-width: 599px)', [500, 300]],
      ['(max-width: 767px)', [600, 400]],
      ['(max-width: 991px)', [760, 400]],
      ['(max-width: 1199px)', [920, 500]],
      ['(min-width: 1200px)', [1120, 600]]
    ]);

    this.breakpointObserver.observe(Array.from(breakPointCols.keys()))
      .subscribe(({matches, breakpoints}) => {
          if (DEBUG) {
            console.log(matches, breakpoints);
          }
          for (const [br, [w, h]] of breakPointCols.entries()) {
            if (breakpoints[br]) {
              this.chartWidth = w;
              this.chartHeight = h;
              this.redrawChart();
              return;
            }
          }
        },
        errorHandler);
  }

  buildDataset(): boolean {

    const statis = this.schedulesStatis;
    if (!statis) {
      return false;
    }

    let schedules: ScheduleAggregated[] = statis.schedules;
    const context: ScheduleContext = statis.context;
    const grouping: ScheduleGrouping = context.grouping;

    const dimensionNames = evalDimensions(grouping);
    if (DEBUG) {
      console.log(`Dimensions: ${dimensionNames}`);
    }
    const dimensionsCount = dimensionNames.length;
    if (dimensionsCount === 0 || dimensionsCount > 2) {
      alert('请选择1-2个统计维度');
      return false;
    }

    const dimension1: Dimension = DimensionsMap[dimensionNames[0]];
    const dimension1Name = dimension1.name;

    const measure = LessonCountMeasure;

    if (this.topNOption?.value) {
      const topN = this.topNOption.value;
      schedules = sortBy(schedules, measure.name).reverse();
      if (schedules.length > topN) {
        schedules = schedules.slice(0, topN);
      }
    }

    let data = prepareData(schedules, grouping);

    const chartDimensions: ChartDimension[] = [];

    chartDimensions.push({
      name: dimension1Name,
      displayName: dimension1.displayName,
      type: 'ordinal'
    });

    if (dimensionsCount === 1) {
      chartDimensions.push({name: measure.name, displayName: measure.displayName, type: 'int'});
      this.dimensions = [dimension1];
    } else {
      // dimensionsCount=2

      const dimension2: Dimension = DimensionsMap[dimensionNames[1]];
      this.dimensions = [dimension1, dimension2];

      const dimField1 = dimension1Name;
      const dimField2 = dimension2.name;
      const meaField = measure.name;

      const groups = groupBy(data, dimField1);
      const newData = [];
      const dim2Values = new Set<string>();

      for (const k in groups) {
        if (!groups.hasOwnProperty(k)) {
          continue;
        }
        const rs = groups[k];
        const newRow = {};
        for (const row of rs) {
          const dim2Val: string = row[dimField2];
          if (dim2Val) {
            dim2Values.add(dim2Val);
            newRow[dim2Val] = row[meaField];
          }
        }
        newRow[dimField1] = rs[0][dimField1] || '-';
        newData.push(newRow);
      }
      data = newData;
      if (dimField1 === 'date') {
        data = sortBy(data, dimField1);
      }

      const values = Array.from(dim2Values).sort();
      for (const dim2Val of values) {
        chartDimensions.push({name: dim2Val, displayName: dim2Val, type: 'int'});
      }
    }

    this.dataset = {source: data, dimensions: chartDimensions};

    this.cdr.detectChanges();

    return true;
  }


  ngOnChanges(changes: SimpleChanges) {
    this.chartTitle = this.showTitle ? this.schedulesStatis?.title : null;
    if (changes.schedulesStatis) {
      this.refreshChart();
    } else if (changes.showTitle) {
      this.refreshChart(true);
    }
  }

  topNSelected(topNOption) {
    this.topNOption = topNOption;
    this.refreshChart();
  }

  chartTypeSelected(ct) {
    this.chartTypeOption = ct;
    this.chartType = ct.value;
    this.redrawChart();
  }

  beforeBuildChartOption() {
    // this.chartLegend.type = 'scroll';
    // this.showChartToolbox = false;
  }
}
