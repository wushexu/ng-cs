import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import {SchedulesStatistic} from '../../model-table-data/schedules-statistic';

@Component({
  templateUrl: './statistic-table-dialog.component.html',
  styleUrls: ['./statistic-table-dialog.component.css']
})
export class StatisticTableDialogComponent {

  schedulesStatis: SchedulesStatistic;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    schedulesStatis: SchedulesStatistic
  }) {
    this.schedulesStatis = data.schedulesStatis;
  }

}
