import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {uniq} from 'underscore';
import {CourseService} from '../../service/course.service';
import {errorHandler, shorterFirstZhComparator} from '../util';

@Component({
  selector: 'app-course-cate-select',
  templateUrl: './course-cate-select.component.html',
  styleUrls: ['./course-cate-select.component.css']
})
export class CourseCateSelectComponent implements OnInit {

  @Output() selected: EventEmitter<string> = new EventEmitter<string>();

  cates: string[];
  selectedCate: string;

  constructor(private service: CourseService) {
  }

  ngOnInit(): void {
    this.service.getCourses().subscribe(courses => {
        this.cates = uniq(courses.map(r => r.cate).filter(y => y))
          .sort(shorterFirstZhComparator);

        this.selectedCate = this.cates[0];
        this.selected.emit(this.selectedCate);
      },
      errorHandler);
  }

  cateSelected() {
    this.selected.emit(this.selectedCate);
  }

}
