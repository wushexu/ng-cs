import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ThemeService, Theme} from '../service/theme.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  options: Array<Theme>;

  // @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private themeService: ThemeService) {
    this.options = themeService.options;
  }

  changeTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
