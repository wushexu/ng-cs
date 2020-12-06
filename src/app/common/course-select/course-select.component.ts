import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';

import {sortBy, uniq} from 'underscore';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

import {Course} from '../../model-api/course';
import {TeacherCourseService} from '../../service/teacher-course.service';

@Component({
  selector: 'app-course-select',
  templateUrl: './course-select.component.html',
  styleUrls: ['./course-select.component.css']
})
export class CourseSelectComponent implements OnInit {

  @Output() selected: EventEmitter<Course> = new EventEmitter<Course>();

  nameControl = new FormControl();

  cates: string[];

  cateFilter: string;

  allCourses: Course[];
  filteredCourses: Course[];
  autoCompleteCourses: Course[];

  constructor(private service: TeacherCourseService) {
  }

  ngOnInit(): void {
    this.service.getCourses().subscribe(courses => {
      this.allCourses = courses;
      this.cates = uniq(courses.map(r => r.cate).filter(y => y))
        .sort((a: string, b: string) => {
          const lenDiff = a.length - a.length;
          if (lenDiff !== 0) {
            return lenDiff;
          }
          return a.localeCompare(b);
        });

      this.filteredCourses = [...courses];
    });


    this.nameControl.valueChanges
      .pipe(
        startWith(''),
        map((key: string) => {
          if (!this.filteredCourses) {
            return [];
          }

          const size = 10;
          const filtered: Course[] = [];
          let count = 0;
          for (const course of this.filteredCourses) {
            if (!key || course.name.indexOf(key) >= 0 || course.code.indexOf(key) >= 0) {
              filtered.push(course);
              count++;
              if (count >= size) {
                break;
              }
            }
          }
          return filtered;
        })
      )
      .subscribe((rooms: Course[]) => {
        this.autoCompleteCourses = rooms;
      });
  }


  filterCourse() {
    if (!this.allCourses) {
      this.filteredCourses = [];
      return;
    }
    this.filteredCourses = this.allCourses.filter(course => {
      return (!this.cateFilter || course.cate === this.cateFilter);
    });

    this.autoCompleteCourses = this.filteredCourses;
  }

  courseNameFn(option?: Course): string | undefined {
    return option ? option.name : undefined;
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
