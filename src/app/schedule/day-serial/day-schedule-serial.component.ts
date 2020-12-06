import {Component, Input} from '@angular/core';

import {DayScheduleSerial} from '../../model-table-data/day-schedule-serial';


@Component({
  selector: 'app-day-schedule-serial',
  templateUrl: './day-schedule-serial.component.html',
  styleUrls: ['./day-schedule-serial.component.css']
})
export class DayScheduleSerialComponent {

  @Input() dayScheduleSerial: DayScheduleSerial;
  @Input() showTitle;

}
