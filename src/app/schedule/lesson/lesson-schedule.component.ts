import {Component, Input} from '@angular/core';

import {Schedule} from '../../model/schedule';
import {ScheduleContext} from '../../model2/schedule-context';
import {Course} from '../../model/course';
import {Classroom} from '../../model/site';

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
    const course: Course = sc.course;
    if (!course) {
      return '';
    }
    const tips = [];

    if (sc.trainingType === 'S') {
      tips.push('（实训）');
    } else if (sc.trainingType === 'E') {
      tips.push('（企业实训）');
    }
    if (course.style) {
      tips.push(`课程性质：${course.style}`);
    }
    if (course.cate) {
      tips.push(`课程类别：${course.cate}`);
    }
    if (course.examineMethod) {
      tips.push(`考核方式：${course.examineMethod}`);
    }
    if (course.locationType) {
      tips.push(`场地要求：${course.locationType}`);
    }
    return tips.join('\n');
  }

  classroomTooltip(): string {
    const sc = this.schedule;
    const room: Classroom = sc.site;
    if (!room) {
      return '';
    }
    const tips = [];
    if (room.roomType) {
      tips.push(`教室类别：${room.roomType}`);
    }
    if (room.capacity) {
      tips.push(`座位数：${room.capacity}`);
    }
    if (room.multimedia) {
      tips.push(`多媒体：是`);
    }
    return tips.join('\n');
  }
}
