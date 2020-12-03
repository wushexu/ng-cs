import {Component, Input} from '@angular/core';

import {DaySchedule} from '../../model2/day-schedule';


@Component({
  selector: 'app-day-lessons',
  templateUrl: './day-lessons.component.html',
  styleUrls: ['./day-lessons.component.css']
})
export class DayLessonsComponent {

  @Input() daySchedule: DaySchedule;

}
