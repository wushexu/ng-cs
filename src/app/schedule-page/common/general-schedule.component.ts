import {Moment} from 'moment';

import {DATE_FORMAT} from '../../config';
import {Perspective, ScheduleFilter, TimeScope} from '../../model2/schedule-filter';
import {Class} from '../../model/class';
import {Teacher} from '../../model/teacher';
import {Classroom} from '../../model/site';
import {Week} from '../../model/week';
import {Term} from '../../model/term';


export class GeneralScheduleComponent {

  showTitle = true;

  perspective: Perspective = 'class';
  perspectiveFixed = false;
  timeScope: TimeScope = 'week';

  selectedClass: Class;
  selectedTeacher: Teacher;
  selectedClassroom: Classroom;

  selectedDate: Moment;
  selectedMonth: string; // MONTH_PICKER_FORMAT
  selectedWeek: Week;
  selectedTerm: Term;


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

  perspectiveSelected(perspective: Perspective) {
    this.perspective = perspective;
    console.log(perspective);
  }

  timeScopeSelected(timeScope: TimeScope) {
    this.timeScope = timeScope;
    console.log(timeScope);
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
