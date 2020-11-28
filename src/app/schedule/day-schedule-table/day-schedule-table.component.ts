import {Component, OnInit} from '@angular/core';

import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';


@Component({
  selector: 'app-day-schedule-table',
  templateUrl: './day-schedule-table.component.html',
  styleUrls: ['./day-schedule-table.component.css']
})
export class DayScheduleTableComponent implements OnInit {

  daySchedule: DaySchedule;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {

    const dateDim: DateDim = {weekno: 1, dayOfWeek: 1, date: '20201123'};
    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        this.daySchedule = new DaySchedule(dateDim, schedules);
      });
  }

}
