import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge, BehaviorSubject} from 'rxjs';
import {Schedule} from '../../model/schedule';


export class ScheduleTableDatasource extends DataSource<Schedule> {
  data: Schedule[] = [];
  dataSubject: BehaviorSubject<Schedule[]> = new BehaviorSubject<Schedule[]>(this.data);

  paginator: MatPaginator;
  sort: MatSort;

  compareFieldMappers: { [column: string]: (s: Schedule) => number | string };

  constructor() {
    super();

    this.compareFieldMappers = {
      date: s => s.date,
      lessonIndex: s => s.timeStart,
      class: s => s.theClass ? 0 : s.theClass.name,
      classroom: s => s.site ? 0 : s.site.name,
      course: s => s.course ? 0 : s.course.name,
      teacher: s => s.teacher ? 0 : s.teacher.name,
    };
  }

  setData(data: Schedule[]) {
    this.data = data;
    console.log(data);
    this.dataSubject.next(data);
  }

  connect(): Observable<Schedule[]> {
    const dataMutations = [
      this.dataSubject,
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {
  }

  private getPagedData(data: Schedule[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Schedule[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';

      const fieldMapper = this.compareFieldMappers[this.sort.active];
      if (!fieldMapper) {
        return 0;
      }
      return compare(fieldMapper(a), fieldMapper(b), isAsc);
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  if (a === b) {
    return 0;
  }
  return isAsc ? (a < b ? -1 : 1) : (a < b ? 1 : -1);
}
