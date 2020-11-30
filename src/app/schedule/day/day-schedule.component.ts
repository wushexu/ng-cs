import {Component, OnInit} from '@angular/core';

import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {ScheduleContext} from '../../model2/schedule-context';
import {ScheduleFilter} from '../../model2/schedule-filter';
import {Class} from '../../model/class';
import {Teacher} from '../../model/teacher';
import {Classroom} from '../../model/site';


@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent implements OnInit {

  daySchedule: DaySchedule;
  context: ScheduleContext = {};
  perspective: 'class' | 'teacher' | 'room';

  filter: ScheduleFilter = new ScheduleFilter();

  selectedClass: Class;
  selectedTeacher: Teacher;
  selectedClassroom: Classroom;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {

    const dateDim: DateDim = {weekno: 1, dayOfWeek: 1, date: '20201123'};
    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        this.daySchedule = new DaySchedule(dateDim, schedules);
      });
  }

  execute(): void {

  }

  monthSelected(yearMonth: string): void {
    this.filter.month = yearMonth;
    console.log(yearMonth);
  }

  classSelected(selectedClass: Class) {
    this.selectedClass = selectedClass;
    console.log(selectedClass);
  }

  teacherSelected(selectedTeacher: Teacher) {
    this.selectedTeacher = selectedTeacher;
    console.log(selectedTeacher);
  }

  classroomSelected(selectedClassroom: Classroom) {
    this.selectedClassroom = selectedClassroom;
    console.log(selectedClassroom);
  }

}
