import {Component, Input, OnInit} from '@angular/core';

import {DaySchedule} from '../../model2/day-schedule';
import {ScheduleContext} from '../../model2/schedule-context';


@Component({
  selector: 'app-day-lessons',
  templateUrl: './day-lessons.component.html',
  styleUrls: ['./day-lessons.component.css']
})
export class DayLessonsComponent {

  @Input() daySchedule: DaySchedule;
  @Input() context: ScheduleContext;

}
