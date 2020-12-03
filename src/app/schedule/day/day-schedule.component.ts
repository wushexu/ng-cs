import {Component, Input} from '@angular/core';

import {DaySchedule} from '../../model2/day-schedule';


@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent {

  @Input() daySchedule: DaySchedule;
  @Input() showTitle;

}
