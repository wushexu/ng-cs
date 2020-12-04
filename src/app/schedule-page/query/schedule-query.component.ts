import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import * as moment from 'moment';

import {MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {ScheduleFilter, TimeScope} from '../../model2/schedule-filter';
import {Class} from '../../model/class';
import {Teacher} from '../../model/teacher';
import {Classroom} from '../../model/site';
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
import {TeacherCourseService} from '../../service/teacher-course.service';
import {DeptMajorClassService} from '../../service/dept-major-class.service';
import {ClassroomService} from '../../service/classroom.service';
import {GeneralScheduleComponent} from '../common/general-schedule.component';


declare type OutputStyle = 'table' | 'detail-table' | 'calendar-chart';

@Component({
  selector: 'app-schedule-query',
  templateUrl: './schedule-query.component.html',
  styleUrls: ['./schedule-query.component.css']
})
export class ScheduleQueryComponent extends GeneralScheduleComponent implements OnInit {

  daySchedule: DaySchedule;
  weekSchedule: WeekSchedule;
  monthSchedule: MonthSchedule;
  termSchedule: TermSchedule;
  dayScheduleSerial: DayScheduleSerial;

  outputStyle: OutputStyle = 'table';



  constructor(private scheduleService: ScheduleService,
              private termWeekService: TermWeekService,
              private deptMajorClassService: DeptMajorClassService,
              private teacherCourseService: TeacherCourseService,
              private classroomService: ClassroomService,
              private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.selectedDate = moment();
    this.selectedMonth = this.selectedDate.format(MONTH_PICKER_FORMAT);

    this.route.paramMap.subscribe((params: ParamMap) => {
      console.log(params);
      if (params.has('class-idc')) {
        this.deptMajorClassService.getClassByIdc(params.get('class-idc'))
          .subscribe((theClass: Class) => {
            this.perspective = 'class';
            this.perspectiveFixed = true;
            this.selectedClass = theClass;
          });
        return;
      }
      if (params.has('teacher-idc')) {
        this.teacherCourseService.getTeacherByIdc(params.get('teacher-idc'))
          .subscribe((teacher: Teacher) => {
            this.perspective = 'teacher';
            this.perspectiveFixed = true;
            this.selectedTeacher = teacher;
          });
        return;
      }
      if (params.has('classroom-id')) {
        this.classroomService.getClassroom(+params.get('classroom-id'))
          .subscribe((classroom: Classroom) => {
            this.perspective = 'classroom';
            this.perspectiveFixed = true;
            this.selectedClassroom = classroom;
          });
        return;
      }
    });
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

  ensureOutputStyle(outputStyles: OutputStyle[]): void {
    if (outputStyles.indexOf(this.outputStyle) === -1) {
      this.outputStyle = outputStyles[0];
    }
  }

  timeScopeSelected(timeScope: TimeScope) {
    super.timeScopeSelected(timeScope);
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
    // console.log(this.outputStyle);
    if (this.outputStyle === 'detail-table') {
      this.setupDayScheduleSerial();
    }
  }


}
