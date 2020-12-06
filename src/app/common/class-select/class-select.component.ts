import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {uniq} from 'underscore';

import {combineLatest} from 'rxjs';

import {Dept} from '../../model-api/dept';
import {Major} from '../../model-api/major';
import {Class} from '../../model-api/class';
import {ClassService} from '../../service/class.service';
import {DeptMajorService} from '../../service/dept-major.service';

@Component({
  selector: 'app-class-select',
  templateUrl: './class-select.component.html',
  styleUrls: ['./class-select.component.css']
})
export class ClassSelectComponent implements OnInit {

  @Output() selected: EventEmitter<Class> = new EventEmitter<Class>();

  years: number[];
  depts: Dept[];
  majors: Major[];

  yearFilter: number;
  majorFilter: Major;

  allClasses: Class[];
  filteredClasses: Class[];

  selectedClass: Class;

  constructor(private classService: ClassService,
              private deptMajorService: DeptMajorService) {
  }

  ngOnInit(): void {
    combineLatest([
      this.classService.getClasses(),
      this.deptMajorService.getDeptWithMajors(),
      this.deptMajorService.getMajors()
    ]).subscribe(([classes, depts, majors]) => {
      this.allClasses = classes;
      this.majors = majors;
      this.depts = depts;

      this.years = uniq(classes.map(c => c.year).filter(y => y)).sort();

      this.yearFilter = this.years[this.years.length - 1];
      this.majorFilter = this.majors[0];

      this.filterClass();
    });
  }

  filterClass() {

    if (!this.allClasses) {
      this.filteredClasses = [];
      return;
    }
    this.filteredClasses = this.allClasses.filter(cla => {
      return (!this.yearFilter || cla.year === this.yearFilter)
        && (!this.majorFilter || cla.major === this.majorFilter);
    });

    if (!this.selectedClass) {
      this.selectedClass = this.filteredClasses[0];
      this.selected.emit(this.selectedClass);
    } else if (!this.filteredClasses.find(c => c === this.selectedClass)) {
      this.selectedClass = this.filteredClasses[0];
      this.selected.emit(this.selectedClass);
    }
  }

  classSelected() {
    this.selected.emit(this.selectedClass);
  }

}
