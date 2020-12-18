import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import * as moment from 'moment';
import {Moment} from 'moment';

import {SummaryStatistic} from '../../model-app/summary-statistic';
import {SummaryDrillType, SummaryStatisticService} from '../../service/summary-statistic.service';
import {DateDim} from '../../model-api/date-dim';
import {DATE_FORMAT, DEBUG} from '../../config';
import {MatDialog} from '@angular/material/dialog';
import {StatisticTableDialogComponent} from '../../schedule/statistic-table/statistic-table-dialog.component';
import {ScheduleGrouping} from '../../model-app/schedule-grouping';
import {SchedulesStatistic} from '../../model-table-data/schedules-statistic';
import {ScheduleFilter} from '../../model-app/schedule-params';
import {ScheduleContext} from '../../model-app/schedule-context';
import {ScheduleAggregated} from '../../model-api/schedule-aggregated';
import {Schedule} from '../../model-api/schedule';
import {errorHandler} from '../../common/util';

@Component({
  selector: 'app-daily-summary-statis',
  templateUrl: './daily-summary-statis.component.html',
  styleUrls: ['./daily-summary-statis.component.css']
})
export class DailySummaryStatisComponent implements OnInit {
  gridCols = 3;

  classCardClass = 'lightblue';
  studentCardClass = 'lightskyblue';
  teacherCardClass = 'lightsteelblue';
  classroomCardClass = 'lightyellow';
  courseTheoryCardClass = 'lightgreen';
  courseTrainingCardClass = 'lightpink';

  selectedDate: Moment;
  selectedLesson = 1;

  dateLabel: string;
  isToday: boolean;
  lessonLabel: string;

  daySummary: SummaryStatistic = new SummaryStatistic();
  lessonSummary: SummaryStatistic;

  constructor(private breakpointObserver: BreakpointObserver,
              private summaryService: SummaryStatisticService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    const breakPointCols = new Map<string, number>([
      ['(max-width: 499px)', 1], // '(max-width: 767px)'
      ['(max-width: 991px)', 2],
      ['(max-width: 1199px)', 3],
      ['(min-width: 1200px)', 4]
    ]);

    this.breakpointObserver.observe(Array.from(breakPointCols.keys()))
      .subscribe(({matches, breakpoints}) => {
          if (DEBUG) {
            console.log(matches, breakpoints);
          }
          for (const [br, col] of breakPointCols.entries()) {
            if (breakpoints[br]) {
              this.gridCols = col;
              return;
            }
          }
        },
        errorHandler);

    this.selectedDate = moment();
    this.updateDayStatistic();
  }

  updateDayStatistic() {
    const date = this.selectedDate;
    if (!date) {
      return;
    }

    const dateStr = date.format(DATE_FORMAT);
    this.summaryService.buildSummaryOfDate(dateStr)
      .subscribe(summary => {
          this.daySummary = summary;
          const today = moment();
          this.isToday = date.isSame(today, 'day');
          this.dateLabel = DateDim.fullDateLabel(date);

          if (this.lessonSummary) {
            this.lessonSummary = null;
            this.updateLessonStatistic(dateStr);
          }
        },
        errorHandler);

  }

  updateLessonStatistic(dateStr: string = null) {
    const selectedLesson = this.selectedLesson;
    if (!selectedLesson) {
      return;
    }
    if (!dateStr) {
      const date = this.selectedDate;
      if (!date) {
        return;
      }
      dateStr = date.format(DATE_FORMAT);
    }
    this.summaryService.buildSummaryOfLesson(dateStr, selectedLesson)
      .subscribe(summary => {
          this.lessonSummary = summary;
          this.lessonLabel = Schedule.getLessonLabel(selectedLesson);
        },
        errorHandler);
  }


  dateSelected(date: Moment): void {
    this.selectedDate = date;
    if (DEBUG) {
      console.log(date);
    }
    // this.updateDayStatistic();
  }

  lessonSelected(lessonIndex: number) {
    this.selectedLesson = lessonIndex;
    if (DEBUG) {
      console.log(lessonIndex);
    }
    // this.updateLessonStatistic();
  }

  async drillSummary(drillType: SummaryDrillType, scope: 'day' | 'lesson' = 'day') {
    const summary: SummaryStatistic = scope === 'day' ? this.daySummary : this.lessonSummary;
    if (!summary) {
      return;
    }

    const dateStr = summary.date;
    const service = this.summaryService;

    const obs = scope === 'day' ?
      service.drillSummaryOfDate(dateStr, drillType)
      : service.drillSummaryOfLesson(dateStr, summary.lesson, drillType);
    const schedules: ScheduleAggregated[] = await obs.toPromise();

    const context = new ScheduleContext();
    const filter = new ScheduleFilter();
    const grouping = new ScheduleGrouping();
    context.filter = filter;
    context.grouping = grouping;

    const schedulesStatis = new SchedulesStatistic(context);

    schedulesStatis.schedules = schedules;

    let scopeName;

    if (scope === 'day') {
      scopeName = `本日（${dateStr}）`;
    } else {
      const lessonLabel = Schedule.getLessonLabel(summary.lesson);
      scopeName = `本节（${dateStr} ${lessonLabel}）`;
    }

    let title: string;

    if (drillType === 'class') {
      grouping.groupByClass = true;
      title = scopeName + '有课的班级/学生';
    } else if (drillType === 'site') {
      grouping.groupByClassroom = true;
      title = scopeName + '有课的教室';
    } else if (drillType === 'teacher') {
      grouping.groupByTeacher = true;
      title = scopeName + '有课的教师';
    } else if (drillType === 'courseN') {
      grouping.groupByCourse = true;
      title = scopeName + '课程（理论）';
    } else if (drillType === 'courseT') {
      grouping.groupByCourse = true;
      title = scopeName + '课程（实训）';
    }
    schedulesStatis.title = title;

    this.dialog.open(
      StatisticTableDialogComponent, {
        width: '450px',
        data: {schedulesStatis}
      });
  }
}
