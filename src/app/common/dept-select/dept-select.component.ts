import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Dept} from '../../model-api/dept';
import {DeptMajorClassService} from '../../service/dept-major-class.service';

@Component({
  selector: 'app-dept-select',
  templateUrl: './dept-select.component.html',
  styleUrls: ['./dept-select.component.css']
})
export class DeptSelectComponent implements OnInit {

  @Output() selected: EventEmitter<Dept> = new EventEmitter<Dept>();

  depts: Dept[];

  selectedDept: Dept;

  constructor(private service: DeptMajorClassService) {
  }

  ngOnInit(): void {
    this.service.getDepts()
      .subscribe(depts => {
        this.depts = depts;
      });
  }

  deptSelected() {
    this.selected.emit(this.selectedDept);
  }

}
