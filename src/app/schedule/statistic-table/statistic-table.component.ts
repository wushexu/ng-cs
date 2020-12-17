import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';

import {StatisticTableDatasource} from './statistic-table-datasource';
import {Course} from '../../model-api/course';
import {Classroom, Site} from '../../model-api/site';
import {ScheduleContext} from '../../model-app/schedule-context';
import {Class} from '../../model-api/class';
import {ScheduleAggregated} from '../../model-api/schedule-aggregated';
import {SchedulesStatistic} from '../../model-table-data/schedules-statistic';
import {ScheduleGrouping} from '../../model-app/schedule-grouping';
import {Schedule} from '../../model-api/schedule';

@Component({
  selector: 'app-statistic-table',
  templateUrl: './statistic-table.component.html',
  styleUrls: ['./statistic-table.component.css']
})
export class StatisticTableComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ScheduleAggregated>;

  @Input() schedulesStatis: SchedulesStatistic;
  @Input() showTitle: boolean;
  @Input() paginating = true;

  dataSource: StatisticTableDatasource;

  oriDisplayedColumns = [];

  displayedColumns = this.oriDisplayedColumns;

  ngOnInit() {
    this.dataSource = new StatisticTableDatasource();
    this.setupData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  lessonLabel(lessonIndex: number) {
    return Schedule.getLessonLabel(lessonIndex);
  }

  classTooltip(theClass: Class) {
    return Class.classTooltip(theClass);
  }

  courseTooltip(course: Course): string {
    return Course.courseTooltip(course);
  }

  classroomTooltip(room: Classroom): string {
    return Site.tooltip(room);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.schedulesStatis) {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      this.setupData();
    }
  }

  setupData() {

    if (!this.schedulesStatis || !this.dataSource) {
      return;
    }

    const context: ScheduleContext = this.schedulesStatis.context;
    const grouping: ScheduleGrouping = context.grouping;

    const displayedColumns = ['index'];
    if (grouping.groupByTime) {
      const timeGroupBy = grouping.timeGroupBy;
      if (timeGroupBy === 'day') {
        displayedColumns.push('date');
      } else if (timeGroupBy === 'week') {
        displayedColumns.push('term');
        displayedColumns.push('weekno');
      } else if (timeGroupBy === 'month') {
        displayedColumns.push('yearMonth');
      } else if (timeGroupBy === 'term') {
        displayedColumns.push('term');
      }
    }
    if (grouping.groupByDept) {
      displayedColumns.push('dept');
    }
    if (grouping.groupByMajor) {
      displayedColumns.push('major');
    }
    if (grouping.groupByClassYear) {
      displayedColumns.push('classYear');
    }
    if (grouping.groupByClass) {
      displayedColumns.push('class');
      displayedColumns.push('classSize');
    }
    if (grouping.groupByClassroom) {
      displayedColumns.push('classroom');
      displayedColumns.push('classroomCapacity');
    }
    if (grouping.groupByTeacher) {
      displayedColumns.push('teacher');
    }
    if (grouping.groupByCourseCate) {
      displayedColumns.push('courseCate');
    }
    if (grouping.groupByCourse) {
      displayedColumns.push('course');
    }
    if (grouping.groupByCourseType) {
      displayedColumns.push('courseType');
    }
    if (grouping.groupByLesson) {
      displayedColumns.push('lesson');
    }

    // displayedColumns.push('recordCount');
    displayedColumns.push('lessonCount');

    this.displayedColumns = displayedColumns;

    this.dataSource.setData(this.schedulesStatis.schedules);
  }
}
