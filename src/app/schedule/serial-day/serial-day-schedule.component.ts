import {Component, OnInit} from '@angular/core';

import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {ScheduleContext} from '../../model2/schedule-context';
import {ScopedDaySchedule} from '../../model2/scoped-day-schedule';


@Component({
  selector: 'app-serial-day-schedule',
  templateUrl: './serial-day-schedule.component.html',
  styleUrls: ['./serial-day-schedule.component.css']
})
export class SerialDayScheduleComponent implements OnInit {

  scopedDaySchedules: ScopedDaySchedule[];
  context: ScheduleContext = {};

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {

    const dateDim: DateDim = {weekno: 1, dayOfWeek: 1, date: '20201123'};
    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        const daySchedule1 = new DaySchedule(dateDim, schedules);
        const daySchedule2 = Object.assign({}, daySchedule1);
        this.scopedDaySchedules = [
          {daySchedule: daySchedule1, scopeLabel: 'AAA'},
          {daySchedule: daySchedule2, scopeLabel: 'BBB'}];
      });
  }

}
