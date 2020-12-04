import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {uniq, sortBy} from 'underscore';

import {DeptMajorClassService} from '../../service/dept-major-class.service';

@Component({
  selector: 'app-class-year-select',
  templateUrl: './class-year-select.component.html',
  styleUrls: ['./class-year-select.component.css']
})
export class ClassYearSelectComponent implements OnInit {

  @Output() selected: EventEmitter<number> = new EventEmitter<number>();

  years: number[];

  selectedYear: number;

  constructor(private service: DeptMajorClassService) {
  }

  ngOnInit(): void {
    this.service.getClasses().subscribe(classes => {
      this.years = uniq(classes.map(c => c.year).filter(y => y)).sort();
      this.selectedYear = this.years[this.years.length - 1];
    });
  }

  yearSelected() {
    this.selected.emit(this.selectedYear);
  }

}
