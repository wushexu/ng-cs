import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Perspective, PerspectiveDef} from '../../model-app/schedule-query-def';

@Component({
  selector: 'app-perspective-menu',
  templateUrl: './perspective-menu.component.html',
  styleUrls: ['./perspective-menu.component.css']
})
export class PerspectiveMenuComponent {

  @Input() perspective: Perspective;
  @Output() selected: EventEmitter<Perspective> = new EventEmitter<Perspective>();

  perspectiveDefs = PerspectiveDef.All;

  perspectiveName(): string {
    return PerspectiveDef.getName(this.perspective);
  }

  perspectiveSelected(perspective: Perspective) {
    this.perspective = perspective;
    this.selected.emit(this.perspective);
  }
}
