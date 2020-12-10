import {Component, OnInit} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import * as moment from 'moment';
import {Moment} from 'moment';

import {SummaryStatistic} from '../../model-app/summary-statistic';
import {SummaryStatisticService} from '../../service/summary-statistic.service';
import {DateDim} from '../../model-api/date-dim';
import {DATE_FORMAT} from '../../config';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {StatisticTableDialogComponent} from '../../schedule/statistic-table/statistic-table-dialog.component';
import {ScheduleGrouping} from '../../model-app/schedule-grouping';
import {SchedulesStatistic} from '../../model-table-data/schedules-statistic';
import {ScheduleFilter} from '../../model-app/schedule-params';

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
  courseTrainingCardClass = 'lightcyan';

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
        console.log(matches, breakpoints);
        for (const [br, col] of breakPointCols.entries()) {
          if (breakpoints[br]) {
            this.gridCols = col;
            return;
          }
        }
      });

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
      });

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
        const indexZh = ['一', '二', '三', '四', '五'][selectedLesson - 1];
        this.lessonLabel = `第${indexZh}节`;
      });
  }


  dateSelected(date: Moment): void {
    this.selectedDate = date;
    console.log(date);
    // this.updateDayStatistic();
  }

  lessonSelected(lessonIndex: number) {
    this.selectedLesson = lessonIndex;
    console.log(lessonIndex);
    // this.updateLessonStatistic();
  }

  showSummaryDetailDialog() {
    const schedulesStatis: SchedulesStatistic = {
      schedules: [],
      context: {
        filter: new ScheduleFilter(),
        grouping: new ScheduleGrouping()
      }
    };
    this.dialog.open(
      StatisticTableDialogComponent, {
        width: '250px',
        data: {title: 'sss', schedulesStatis}
      });
  }

  showDetail(cate) {
    if (cate === 'class') {
      this.showSummaryDetailDialog();
    }
  }
}
