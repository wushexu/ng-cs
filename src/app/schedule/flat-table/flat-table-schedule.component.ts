import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';

import {ScheduleTableDatasource} from './schedule-table-datasource';
import {Schedule} from '../../model/schedule';
import {ScheduleContext} from '../../model2/schedule-context';
import {FlatSchedules} from '../../model2/flat-schedules';

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

  displayedColumns = ['date', 'course', 'class', 'classroom', 'teacher', 'lessonIndex', 'lessonDetail'];

  ngOnInit() {
    this.dataSource = new ScheduleTableDatasource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.flatSchedules) {
      console.log(this.flatSchedules);
      if (this.flatSchedules) {
        this.dataSource.setData(this.flatSchedules.schedules);
      }
    }
  }
}
