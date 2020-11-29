import {MatPaginatorIntl} from '@angular/material/paginator';
import {MatDateFormats} from '@angular/material/core';

const PaginatorIntl = new MatPaginatorIntl();
PaginatorIntl.itemsPerPageLabel = '每页条数';
PaginatorIntl.nextPageLabel = '';
PaginatorIntl.previousPageLabel = '';
PaginatorIntl.firstPageLabel = '';
PaginatorIntl.lastPageLabel = '';
PaginatorIntl.getRangeLabel = (page: number,
                               pageSize: number,
                               length: number): string => {
  // let to = (page + 1) * pageSize;
  // return `${page * pageSize + 1} – ${to > length ? length : to} of ${length}`;
  const pages = Math.ceil(length / pageSize);
  return `第 ${page + 1}/${pages} 页`;
};


const DATE_FORMAT = 'YYYY-MM-DD';

const DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: DATE_FORMAT
  },
  display: {
    dateInput: DATE_FORMAT,
    monthYearLabel: 'YYYY-MM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM'
  },
};

export {
  PaginatorIntl,
  DATE_FORMATS,
  DATE_FORMAT
};
