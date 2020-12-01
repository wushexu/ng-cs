import {Component, Input} from '@angular/core';

import {WeekSchedule} from '../../model2/week-schedule';
import {ScheduleContext} from '../../model2/schedule-context';

@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.css']
})
export class WeekScheduleComponent {

  @Input() weekSchedule: WeekSchedule;
  @Input() context: ScheduleContext;

}
