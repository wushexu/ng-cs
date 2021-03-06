import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import * as moment from 'moment';

import {DEBUG, MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model-table-data/day-schedule';
import {DateDim} from '../../model-api/date-dim';
import {ScheduleFilter} from '../../model-app/schedule-params';
import {Perspective, TimeScope} from '../../model-app/schedule-query-def';
import {Class} from '../../model-api/class';
import {Teacher} from '../../model-api/teacher';
import {Classroom} from '../../model-api/site';
import {WeekSchedule} from '../../model-table-data/week-schedule';
import {MonthSchedule} from '../../model-table-data/month-schedule';
import {TermSchedule} from '../../model-table-data/term-schedule';
import {ScopedDaySchedule} from '../../model-table-data/scoped-day-schedule';
import {MonthDim} from '../../model-app/month-dim';
import {TermDim} from '../../model-app/term-dim';
import {TermWeekService} from '../../service/term-week.service';
import {Schedule} from '../../model-api/schedule';
import {DayScheduleSerial} from '../../model-table-data/day-schedule-serial';
import {ScheduleContext} from '../../model-app/schedule-context';
import {TeacherService} from '../../service/teacher.service';
import {ClassService} from '../../service/class.service';
import {ClassroomService} from '../../service/classroom.service';
import {BasicQuery} from '../common/basic-query';
import {errorHandler, handle404} from '../../common/util';


declare type OutputStyle = 'table' | 'detail-table' | 'calendar-chart';

@Component({
  selector: 'app-single-perspective-query',
  templateUrl: './single-perspective-query.component.html',
  styleUrls: ['./single-perspective-query.component.css']
})
export class SinglePerspectiveQueryComponent extends BasicQuery implements OnInit {

  daySchedule: DaySchedule;
  weekSchedule: WeekSchedule;
  monthSchedule: MonthSchedule;
  termSchedule: TermSchedule;
  dayScheduleSerial: DayScheduleSerial;

  perspective: Perspective = 'class';
  perspectiveFixed = false;
  outputStyle: OutputStyle = 'table';

  constructor(private scheduleService: ScheduleService,
              private termWeekService: TermWeekService,
              private classService: ClassService,
              private teacherService: TeacherService,
              private classroomService: ClassroomService,
              private route: ActivatedRoute) {
    super();
    route.data.subscribe(data => {
      const perspective = data.perspective;
      const perspectiveFixed = data.perspectiveFixed;
      if (typeof perspective === 'string') {
        this.perspective = perspective as Perspective;
      }
      if (typeof perspectiveFixed === 'boolean') {
        this.perspectiveFixed = perspectiveFixed;
      }
    });
  }

  ngOnInit(): void {
    this.selectedDate = moment();
    this.selectedMonth = this.selectedDate.format(MONTH_PICKER_FORMAT);

    this.route.paramMap.subscribe((params: ParamMap) => {
        if (DEBUG) {
          console.log(params);
        }
        if (params.has('class-idc')) {
          const idc = params.get('class-idc');
          this.classService.getClassByIdc(idc)
            .subscribe((theClass: Class) => {
                this.perspective = 'class';
                this.perspectiveFixed = true;
                this.selectedClass = theClass;
              },
              handle404('未找到班级 ' + idc));
          return;
        }
        if (params.has('teacher-idc')) {
          const idc = params.get('teacher-idc');
          this.teacherService.getTeacherByIdc(idc)
            .subscribe((teacher: Teacher) => {
                this.perspective = 'teacher';
                this.perspectiveFixed = true;
                this.selectedTeacher = teacher;
              },
              handle404('未找到教师 ' + idc));
          return;
        }
        if (params.has('classroom-id')) {
          const id = +params.get('classroom-id');
          this.classroomService.getClassroom(id)
            .subscribe((classroom: Classroom) => {
                this.perspective = 'classroom';
                this.perspectiveFixed = true;
                this.selectedClassroom = classroom;
              },
              handle404('未找到教室 ' + id));
          return;
        }
      },
      errorHandler);
  }

  async execute() {

    const context: ScheduleContext = this.setupContext();
    if (!context) {
      return;
    }

    const filter: ScheduleFilter = context.filter;

    const schedules = await this.scheduleService.query(filter).toPromise();

    await this.setupSchedules(context, schedules);

    this.dayScheduleSerial = null;
    if (this.outputStyle === 'detail-table') {
      this.setupDayScheduleSerial();
    }

  }

  setupContext(): ScheduleContext | null {

    const context = new ScheduleContext();
    context.filter = new ScheduleFilter();

    const ok1 = this.setupTimeFilter(context);
    if (!ok1) {
      return null;
    }

    const ok2 = this.setupPerspectiveFilter(context);
    if (!ok2) {
      return null;
    }

    return context;
  }

  setupPerspectiveFilter(context: ScheduleContext): boolean {
    const filter: ScheduleFilter = context.filter;

    switch (this.perspective) {
      case 'class':
        if (!this.selectedClass) {
          return false;
        }
        filter.classId = this.selectedClass.id;
        context.theClass = this.selectedClass;
        return true;
      case 'teacher':
        if (!this.selectedTeacher) {
          return false;
        }
        filter.teacherId = this.selectedTeacher.id;
        context.teacher = this.selectedTeacher;
        return true;
      case 'classroom':
        if (!this.selectedClassroom) {
          return false;
        }
        filter.siteId = this.selectedClassroom.id;
        context.site = this.selectedClassroom;
        return true;
      default:
        return false;
    }
  }

  async setupSchedules(context: ScheduleContext, schedules: Schedule[]) {

    const filter: ScheduleFilter = context.filter;
    if (DEBUG) {
      console.log(filter);
    }

    let titlePersPart = '';
    switch (this.perspective) {
      case 'class':
        titlePersPart = this.selectedClass.name;
        break;
      case 'teacher':
        titlePersPart = this.selectedTeacher.name;
        break;
      case 'classroom':
        titlePersPart = this.selectedClassroom.name;
        break;
    }

    const titleParts: string[] = [];
    this.evalTitleTimePart(titleParts, context);
    const title = `${titlePersPart} ${titleParts.join(' ')} 课表`;

    switch (this.timeScope) {
      case 'day':
        const dateDim: DateDim = DateDim.fromMoment(this.selectedDate);
        this.daySchedule = new DaySchedule(context, dateDim, schedules);
        this.daySchedule.title = title;
        break;
      case 'week':
        this.weekSchedule = new WeekSchedule(context, this.selectedWeek, schedules);
        this.weekSchedule.title = title;
        break;
      case 'month':
        const yearMonth = this.selectedMonth;
        const term1 = await this.termWeekService.findTermByMonth(yearMonth).toPromise();
        const weeks = await this.termWeekService.getMonthWeeks(term1, yearMonth).toPromise();
        const monthDim: MonthDim = new MonthDim(yearMonth, weeks);
        this.monthSchedule = new MonthSchedule(context, monthDim, schedules);
        this.monthSchedule.title = title;
        break;
      case 'term':
        const term = this.selectedTerm;
        const termWeeks = await this.termWeekService.getTermWeeks(term).toPromise();
        const termDim: TermDim = {term, weeks: termWeeks};
        this.termSchedule = new TermSchedule(context, termDim, schedules);
        this.termSchedule.title = title;
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
        const sds = new ScopedDaySchedule(context);
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

  perspectiveSelected(perspective: Perspective) {
    this.perspective = perspective;
    if (DEBUG) {
      console.log(perspective);
    }
  }

}
