import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {TermWeekService} from '../../service/term-week.service';
import {Term} from '../../model/term';

@Component({
  selector: 'app-term-select',
  templateUrl: './term-select.component.html',
  styleUrls: ['./term-select.component.css']
})
export class TermSelectComponent implements OnInit {

  @Output() selected: EventEmitter<Term> = new EventEmitter<Term>();

  terms: Term[];

  selectedTerm: Term;

  constructor(private service: TermWeekService) {
  }

  ngOnInit(): void {

    this.service.getTerms()
      .subscribe((terms: Term[]) => {
        this.terms = terms;
        this.selectedTerm = terms[terms.length - 1];
        this.selected.emit(this.selectedTerm);
      });
  }

  classSelected() {
    this.selected.emit(this.selectedTerm);
  }

}
