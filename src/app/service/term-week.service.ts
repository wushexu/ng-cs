import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map, shareReplay, tap} from 'rxjs/operators';

import {Term} from '../model-api/term';
import {Week} from '../model-api/week';
import {environment} from '../../environments/environment';
import {DATA_CACHE_TIME} from '../config';


@Injectable()
export class TermWeekService {

  termsBaseUrl: string;
  weeksBaseUrl: string;

  $terms: Observable<Term[]>;

  constructor(protected http: HttpClient) {
    const base = environment.apiBase;
    this.termsBaseUrl = `${base}/terms`;
    this.weeksBaseUrl = `${base}/weeks`;

    setInterval(() => {
        this.$terms = null;
      },
      DATA_CACHE_TIME);
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
    const url = `${this.weeksBaseUrl}?termId=${term.id}`;
    return this.http.get<Week[]>(url)
      .pipe(
        tap(weeks => {
          term.weeks = weeks;
          for (const week of weeks) {
            week.term = term;
          }
        })
      );
  }


  findTermByMonth(yearMonth: string): Observable<Term> {
    return this.getTerms().pipe(map(terms => {
      return terms.find(term => {
        // YYYY-MM-DD
        if (!term.firstDay || !term.lastDay) {
          return false;
        }
        const firstMonth = term.firstDay.substr(0, 7);
        const lastMonth = term.lastDay.substr(0, 7);
        return yearMonth >= firstMonth && yearMonth <= lastMonth;
      });
    }));
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
