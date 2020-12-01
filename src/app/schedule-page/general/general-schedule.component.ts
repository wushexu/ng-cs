import {Component, OnInit} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';

import {MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {ScheduleContext} from '../../model2/schedule-context';
import {Perspective, ScheduleFilter, TimeScope} from '../../model2/schedule-filter';
import {Class} from '../../model/class';
import {Teacher} from '../../model/teacher';
import {Classroom} from '../../model/site';
import {Week} from '../../model/week';
import {Term} from '../../model/term';
import {WeekSchedule} from '../../model2/week-schedule';
import {MonthSchedule} from '../../model2/month-schedule';
import {TermSchedule} from '../../model2/term-schedule';
import {ScopedDaySchedule} from '../../model2/scoped-day-schedule';
import {MonthDim} from '../../model2/month-dim';
import {TermDim} from '../../model2/term-dim';
import {TermWeekService} from '../../service/term-week.service';

@Component({
  selector: 'app-general-schedule',
  templateUrl: './general-schedule.component.html',
  styleUrls: ['./general-schedule.component.css']
})
export class GeneralScheduleComponent implements OnInit {

  daySchedule: DaySchedule;
  weekSchedule: WeekSchedule;
  monthSchedule: MonthSchedule;
  termSchedule: TermSchedule;
  scopedDaySchedules: ScopedDaySchedule[];

  context: ScheduleContext = {};
  // compactness
  outputStyle: 'calender' | 'day-list' = 'calender';

  perspective: Perspective = 'class';
  timeScope: TimeScope = 'day';

  selectedClass: Class;
  selectedTeacher: Teacher;
  selectedClassroom: Classroom;

  selectedDate: Moment;
  selectedMonth: string; // MONTH_PICKER_FORMAT
  selectedWeek: Week;
  selectedTerm: Term;

  filter: ScheduleFilter = new ScheduleFilter();


  constructor(private scheduleService: ScheduleService,
              private termWeekService: TermWeekService) {
  }

  ngOnInit(): void {
    this.selectedDate = moment();
    this.selectedMonth = this.selectedDate.format(MONTH_PICKER_FORMAT);
  }

  execute(): void {

    const week0: Week = {
      firstDay: '2020-09-28',
      lastDay: '2020-11-04',
      termMonth: 9,
      termYear: 2020,
      weekno: 4
    };
    const week1: Week = {
      firstDay: '2020-10-05',
      lastDay: '2020-10-11',
      termMonth: 9,
      termYear: 2020,
      weekno: 5
    };
    const week2: Week = {
      firstDay: '2020-10-12',
      lastDay: '2020-10-18',
      termMonth: 9,
      termYear: 2020,
      weekno: 6
    };
    const dateDim: DateDim = {weekno: 1, dayOfWeek: 1, date: '2020-11-23'};

    switch (this.timeScope) {
      case 'day':
        this.scheduleService.querySchedules()
          .subscribe(schedules => {
            this.daySchedule = new DaySchedule(dateDim, schedules);
          });
        break;
      case 'week':
        this.scheduleService.querySchedules()
          .subscribe(schedules => {
            // check in one day; sort, check overlap
            this.weekSchedule = new WeekSchedule(week0, schedules);
          });
        break;
      case 'month':
        const monthDim: MonthDim = {year: 2020, month: 10, weeks: [week0, week1, week2]};
        this.scheduleService.querySchedules()
          .subscribe(schedules => {
            // check in one day; sort, check overlap
            this.monthSchedule = new MonthSchedule(monthDim, schedules);
          });
        break;
      case 'term':
        const term: Term = {id: '2020.9', termYear: 2020, termMonth: 9};

        const termDim: TermDim = {term, weeks: [week0, week1, week2]};
        this.scheduleService.querySchedules()
          .subscribe(schedules => {
            // check in one day; sort, check overlap
            this.termSchedule = new TermSchedule(termDim, schedules);
          });
        break;
    }


    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        const daySchedule1 = new DaySchedule(dateDim, schedules);
        const daySchedule2 = Object.assign({}, daySchedule1);
        this.scopedDaySchedules = [
          {daySchedule: daySchedule1, scopeLabel: 'AAA'},
          {daySchedule: daySchedule2, scopeLabel: 'BBB'}];
      });

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

  perspectiveSelected(perspective: Perspective) {
    this.perspective = perspective;
    console.log(perspective);
  }

  timeScopeSelected(timeScope: TimeScope) {
    this.timeScope = timeScope;
    console.log(timeScope);
  }

}
