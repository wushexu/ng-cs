import {Moment} from 'moment';

import {DATE_FORMAT} from '../../config';
import {ScheduleFilter, TimeScope} from '../../model2/schedule-filter';
import {Class} from '../../model/class';
import {Teacher} from '../../model/teacher';
import {Classroom} from '../../model/site';
import {Week} from '../../model/week';
import {Term} from '../../model/term';
import {ScheduleContext} from '../../model2/schedule-context';
import {DateDim} from '../../model/date-dim';
import {MonthDim} from '../../model2/month-dim';


export class BasicQuery {

  showTitle = true;

  timeScope: TimeScope = 'week';

  selectedClass: Class;
  selectedTeacher: Teacher;
  selectedClassroom: Classroom;

  selectedDate: Moment;
  selectedMonth: string; // MONTH_PICKER_FORMAT
  selectedWeek: Week;
  selectedTerm: Term;

  setupTimeFilter(context: ScheduleContext): boolean {

    const filter: ScheduleFilter = context.filter;

    const term = this.selectedTerm;
    switch (this.timeScope) {
      case 'day':
        if (!this.selectedDate) {
          return false;
        }
        filter.date = this.selectedDate.format(DATE_FORMAT);
        return true;
      case 'week':
        if (!this.selectedWeek) {
          return false;
        }
        if (!term) {
          return false;
        }
        filter.termYear = term.termYear;
        filter.termMonth = term.termMonth;
        filter.weekno = this.selectedWeek.weekno;
        return true;
      case 'month':
        if (!this.selectedMonth) {
          return false;
        }
        // YYYY-MM
        filter.yearMonth = this.selectedMonth;
        return true;
      case 'term':
        if (!term) {
          return false;
        }
        filter.termYear = term.termYear;
        filter.termMonth = term.termMonth;
        return true;
      default:
        return false;
    }
  }

  evalTitleTimePart(titleParts: string[], context: ScheduleContext): void {
    const term = this.selectedTerm;
    switch (this.timeScope) {
      case 'day':
        const dateDim = DateDim.fromMoment(this.selectedDate);
        DateDim.setDateLabels(dateDim);
        titleParts.push(`${dateDim.date}（${dateDim.weekdayLabel}）`);
        return;
      case 'week':
        titleParts.push(`第${this.selectedWeek.weekno}周`);
        return;
      case 'month':
        const monthDim: MonthDim = new MonthDim(this.selectedMonth, []);
        titleParts.push(`${monthDim.year}年${monthDim.month}月`);
        return;
      case 'term':
        titleParts.push(term.name);
        return;
    }
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
