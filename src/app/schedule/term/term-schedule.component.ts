import {Component, Input} from '@angular/core';

import {TermSchedule} from '../../model2/term-schedule';
import {ScheduleContext} from '../../model2/schedule-context';

@Component({
  selector: 'app-term-schedule',
  templateUrl: './term-schedule.component.html',
  styleUrls: ['./term-schedule.component.css']
})
export class TermScheduleComponent{

  @Input() termSchedule: TermSchedule;
  @Input() context: ScheduleContext;

}
