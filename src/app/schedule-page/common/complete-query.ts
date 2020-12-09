import {ScheduleFilter} from '../../model-app/schedule-params';
import {TimeScope} from '../../model-app/schedule-query-def';
import {ScheduleContext} from '../../model-app/schedule-context';
import {BasicQuery} from './basic-query';
import {Dept} from '../../model-api/dept';
import {Major} from '../../model-api/major';
import {Course} from '../../model-api/course';


export class CompleteQuery extends BasicQuery {

  timeScope: TimeScope = 'day';

  selectedDept: Dept;
  selectedMajor: Major;
  selectedClassYear: number;
  selectedLesson = 1;
  selectedCourse: Course;
  selectedCourseCate: string;
  selectedCourseType = '';

  majorDimEnabled = false;
  classDimEnabled = false;
  classroomDimEnabled = false;
  teacherDimEnabled = false;
  courseDimEnabled = false;
  timeDimEnabled = true;
  lessonDimEnabled = false;
  courseTypeDimEnabled = false;

  majorDim: 'dept' | 'major' = 'dept';
  classDim: 'year' | 'class' = 'class';
  courseDim: 'cate' | 'course' = 'course';
  // classroomDim: 'dept' | 'room';
  // teacherDim: 'teacher';

  constructor() {
    super();
  }


  setupContext(): ScheduleContext | null {

    const context = new ScheduleContext();

    const filter = new ScheduleFilter();
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

    if (this.courseTypeDimEnabled) {
      if (this.selectedCourseType) {
        filter.courseType = this.selectedCourseType;
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


  evalTitleTimePart(titleParts: string[], context: ScheduleContext): void {
    if (this.timeDimEnabled) {
      super.evalTitleTimePart(titleParts, context);
    }

    if (context.filter.lesson) {
      const liCn = ['一', '二', '三', '四', '五'][context.filter.lesson - 1];
      titleParts.push(`第${liCn}节`);
    }
  }

  evalTitleNonTimePart(titleParts: string[], context: ScheduleContext): void {

    const filter: ScheduleFilter = context.filter;

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
    if (filter.courseType) {
      const typeName = filter.courseType === 'N' ? '理论课' : '实训课';
      titleParts.push(typeName);
    }
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
