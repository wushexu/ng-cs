import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TimeScope, TimeScopeDef} from '../../model2/schedule-filter';

@Component({
  selector: 'app-time-scope-menu',
  templateUrl: './time-scope-menu.component.html',
  styleUrls: ['./time-scope-menu.component.css']
})
export class TimeScopeMenuComponent {

  @Input() timeScope: TimeScope;
  @Output() selected: EventEmitter<TimeScope> = new EventEmitter<TimeScope>();

  timeScopeDefs = TimeScopeDef.All;

  timeScopeName(): string {
    return TimeScopeDef.getName(this.timeScope);
  }

  timeScopeSelected(timeScope: TimeScope) {
    this.timeScope = timeScope;
    this.selected.emit(this.timeScope);
  }
}
