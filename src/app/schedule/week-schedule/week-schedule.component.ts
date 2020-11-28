import {Component, OnInit} from '@angular/core';

import {ScheduleService} from '../../service/schedule.service';
import {Week} from '../../model/week';
import {WeekSchedule} from '../../model2/week-schedule';


@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.css']
})
export class WeekScheduleComponent implements OnInit {

  weekSchedule: WeekSchedule;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {

    const week: Week = {
      firstDay: '20201012',
      lastDay: '20201018',
      termMonth: 9,
      termYear: 2020,
      weekno: 1
    };
    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        // check in one day; sort, check overlap
        this.weekSchedule = new WeekSchedule(week, schedules);
      });
  }

}
