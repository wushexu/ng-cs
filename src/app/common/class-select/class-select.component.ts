import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {uniq, sortBy} from 'underscore';

import {Dept} from '../../model-api/dept';
import {Major} from '../../model-api/major';
import {Class} from '../../model-api/class';
import {DeptMajorClassService} from '../../service/dept-major-class.service';

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

  constructor(private service: DeptMajorClassService) {
  }

  ngOnInit(): void {
    this.service.getClasses().subscribe(classes => {
      this.allClasses = classes;
      this.majors = sortBy(uniq(classes.map(c => c.major).filter(m => m)), 'id');
      this.depts = sortBy(uniq(this.majors.map(m => m.dept).filter(d => d)), 'id');

      const deptMap: Map<number, Dept> = new Map<number, Dept>();
      for (const dept of this.depts) {
        dept.majors = [];
        deptMap.set(dept.id, dept);
      }

      for (const major of this.majors) {
        const dept = deptMap.get(major.dept.id);
        if (dept) {
          dept.majors.push(major);
        } else {
          console.error('Dept Not Found: ' + major.dept.id);
        }
      }

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
