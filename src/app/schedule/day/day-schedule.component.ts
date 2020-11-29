import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Moment} from 'moment';

import {ScheduleService} from '../../service/schedule.service';
import {DaySchedule} from '../../model2/day-schedule';
import {DateDim} from '../../model/date-dim';
import {ScheduleContext} from '../../model2/schedule-context';
import {ScheduleFilter} from '../../model2/schedule-filter';
import {MatDatepicker} from '@angular/material/datepicker';


@Component({
  selector: 'app-day-schedule',
  templateUrl: './day-schedule.component.html',
  styleUrls: ['./day-schedule.component.css']
})
export class DayScheduleComponent implements OnInit, AfterViewInit {
  @ViewChild('datePicker') datePicker: MatDatepicker<Moment>;
  @ViewChild('monthPicker') monthPicker: MatDatepicker<Moment>;

  daySchedule: DaySchedule;
  context: ScheduleContext = {};
  perspective: 'class' | 'teacher' | 'room';

  filter: ScheduleFilter = new ScheduleFilter();

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {

    const dateDim: DateDim = {weekno: 1, dayOfWeek: 1, date: '20201123'};
    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        this.daySchedule = new DaySchedule(dateDim, schedules);
      });
  }

  ngAfterViewInit(): void {
    console.log(this.datePicker);
    console.log(this.monthPicker);
  }

  execute(): void {

  }

  monthSelected(yearMonth: string): void {
    console.log(yearMonth);
    this.filter.month = yearMonth;
  }

}
