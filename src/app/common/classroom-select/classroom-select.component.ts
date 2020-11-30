import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

import {startWith, map} from 'rxjs/operators';
import {sortBy, uniq} from 'underscore';

import {Dept} from '../../model/dept';
import {Classroom} from '../../model/site';
import {ClassroomService} from '../../service/classroom.service';

@Component({
  selector: 'app-classroom-select',
  templateUrl: './classroom-select.component.html',
  styleUrls: ['./classroom-select.component.css']
})
export class ClassroomSelectComponent implements OnInit {

  @Output() selected: EventEmitter<Classroom> = new EventEmitter<Classroom>();

  nameControl = new FormControl();

  roomTypes: string[];
  depts: Dept[];

  roomTypeFilter: string;
  deptFilter: Dept;

  allClassrooms: Classroom[];
  filteredClassrooms: Classroom[];
  autoCompleteClassrooms: Classroom[];

  constructor(private service: ClassroomService) {
  }

  ngOnInit(): void {
    this.service.getClassrooms().subscribe(rooms => {
      this.allClassrooms = rooms;
      this.depts = sortBy(uniq(rooms.map(r => r.dept).filter(d => d)), 'id');
      this.roomTypes = uniq(rooms.map(r => r.roomType).filter(t => t))
        .sort((a: string, b: string) => {
          const lenDiff = a.length - a.length;
          if (lenDiff !== 0) {
            return lenDiff;
          }
          return a.localeCompare(b);
        });

      // this.filterClassroom();
      this.filteredClassrooms = [...rooms];
    });


    this.nameControl.valueChanges
      .pipe(
        startWith(''),
        map((key: string) => {
          if (!this.filteredClassrooms) {
            return [];
          }

          const size = 10;
          const filtered: Classroom[] = [];
          let count = 0;
          for (const room of this.filteredClassrooms) {
            if (!key || room.name.indexOf(key) >= 0 || room.code.indexOf(key) >= 0) {
              filtered.push(room);
              count++;
              if (count >= size) {
                break;
              }
            }
          }
          return filtered;
        })
      )
      .subscribe((rooms: Classroom[]) => {
        this.autoCompleteClassrooms = rooms;
      });
  }


  filterClassroom() {
    if (!this.allClassrooms) {
      this.filteredClassrooms = [];
      return;
    }
    this.filteredClassrooms = this.allClassrooms.filter(room => {
      return (!this.roomTypeFilter || room.roomType === this.roomTypeFilter)
        && (!this.deptFilter || room.dept === this.deptFilter);
    });

    this.autoCompleteClassrooms = this.filteredClassrooms;
  }

  classroomNameFn(option?: Classroom): string | undefined {
    return option ? option.name : undefined;
  }

  /*classroomNameCodeFn(option?: Classroom): string | undefined {
    if (!option) {
      return undefined;
    }
    if (!option.code) {
      return option.name;
    }
    return `${option.name} ${option.code}`;
  }*/

  optionSelected($event: MatAutocompleteSelectedEvent) {
    const option = $event.option;
    this.selected.emit(option.value);
  }

  clear() {
    this.nameControl.reset();
    this.selected.emit(null);
  }

}