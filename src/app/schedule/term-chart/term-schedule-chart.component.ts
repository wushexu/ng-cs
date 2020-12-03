import {AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild} from '@angular/core';

import * as moment from 'moment';
import * as echarts from 'echarts';

import {DaySchedule} from '../../model2/day-schedule';
import {ScheduleCalendarChart} from '../../common/schedule-calendar-chart';
import {ScheduleContext} from '../../model2/schedule-context';
import {TermSchedule} from '../../model2/term-schedule';

@Component({
  selector: 'app-term-schedule-chart',
  templateUrl: './term-schedule-chart.component.html',
  styleUrls: ['./term-schedule-chart.component.css']
})
export class TermScheduleChartComponent extends ScheduleCalendarChart implements AfterViewInit, OnChanges {
  @ViewChild('chart') chartDiv: ElementRef;

  @Input() termSchedule: TermSchedule;
  @Input() context: ScheduleContext;

  showMonthLabel = true;
  // const cellRows = Math.ceil((startDate.day() - 1 + data.length) / 7);
  // this.chartHeight = this.calendarTop + cellRows * this.cellSize + this.chartPaddingBottom;
  chartHeight = 50 + this.cellSize + Math.ceil((7 - 1 + 160) / 7) * this.cellSize + this.chartPaddingBottom; // 1830

  inputDataReady(): boolean {
    const ts = this.termSchedule;
    return ts && ts.termDim.weeks.length > 0;
  }

  getCalendarRange(): string[] {
    const weeks = this.termSchedule.termDim.weeks;
    return [weeks[0].firstDay, weeks[weeks.length - 1].lastDay];
  }

  getStartEndDates(): moment.Moment[] {
    const [start, end] = this.getCalendarRange();
    return [moment(start), moment(end).add(1, 'day')];
  }

  getDaySchedulesWithLessons(): DaySchedule[] {
    return this.termSchedule.daySchedulesWithLessons;
  }

  ngAfterViewInit(): void {
    const holder: HTMLDivElement = this.chartDiv.nativeElement as HTMLDivElement;
    this.myChart = echarts.init(holder);

    this.refreshChart();
  }

  setTitle(): void {
    const termDim = this.termSchedule.termDim;
    this.title = `${termDim.term.name} 课表`;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.refreshChart();
  }

}
