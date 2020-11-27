import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subject} from 'rxjs';

import {StyleManagerService} from './style-manager.service';

export interface Theme {
  backgroundColor: string;
  buttonColor: string;
  headingColor: string;
  label: string;
  value: string;
  darkTheme: boolean;
}

@Injectable()
export class ThemeService {

  currentTheme: Theme;
  themeSubject: Subject<Theme> = new Subject();

  options: Theme[] = [
    {
      backgroundColor: '#fff',
      buttonColor: '#ff4081',
      headingColor: '#3f51b5',
      label: 'Indigo & Pink',
      value: 'indigo-pink',
      darkTheme: false
    },
    {
      backgroundColor: '#fff',
      buttonColor: '#ffc107',
      headingColor: '#673ab7',
      label: 'Deep Purple & Amber',
      value: 'deeppurple-amber',
      darkTheme: false
    },
    {
      backgroundColor: '#303030',
      buttonColor: '#607d8b',
      headingColor: '#e91e63',
      label: 'Pink & Blue Grey',
      value: 'pink-bluegrey',
      darkTheme: true
    },
    {
      backgroundColor: '#303030',
      buttonColor: '#4caf50',
      headingColor: '#9c27b0',
      label: 'Purple & Green',
      value: 'purple-green',
      darkTheme: true
    }
  ];

  defaultTheme: Theme = this.options[0];

  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService
  ) {
  }

  getTheme(key: string): Theme {
    return this.options.find(t => t.value === key);
  }

  setThemeByKey(key: string): void {
    const theme = this.getTheme(key);
    if (theme) {
      this.setTheme(theme);
    }
  }

  setDefaultTheme(): void {
    this.setTheme(this.defaultTheme);
  }

  setTheme(theme: Theme): void {
    this.styleManager.setStyle(
      'theme',
      `assets/${theme.value}.css`
    );
    this.currentTheme = theme;
    this.themeSubject.next(theme);
  }
}
