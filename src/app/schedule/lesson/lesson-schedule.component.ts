import {Component, Input} from '@angular/core';

import {Schedule} from '../../model/schedule';
import {ScheduleContext} from '../../model2/schedule-context';

@Component({
  selector: 'app-lesson-schedule',
  templateUrl: './lesson-schedule.component.html',
  styleUrls: ['./lesson-schedule.component.css']
})
export class LessonScheduleComponent {

  @Input() schedule: Schedule;
  @Input() context: ScheduleContext;

}
