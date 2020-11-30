import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {TermWeekService} from '../../service/term-week.service';
import {Term} from '../../model/term';
import {Week} from '../../model/week';

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
      });
  }

  termChanged() {
    if (!this.selectedTerm) {
      return;
    }
    this.service.getTermWeeks(this.selectedTerm)
      .subscribe((weeks: Week[]) => {
        this.weeks = weeks;
        this.selectedWeek = weeks[0];
        this.selected.emit(this.selectedWeek);
      });
  }

  weekSelected() {
    this.selected.emit(this.selectedWeek);
  }

}
