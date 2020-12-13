import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import * as moment from 'moment';

import {TermWeekService} from '../../service/term-week.service';
import {Term} from '../../model-api/term';
import {Week} from '../../model-api/week';
import {DATE_FORMAT} from '../../config';
import {errorHandler} from '../util';

@Component({
  selector: 'app-term-week-select',
  templateUrl: './term-week-select.component.html',
  styleUrls: ['./term-week-select.component.css']
})
export class TermWeekSelectComponent implements OnInit {

  @Output() selected: EventEmitter<Week> = new EventEmitter<Week>();

  terms: Term[];
  weeks: Week[];

  selectedTerm: Term;
  selectedWeek: Week;

  constructor(private service: TermWeekService) {
  }

  ngOnInit(): void {

    this.service.getTerms()
      .subscribe((terms: Term[]) => {
          this.terms = terms;
          this.selectedTerm = terms[terms.length - 1];
          this.termChanged();
        },
        errorHandler);
  }

  termChanged() {
    if (!this.selectedTerm) {
      return;
    }
    this.service.getTermWeeks(this.selectedTerm)
      .subscribe((weeks: Week[]) => {
          this.weeks = weeks;
          const today = moment().format(DATE_FORMAT);
          this.selectedWeek = weeks.find(w => today.localeCompare(w.lastDay) <= 0);
          if (!this.selectedWeek) {
            this.selectedWeek = this.weeks[this.weeks.length - 1];
          }
          this.selected.emit(this.selectedWeek);
        },
        errorHandler);
  }

  weekSelected() {
    this.selected.emit(this.selectedWeek);
  }

  roll(ws: number): void {
    if (!this.selectedWeek) {
      return;
    }
    const len = this.weeks.length;
    const index = this.weeks.indexOf(this.selectedWeek);
    if (index === -1) {
      this.selectedWeek = this.weeks[0];
      return;
    }
    this.selectedWeek = this.weeks[(index + ws + len) % len];
  }

}
