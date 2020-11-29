import {Component, Input, OnInit} from '@angular/core';

import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {Lesson} from '../../model2/lesson';
import {ScheduleContext} from '../../model2/schedule-context';


@Component({
  selector: 'app-day-lessons',
  templateUrl: './day-lessons.component.html',
  styleUrls: ['./day-lessons.component.css']
})
export class DayLessonsComponent implements OnInit {

  @Input() daySchedule: DaySchedule;
  @Input() context: ScheduleContext;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {

    //   const dateDim: DateDim = {weekno: 1, dayOfWeek: 1, date: '20201123'};
    //   this.scheduleService.querySchedules()
    //     .subscribe(schedules => {
    //       this.daySchedule = new DaySchedule(dateDim, schedules);
    //     });
  }

}
