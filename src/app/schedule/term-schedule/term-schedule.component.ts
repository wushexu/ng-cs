import {Component, OnInit} from '@angular/core';

import {ScheduleService} from '../../service/schedule.service';
import {Week} from '../../model/week';
import {TermSchedule} from '../../model2/term-schedule';
import {TermDim} from '../../model2/term-dim';
import {Term} from '../../model/term';

@Component({
  selector: 'app-term-schedule',
  templateUrl: './term-schedule.component.html',
  styleUrls: ['./term-schedule.component.css']
})
export class TermScheduleComponent implements OnInit {

  termSchedule: TermSchedule;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    const week0: Week = {
      firstDay: '20200928',
      lastDay: '20201104',
      termMonth: 9,
      termYear: 2020,
      weekno: 4
    };
    const week1: Week = {
      firstDay: '20201005',
      lastDay: '20201011',
      termMonth: 9,
      termYear: 2020,
      weekno: 5
    };
    const week2: Week = {
      firstDay: '20201012',
      lastDay: '20201018',
      termMonth: 9,
      termYear: 2020,
      weekno: 6
    };

    const term: Term = {id: '2020.9', termYear: 2020, termMonth: 9};

    const termDim: TermDim = {term, weeks: [week0, week1, week2]};
    this.scheduleService.querySchedules()
      .subscribe(schedules => {
        // check in one day; sort, check overlap
        this.termSchedule = new TermSchedule(termDim, schedules);
      });
  }

}
