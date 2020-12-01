import {Component, Input} from '@angular/core';

import {ScheduleContext} from '../../model2/schedule-context';
import {ScopedDaySchedule} from '../../model2/scoped-day-schedule';


@Component({
  selector: 'app-day-schedule-serial',
  templateUrl: './day-schedule-serial.component.html',
  styleUrls: ['./day-schedule-serial.component.css']
})
export class DayScheduleSerialComponent {

  @Input() scopedDaySchedules: ScopedDaySchedule[];
  @Input() context: ScheduleContext;

}
