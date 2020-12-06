import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Dept} from '../../model-api/dept';
import {Major} from '../../model-api/major';
import {DeptMajorService} from '../../service/dept-major.service';

@Component({
  selector: 'app-dept-major-select',
  templateUrl: './dept-major-select.component.html',
  styleUrls: ['./dept-major-select.component.css']
})
export class DeptMajorSelectComponent implements OnInit {

  @Output() selected: EventEmitter<Major> = new EventEmitter<Major>();

  depts: Dept[];

  selectedMajor: Major;

  constructor(private service: DeptMajorService) {
  }

  ngOnInit(): void {
    this.service.getDeptWithMajors()
      .subscribe(depts => {
        this.depts = depts;
      });
  }

  majorSelected() {
    this.selected.emit(this.selectedMajor);
  }

}
