import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

import {Term} from '../model/term';
import {Week} from '../model/week';


@Injectable()
export class TermWeekService {

  constructor(protected http: HttpClient) {
    // let apiBase = environment.apiBase || '';
    // this.baseUrl = `${apiBase}/profile`;
  }

  terms: Term[] = [
    {
      id: '202003',
      termYear: 2020,
      termMonth: 3
    },
    {
      id: '202009',
      termYear: 2020,
      termMonth: 9
    }
  ];

  weeks1: Week[] = [
    {
      firstDay: '2020-09-07',
      lastDay: '2020-09-13',
      termMonth: 9,
      termYear: 2020,
      weekno: 1
    },
    {
      firstDay: '2020-09-14',
      lastDay: '2020-09-20',
      termMonth: 9,
      termYear: 2020,
      weekno: 2
    },
    {
      firstDay: '2020-09-21',
      lastDay: '2020-09-28',
      termMonth: 9,
      termYear: 2020,
      weekno: 3
    },
    {
      firstDay: '2020-09-28',
      lastDay: '2020-10-04',
      termMonth: 9,
      termYear: 2020,
      weekno: 4
    },
    {
      firstDay: '2020-10-05',
      lastDay: '2020-10-11',
      termMonth: 9,
      termYear: 2020,
      weekno: 5
    },
    {
      firstDay: '2020-10-12',
      lastDay: '2020-10-18',
      termMonth: 9,
      termYear: 2020,
      weekno: 6
    },
    {
      firstDay: '2020-10-19',
      lastDay: '2020-10-25',
      termMonth: 9,
      termYear: 2020,
      weekno: 7
    }
  ];

  getTerms(): Observable<Term[]> {

    this.terms.map(term => {
      term.name = `${term.termYear}年${term.termMonth === 3 ? '春季' : '秋季'}学期`;
      return term;
    });

    return of(this.terms);
  }


  getTermWeeks(term: Term): Observable<Week[]> {

    this.weeks1.forEach(w => w.term = term);
    return of(this.weeks1);
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
