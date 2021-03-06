import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, merge, BehaviorSubject} from 'rxjs';


export const ScheduleCompareFieldMappers = {
  term: s => s.termId,
  dept: s => s.dept ? s.dept.name : 0,
  major: s => s.major ? s.major.name : 0,
  class: s => s.theClass ? s.theClass.name : 0,
  classSize: s => s.theClass ? s.theClass.size : 0,
  classroom: s => s.site ? s.site.name : 0,
  classroomCapacity: s => s.site ? s.site.capacity : 0,
  course: s => s.course ? s.course.name : 0,
  teacher: s => s.teacher ? s.teacher.name : 0
};


export class TableDatasource<T> extends DataSource<T> {
  data: T[] = [];
  dataSubject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>(this.data);

  paginator?: MatPaginator;
  sort: MatSort;

  compareFieldMappers: { [column: string]: (s: T) => number | string };


  setData(data: T[]) {
    this.data = data;
    this.dataSubject.next(data);
  }

  connect(): Observable<T[]> {
    const dataMutations = [
      this.dataSubject,
      this.paginator?.page,
      this.sort.sortChange
    ].filter(e => e);

    return merge(...dataMutations).pipe(map(() => {
      const sortedData = this.getSortedData([...this.data]);
      if (this.paginator) {
        return this.getPagedData(sortedData);
      } else {
        return sortedData;
      }
    }));
  }

  disconnect() {
  }

  protected getPagedData(data: T[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  protected getSortedData(data: T[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';

      const column = this.sort.active;
      const fieldMapper = this.compareFieldMappers[column];
      if (fieldMapper) {
        return compare(fieldMapper(a), fieldMapper(b), isAsc);
      }
      const fieldA = a[column];
      const fieldB = b[column];
      if (typeof fieldA === 'undefined' || typeof fieldB === 'undefined') {
        return 0;
      }
      return compare(fieldA, fieldB, isAsc);
    });
  }
}

function compare(a: string | number, b: string | number, isAsc: boolean) {
  if (a === b) {
    return 0;
  }
  if (typeof a === 'string' && typeof b === 'string') {
    const r = a.localeCompare(b);
    return isAsc ? r : -r;
  }
  return isAsc ? (a < b ? -1 : 1) : (a < b ? 1 : -1);
}
