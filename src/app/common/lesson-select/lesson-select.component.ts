import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-lesson-select',
  templateUrl: './lesson-select.component.html',
  styleUrls: ['./lesson-select.component.css']
})
export class LessonSelectComponent {

  @Output() selected: EventEmitter<number> = new EventEmitter<number>();

  selectedLesson = 1;

  lessonSelected() {
    this.selected.emit(this.selectedLesson);
  }
}
