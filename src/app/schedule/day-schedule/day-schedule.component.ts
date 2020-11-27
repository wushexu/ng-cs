import {Component, OnInit} from '@angular/core';

import {Schedule} from '../../model/schedule';
import {ScheduleService} from '../../service/schedule.service';

interface LessonCell {
  schedule?: Schedule;
  colspan?: number;
}

@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent implements OnInit {

  schedules: Schedule[];
  lessons: LessonCell[];

  // lesson9 = false;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {

    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        this.schedules = schedules;
        // check in one day; sort, check overlap
        this.setup();
      });
  }

  setup(): void {
    console.log(this.schedules);
    if (!this.schedules) {
      return;
    }

    let lessons: LessonCell[] = [];
    for (let i = 0; i < 5; i++) {
      lessons.push({});
    }

    let lastLesson = null;
    for (const schedule of this.schedules) {
      const {timeStart, timeEnd} = schedule;
      const index = timeStart >> 1;
      const colspan = (timeEnd - timeStart + 1) >> 1;
      if (colspan > 1) {
        for (let i = 1; i < colspan; i++) {
          lessons[index + i] = null;
        }
      }
      if (index > 0 && lastLesson) {
        const lastSchedule = lastLesson.schedule;
        // overlap
        if (lastSchedule && lastSchedule.timeEnd >= timeStart) {
          continue;
        }
      }
      lessons[index] = {schedule, colspan};
      lastLesson = lessons[index];
      // if (timeStart === 9) {
      //   this.lesson9 = true;
      // }
    }

    lessons = lessons.filter(l => l);
    this.lessons = lessons;
  }

}
