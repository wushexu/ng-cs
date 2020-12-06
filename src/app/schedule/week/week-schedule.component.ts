import {Component, Input} from '@angular/core';

import {WeekSchedule} from '../../model-table-data/week-schedule';

@Component({
  selector: 'app-week-schedule',
  templateUrl: './week-schedule.component.html',
  styleUrls: ['./week-schedule.component.css']
})
export class WeekScheduleComponent {

  @Input() weekSchedule: WeekSchedule;
  @Input() showTitle;

}
