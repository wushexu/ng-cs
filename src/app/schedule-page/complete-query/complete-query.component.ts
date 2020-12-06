import {Component, OnInit} from '@angular/core';

import * as moment from 'moment';

import {MONTH_PICKER_FORMAT} from '../../config';
import {ScheduleService} from '../../service/schedule.service';
import {ScheduleFilter} from '../../model2/schedule-filter';
import {Schedule} from '../../model/schedule';
import {ScheduleContext} from '../../model2/schedule-context';
import {FlatSchedules} from '../../model2/flat-schedules';
import {CompleteQuery} from '../common/complete-query';


@Component({
  selector: 'app-complete-query',
  templateUrl: './complete-query.component.html',
  styleUrls: ['./complete-query.component.css']
})
export class CompleteQueryComponent extends CompleteQuery implements OnInit {

  flatSchedules: FlatSchedules;


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


  async setupSchedules(context: ScheduleContext, schedules: Schedule[]) {

    console.log(context);

    const filter: ScheduleFilter = context.filter;

    const flatSchedules = new FlatSchedules();
    flatSchedules.schedules = schedules;
    flatSchedules.context = context;

    const titleParts: string[] = [];
    this.evalTitleNonTimePart(titleParts, context);
    this.evalTitleTimePart(titleParts, context);

    const titleMain = titleParts.join(' ');
    flatSchedules.title = `${titleMain} 课表`;

    this.flatSchedules = flatSchedules;
  }

}
