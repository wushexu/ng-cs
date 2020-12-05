import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

import {sortBy, uniq} from 'underscore';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

import {Course} from '../../model/course';
import {TeacherCourseService} from '../../service/teacher-course.service';

@Component({
  selector: 'app-course-cate-select',
  templateUrl: './course-cate-select.component.html',
  styleUrls: ['./course-cate-select.component.css']
})
export class CourseCateSelectComponent implements OnInit {

  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  cates: string[];
  selectedCate: string;

  constructor(private service: TeacherCourseService) {
  }

  ngOnInit(): void {
    this.service.getCourses().subscribe(courses => {
      this.cates = uniq(courses.map(r => r.cate))
        .sort((a: string, b: string) => {
          const lenDiff = a.length - a.length;
          if (lenDiff !== 0) {
            return lenDiff;
          }
          return a.localeCompare(b);
        });
    });

  }

  cateSelected() {
    this.selected.emit(this.selectedCate);
  }

}