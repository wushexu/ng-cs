import {Component, Input} from '@angular/core';

import {Schedule} from '../../model-api/schedule';
import {ScheduleContext} from '../../model-app/schedule-context';
import {Course} from '../../model-api/course';
import {Site} from '../../model-api/site';

@Component({
  selector: 'app-lesson-schedule',
  templateUrl: './lesson-schedule.component.html',
  styleUrls: ['./lesson-schedule.component.css']
})
export class LessonScheduleComponent {

  @Input() schedule: Schedule;
  @Input() context: ScheduleContext;

  courseTooltip(): string {
    const sc = this.schedule;

    let tooltip1 = '';
    if (sc.trainingType === 'S') {
      tooltip1 = '（实训）';
    } else if (sc.trainingType === 'E') {
      tooltip1 = '（企业实训）';
    }

    const course: Course = sc.course;
    const tooltip2 = Schedule.courseTooltip(course);
    if (!tooltip1 || !tooltip2) {
      return tooltip1 || tooltip2;
    }

    return `${tooltip1}\n${tooltip2}`;
  }

  classTooltip() {
    return Schedule.classTooltip(this.schedule.theClass);
  }

  classroomTooltip(): string {
    return Site.tooltip(this.schedule.site);
  }
}
