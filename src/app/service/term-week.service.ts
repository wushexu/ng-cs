import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {Term} from '../model-api/term';
import {Week} from '../model-api/week';
import {environment} from '../../environments/environment';


@Injectable()
export class TermWeekService {

  termsBaseUrl: string;
  weeksBaseUrl: string;

  $terms: Observable<Term[]>;

  constructor(protected http: HttpClient) {
    const base = environment.apiBase;
    this.termsBaseUrl = `${base}/terms`;
    this.weeksBaseUrl = `${base}/weeks`;
  }

  getTerms(): Observable<Term[]> {
    if (!this.$terms) {
      this.$terms = this.http.get<Term[]>(this.termsBaseUrl).pipe(shareReplay());
    }
    return this.$terms;
  }

  getTermWeeks(term: Term): Observable<Week[]> {
    if (term.weeks) {
      return of(term.weeks);
    }
    const url = `${this.weeksBaseUrl}?termYear=${term.termYear}&termMonth=${term.termMonth}`;
    return this.http.get<Week[]>(url).pipe(tap(ws => term.weeks = ws));
  }

  getMonthWeeks(term: Term, yearMonth: string): Observable<Week[]> {
    return this.getTermWeeks(term).pipe(
      map(weeks => {
        return weeks.filter(
          w => w.firstDay.startsWith(yearMonth)
            || w.lastDay.startsWith(yearMonth));
      })
    );
  }

}
