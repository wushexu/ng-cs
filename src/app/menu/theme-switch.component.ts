import {Component, EventEmitter, Input, Output} from '@angular/core';

import {ThemeService, Theme} from '../service/theme.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.css']
})
export class ThemeSwitchComponent {
  options: Array<Theme>;

  constructor(private themeService: ThemeService) {
    this.options = themeService.options;
  }

  changeTheme(theme: Theme): void {
    this.themeService.setTheme(theme);
  }
}
