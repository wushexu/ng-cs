import {Component, Input} from '@angular/core';

import {DaySchedule} from '../../model2/day-schedule';
import {ScheduleContext} from '../../model2/schedule-context';


@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent {

  @Input() daySchedule: DaySchedule;
  @Input() context: ScheduleContext;

}
