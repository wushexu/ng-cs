import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';


@Injectable()
export class ScheduleService {

  // constructor(protected http: HttpClient,
  //             protected dialog: MatDialog) {
  //   super(http, dialog);
  //   let apiBase = environment.apiBase || '';
  //   this.baseUrl = `${apiBase}/profile`;
  // }

  // resetPassword(password: string, newPassword: string): Observable<OpResult> {
  //   let url = `${this.baseUrl}/resetPassword`;
  //   let form = {password, newPassword};
  //   return super.postForResult(url, form);
  // }

}
