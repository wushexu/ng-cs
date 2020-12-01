import {Pipe, PipeTransform} from '@angular/core';


@Pipe({name: 'dateMd'})
export class DateMdPipe implements PipeTransform {

  transform(date: string): string {

    if (!date) {
      return '';
    }
    // 2020-12-01 -> 12-01
    return date.substr(5);
  }
}
