import {Component, OnInit} from '@angular/core';

import {ScheduleService} from '../../service/schedule.service';
import {MonthSchedule} from '../../model2/month-schedule';
import {Week} from '../../model/week';
import {MonthDim} from '../../model2/month-dim';

@Component({
  selector: 'app-month-schedule',
  templateUrl: './month-schedule.component.html',
  styleUrls: ['./month-schedule.component.css']
})
export class MonthScheduleComponent implements OnInit {

  monthSchedule: MonthSchedule;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    const week0: Week = {
      firstDay: '20200928',
      lastDay: '20201104',
      termMonth: 9,
      termYear: 2020,
      weekno: 4
    };
    const week1: Week = {
      firstDay: '20201005',
      lastDay: '20201011',
      termMonth: 9,
      termYear: 2020,
      weekno: 5
    };
    const week2: Week = {
      firstDay: '20201012',
      lastDay: '20201018',
      termMonth: 9,
      termYear: 2020,
      weekno: 6
    };

    const monthDim: MonthDim = {year: 2020, month: 10, weeks: [week0, week1, week2]};
    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        // check in one day; sort, check overlap
        this.monthSchedule = new MonthSchedule(monthDim, schedules);
      });
  }

}
