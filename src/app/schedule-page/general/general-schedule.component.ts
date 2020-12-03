import {Component, OnInit} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';

import {DATE_FORMAT, MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
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
import {Schedule} from '../../model/schedule';
import {DayScheduleSerial} from '../../model2/day-schedule-serial';
import {ScheduleContext} from '../../model2/schedule-context';

declare type OutputStyle = 'table' | 'detail-table' | 'calendar-chart';

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
  dayScheduleSerial: DayScheduleSerial;

  outputStyle: OutputStyle = 'table';
  showTitle = true;

  perspective: Perspective = 'class';
  timeScope: TimeScope = 'week';

  selectedClass: Class;
  selectedTeacher: Teacher;
  selectedClassroom: Classroom;

  selectedDate: Moment;
  selectedMonth: string; // MONTH_PICKER_FORMAT
  selectedWeek: Week;
  selectedTerm: Term;


  constructor(private scheduleService: ScheduleService,
              private termWeekService: TermWeekService) {
  }

  ngOnInit(): void {
    this.selectedDate = moment();
    this.selectedMonth = this.selectedDate.format(MONTH_PICKER_FORMAT);
    // this.selectedMonth = '2020-10';
  }

  async execute() {

    const filter: ScheduleFilter = this.setupFilter();
    if (!filter) {
      return;
    }

    const schedules = await this.scheduleService.querySchedules(filter).toPromise();

    await this.setupSchedules(filter, schedules);

    this.dayScheduleSerial = null;
    if (this.outputStyle === 'detail-table') {
      this.setupDayScheduleSerial();
    }

  }

  setupFilter(): ScheduleFilter | null {

    const filter: ScheduleFilter = new ScheduleFilter();

    const term = this.selectedTerm;
    switch (this.timeScope) {
      case 'day':
        if (!this.selectedDate) {
          return null;
        }
        filter.date = this.selectedDate.format(DATE_FORMAT);
        break;
      case 'week':
        if (!this.selectedWeek) {
          return null;
        }
        if (!term) {
          return null;
        }
        filter.termYear = term.termYear;
        filter.termMonth = term.termMonth;
        filter.weekno = this.selectedWeek.weekno;
        break;
      case 'month':
        if (!this.selectedMonth) {
          return null;
        }
        // YYYY-MM
        filter.yearMonth = this.selectedMonth;
        break;
      case 'term':
        if (!term) {
          return null;
        }
        filter.termYear = term.termYear;
        filter.termMonth = term.termMonth;
        break;
      default:
        return null;
    }

    switch (this.perspective) {
      case 'class':
        if (!this.selectedClass) {
          return null;
        }
        filter.classId = this.selectedClass.id;
        filter.context = {theClass: this.selectedClass};
        break;
      case 'teacher':
        if (!this.selectedTeacher) {
          return null;
        }
        filter.teacherId = this.selectedTeacher.id;
        filter.context = {teacher: this.selectedTeacher};
        break;
      case 'classroom':
        if (!this.selectedClassroom) {
          return null;
        }
        filter.siteId = this.selectedClassroom.id;
        filter.context = {site: this.selectedClassroom};
        break;
      default:
        return null;
    }

    return filter;
  }

  evalTitle(titlePerspectivePart: string, titleTimeScopePart: string): string {
    return `${titlePerspectivePart} ${titleTimeScopePart} 课表`;
  }

  async setupSchedules(filter: ScheduleFilter, schedules: Schedule[]) {

    console.log(filter);

    let titlePerspectivePart = '';
    switch (this.perspective) {
      case 'class':
        titlePerspectivePart = this.selectedClass.name;
        break;
      case 'teacher':
        titlePerspectivePart = this.selectedTeacher.name;
        break;
      case 'classroom':
        titlePerspectivePart = this.selectedClassroom.name;
        break;
    }

    const term = this.selectedTerm;
    switch (this.timeScope) {
      case 'day':
        const dateDim: DateDim = DateDim.fromMoment(this.selectedDate);
        this.daySchedule = new DaySchedule(dateDim, schedules);
        this.daySchedule.context = filter.context;
        this.daySchedule.title = this.evalTitle(titlePerspectivePart, dateDim.date);
        break;
      case 'week':
        this.weekSchedule = new WeekSchedule(this.selectedWeek, schedules);
        this.weekSchedule.context = filter.context;
        this.weekSchedule.title = this.evalTitle(titlePerspectivePart, `第${this.selectedWeek.weekno}周`);
        break;
      case 'month':
        const yearMonth = this.selectedMonth;
        const weeks = await this.termWeekService.getMonthWeeks(term, yearMonth).toPromise();
        const monthDim: MonthDim = new MonthDim(yearMonth, weeks);
        this.monthSchedule = new MonthSchedule(monthDim, schedules);
        this.monthSchedule.context = filter.context;
        this.monthSchedule.title = this.evalTitle(titlePerspectivePart, `${monthDim.year}年${monthDim.month}月`);
        break;
      case 'term':
        const termWeeks = await this.termWeekService.getTermWeeks(term).toPromise();
        const termDim: TermDim = {term, weeks: termWeeks};
        this.termSchedule = new TermSchedule(termDim, schedules);
        this.termSchedule.context = filter.context;
        this.termSchedule.title = this.evalTitle(titlePerspectivePart, term.name);
        break;
    }
  }

  setupDayScheduleSerial() {

    if (this.dayScheduleSerial) {
      return;
    }

    let daySchedules: DaySchedule[];
    let context: ScheduleContext;
    let title: string;

    switch (this.timeScope) {
      case 'week':
        if (!this.weekSchedule) {
          return;
        }
        daySchedules = this.weekSchedule.daySchedulesWithLessons;
        context = this.weekSchedule.context;
        title = this.weekSchedule.title;
        break;
      case 'month':
        if (!this.monthSchedule) {
          return;
        }
        daySchedules = this.monthSchedule.daySchedulesWithLessons;
        context = this.monthSchedule.context;
        title = this.monthSchedule.title;
        break;
      case 'term':
        if (!this.termSchedule) {
          return;
        }
        daySchedules = this.termSchedule.daySchedulesWithLessons;
        context = this.termSchedule.context;
        title = this.termSchedule.title;
        break;
      default:
        return;
    }

    if (!daySchedules) {
      this.dayScheduleSerial = null;
      return;
    }

    const scopedDaySchedules: ScopedDaySchedule[] = daySchedules
      .map(ds => {
        const sds = new ScopedDaySchedule();
        const dateDim = ds.dateDim;
        if (!dateDim.weekdayLabel) {
          DateDim.setDateLabels(dateDim);
        }

        sds.daySchedule = ds;
        sds.scopeLabel = `${dateDim.date}（${dateDim.weekdayLabel}）`;
        sds.scopeObj = dateDim;
        return sds;
      });

    this.dayScheduleSerial = {scopedDaySchedules, context, title};
  }

  perspectiveSelected(perspective: Perspective) {
    this.perspective = perspective;
    console.log(perspective);
  }

  ensureOutputStyle(outputStyles: OutputStyle[]): void {
    if (outputStyles.indexOf(this.outputStyle) === -1) {
      this.outputStyle = outputStyles[0];
    }
  }

  timeScopeSelected(timeScope: TimeScope) {
    this.timeScope = timeScope;
    console.log(timeScope);
    switch (this.timeScope) {
      case 'day':
        this.outputStyle = 'table';
        break;
      case 'week':
        this.ensureOutputStyle(['table', 'detail-table']);
        break;
      case 'month':
        break;
      case 'term':
        break;
    }
  }

  outputStyleChanged() {
    // console.log(this.outputStyleList);
    if (this.outputStyle === 'detail-table') {
      this.setupDayScheduleSerial();
    }
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
