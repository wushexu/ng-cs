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
  selectedTrainingType = '';

  majorDimEnabled = false;
  classDimEnabled = false;
  classroomDimEnabled = false;
  teacherDimEnabled = false;
  courseDimEnabled = false;
  timeDimEnabled = true;
  lessonDimEnabled = false;
  trainingTypeDimEnabled = false;

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

    if (this.trainingTypeDimEnabled) {
      if (this.selectedTrainingType) {
        filter.trainingType = this.selectedTrainingType;
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

    const filter: ScheduleFilter = context.filter;

    const flatSchedules = new FlatSchedules();
    flatSchedules.schedules = schedules;
    flatSchedules.context = context;

    const titleParts: string[] = [];

    if (context.dept) {
      titleParts.push(`（系部）${context.dept.name}`);
    }
    if (context.major) {
      titleParts.push(`（专业）${context.major.name}`);
    }
    if (context.theClass) {
      titleParts.push(`（班级）${context.theClass.name}`);
    }
    if (context.teacher) {
      titleParts.push(`（教师）${context.teacher.name}`);
    }
    if (context.site) {
      titleParts.push(`（教室）${context.site.name}`);
    }
    if (context.course) {
      titleParts.push(`（课程）${context.course.name}`);
    }
    if (filter.trainingType) {
      const typeName = filter.trainingType === 'N' ? '理论课' : '实训课';
      titleParts.push(typeName);
    }

    titleParts.push(this.evalTitleTimePart());

    if (filter.lesson) {
      const liCn = ['一', '二', '三', '四', '五'][context.filter.lesson - 1];
      titleParts.push(`第${liCn}节`);
    }

    const titleMain = titleParts.join(' ');

    flatSchedules.title = `${titleMain} 课表`;

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

  lessonSelected(lessonIndex: number) {
    this.selectedLesson = lessonIndex;
    console.log(lessonIndex);
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
