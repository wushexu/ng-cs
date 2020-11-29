import {Component, OnInit} from '@angular/core';

import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {ScheduleContext} from '../../model2/schedule-context';


@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent implements OnInit {

  daySchedule: DaySchedule;
  context: ScheduleContext = {};

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
