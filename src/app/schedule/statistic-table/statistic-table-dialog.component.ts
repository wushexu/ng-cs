import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {SchedulesStatistic} from '../../model-table-data/schedules-statistic';

@Component({
  templateUrl: './statistic-table-dialog.component.html',
  styleUrls: ['./statistic-table-dialog.component.css']
})
export class StatisticTableDialogComponent {

  title: string;
  schedulesStatis: SchedulesStatistic;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string;
    schedulesStatis: SchedulesStatistic
  }) {
    this.title = data.title;
    this.schedulesStatis = data.schedulesStatis;
  }

}
