import {Component, OnInit} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';

import {MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {ScheduleContext} from '../../model2/schedule-context';
import {Perspective, PerspectiveDef, ScheduleFilter, TimeScope, TimeScopeDef} from '../../model2/schedule-filter';
import {Class} from '../../model/class';
import {Teacher} from '../../model/teacher';
import {Classroom} from '../../model/site';
import {Week} from '../../model/week';
import {Term} from '../../model/term';

@Component({
  selector: 'app-general-schedule',
  templateUrl: './general-schedule.component.html',
  styleUrls: ['./general-schedule.component.css']
})
export class GeneralScheduleComponent implements OnInit {

  daySchedule: DaySchedule;
  context: ScheduleContext = {};
  perspective: Perspective = 'class';
  timeScope: TimeScope = 'day';

  perspectiveDefs = PerspectiveDef.All;
  timeScopeDefs = TimeScopeDef.All;

  filter: ScheduleFilter = new ScheduleFilter();

  selectedClass: Class;
  selectedTeacher: Teacher;
  selectedClassroom: Classroom;

  selectedDate: Moment;
  selectedMonth: string; // MONTH_PICKER_FORMAT
  selectedWeek: Week;
  selectedTerm: Term;

  constructor(private scheduleService: ScheduleService) {
  }

  perspectiveName(): string {
    return PerspectiveDef.getName(this.perspective);
  }

  timeScopeName(): string {
    return TimeScopeDef.getName(this.timeScope);
  }

  ngOnInit(): void {

    this.selectedDate = moment();
    this.selectedMonth = this.selectedDate.format(MONTH_PICKER_FORMAT);

    const dateDim: DateDim = {weekno: 1, dayOfWeek: 1, date: '2020-11-23'};
    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        this.daySchedule = new DaySchedule(dateDim, schedules);
      });
  }

  execute(): void {

  }

  dateSelected(date: Moment): void {
    this.selectedDate = date;
    console.log(date);
  }

  monthSelected(yearMonth: string): void {
    this.selectedMonth = yearMonth;
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

  weekSelected(selectedWeek: Week) {
    this.selectedWeek = selectedWeek;
    if (selectedWeek && selectedWeek.term) {
      this.selectedTerm = selectedWeek.term;
    }
    console.log(selectedWeek);
  }

  termSelected(selectedTerm: Term) {
    this.selectedTerm = selectedTerm;
    console.log(selectedTerm);
  }

}
