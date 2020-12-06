import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

import {Observable} from 'rxjs';
import {startWith, switchMap} from 'rxjs/operators';

import {TeacherCourseService} from '../../service/teacher-course.service';
import {Teacher} from '../../model-api/teacher';

@Component({
  selector: 'app-teacher-select',
  templateUrl: './teacher-select.component.html',
  styleUrls: ['./teacher-select.component.css']
})
export class TeacherSelectComponent implements OnInit {

  @Output() selected: EventEmitter<Teacher> = new EventEmitter<Teacher>();

  nameControl = new FormControl();

  filteredTeachers: Observable<Teacher[]>;


  constructor(protected teacherService: TeacherCourseService) {

  }

  ngOnInit() {

    this.filteredTeachers = this.nameControl.valueChanges
      .pipe(
        startWith(''),
        switchMap((key: string) => {
          return this.teacherService.filterTeachers({size: 10, key});
        })
      );
  }

  teacherNameFn(option?: Teacher): string | undefined {
    return option ? option.name : undefined;
  }

  teacherNameCodeFn(option?: Teacher): string | undefined {
    if (!option) {
      return undefined;
    }
    if (!option.code) {
      return option.name;
    }
    return `${option.name} ${option.code}`;
  }

  optionSelected($event: MatAutocompleteSelectedEvent) {
    const option = $event.option;
    this.selected.emit(option.value);
  }

  clear() {
    this.nameControl.reset();
    this.selected.emit(null);
  }

}
