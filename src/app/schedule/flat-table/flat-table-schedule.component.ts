import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';

import {ScheduleTableDatasource} from './schedule-table-datasource';
import {Schedule} from '../../model-api/schedule';
import {FlatSchedules} from '../../model-table-data/flat-schedules';
import {Course} from '../../model-api/course';
import {Classroom, Site} from '../../model-api/site';
import {ScheduleFilter} from '../../model-app/schedule-params';
import {ScheduleContext} from '../../model-app/schedule-context';
import {Class} from '../../model-api/class';

@Component({
  selector: 'app-flat-table-schedule',
  templateUrl: './flat-table-schedule.component.html',
  styleUrls: ['./flat-table-schedule.component.css']
})
export class FlatTableScheduleComponent implements AfterViewInit, OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Schedule>;

  @Input() flatSchedules: FlatSchedules;
  @Input() showTitle;

  dataSource: ScheduleTableDatasource;


  oriDisplayedColumns = ['date', 'class', 'classroom', 'teacher', 'lessonIndex', 'course', 'courseType'];

  displayedColumns = this.oriDisplayedColumns;

  ngOnInit() {
    this.dataSource = new ScheduleTableDatasource();
    this.setupData();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
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
    if (changes.flatSchedules) {
      this.setupData();
    }
  }

  setupData() {

    if (!this.flatSchedules || !this.dataSource) {
      return;
    }

    const context: ScheduleContext = this.flatSchedules.context;
    const filter: ScheduleFilter = context.filter;
    this.displayedColumns = this.oriDisplayedColumns
      .filter(column => {
        switch (column) {
          case 'date':
            return !filter.date;
          case 'class':
            return !context.theClass;
          case 'classroom':
            return !context.site;
          case 'teacher':
            return !context.teacher;
          case 'course':
            return !context.course;
        }
        return true;
      });

    this.dataSource.setData(this.flatSchedules.schedules);
  }
}
