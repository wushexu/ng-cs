import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

import {MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {ScheduleFilter, TimeScope} from '../../model2/schedule-filter';
import {Schedule} from '../../model/schedule';
import {ScheduleContext} from '../../model2/schedule-context';
import {GeneralScheduleComponent} from '../common/general-schedule.component';
import {Dept} from '../../model/dept';
import {Major} from '../../model/major';
import {FlatSchedules} from '../../model2/flat-schedules';
import {Course} from '../../model/course';


@Component({
  selector: 'app-integrated-query',
  templateUrl: './integrated-query.component.html',
  styleUrls: ['./integrated-query.component.css']
})
export class IntegratedQueryComponent extends GeneralScheduleComponent implements OnInit {

  flatSchedules: FlatSchedules;

  timeScope: TimeScope = 'day';

  selectedDept: Dept;
  selectedMajor: Major;
  selectedClassYear: number;
  selectedLesson = 1;
  selectedCourse: Course;
  selectedCourseCate: string;

  majorDimEnabled = false;
  classDimEnabled = false;
  classroomDimEnabled = false;
  teacherDimEnabled = false;
  courseDimEnabled = true;
  timeDimEnabled = true;
  lessonDimEnabled = false;

  majorDim: 'dept' | 'major' = 'dept';
  classDim: 'year' | 'class' = 'class';
  courseDim: 'cate' | 'course' = 'course';
  // classroomDim: 'dept' | 'room';
  // teacherDim: 'teacher';

  constructor(private scheduleService: ScheduleService) {
    super();
  }

  ngOnInit(): void {
    this.selectedDate = moment();
    this.selectedMonth = this.selectedDate.format(MONTH_PICKER_FORMAT);

  }

  async execute() {

    const context: ScheduleContext = this.setupContext();
    if (!context) {
      return;
    }

    const filter: ScheduleFilter = context.filter;

    const schedules = await this.scheduleService.querySchedules(filter).toPromise();

    await this.setupSchedules(context, schedules);
  }

  setupContext(): ScheduleContext | null {

    const context = new ScheduleContext();

    const filter: ScheduleFilter = new ScheduleFilter();
    context.filter = filter;

    if (this.majorDimEnabled) {
      if (this.majorDim === 'dept') {
        if (this.selectedDept) {
          filter.deptId = this.selectedDept.id;
          context.dept = this.selectedDept;
        }
      } else if (this.majorDim === 'major') {
        if (this.selectedMajor) {
          filter.majorId = this.selectedMajor.id;
          context.major = this.selectedMajor;
        }
      }
    }

    if (this.classDimEnabled) {
      if (this.classDim === 'year') {
        filter.classYear = this.selectedClassYear;
      } else if (this.classDim === 'class') {
        filter.classId = this.selectedClass.id;
        context.theClass = this.selectedClass;
      }
    }

    if (this.classroomDimEnabled) {
      if (this.selectedClassroom) {
        filter.siteId = this.selectedClassroom.id;
        context.site = this.selectedClassroom;
      }
    }

    if (this.courseDimEnabled) {
      if (this.courseDim === 'course') {
        if (this.selectedCourse) {
          filter.courseCode = this.selectedCourse.code;
          context.course = this.selectedCourse;
        }
      } else if (this.courseDim === 'cate') {
        filter.courseCate = this.selectedCourseCate;
      }
    }

    if (this.lessonDimEnabled) {
      filter.lesson = this.selectedLesson;
    }

    if (this.teacherDimEnabled) {
      if (this.selectedTeacher) {
        filter.teacherId = this.selectedTeacher.id;
        context.teacher = this.selectedTeacher;
      }
    }

    if (this.timeDimEnabled) {
      const ok1 = this.setupTimeFilter(context);
      if (!ok1) {
        return null;
      }
    }

    return context;
  }


  async setupSchedules(context: ScheduleContext, schedules: Schedule[]) {

    console.log(context);

    const flatSchedules = new FlatSchedules();
    flatSchedules.schedules = schedules;
    flatSchedules.context = context;

    // TODO: title

    this.flatSchedules = flatSchedules;
  }

  deptSelected(dept: Dept) {
    this.selectedDept = dept;
    console.log(dept);
  }

  majorSelected(major: Major) {
    this.selectedMajor = major;
    console.log(major);
  }

  classYearSelected(year: number) {
    this.selectedClassYear = year;
    console.log(year);
  }

  courseSelected(course: Course) {
    this.selectedCourse = course;
    console.log(course);
  }

  courseCateSelected(cate: string) {
    this.selectedCourseCate = cate;
    console.log(cate);
  }

}
