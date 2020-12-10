import {Component, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver} from '@angular/cdk/layout';
import {Moment} from 'moment';

@Component({
  selector: 'app-daily-summary-statis',
  templateUrl: './daily-summary-statis.component.html',
  styleUrls: ['./daily-summary-statis.component.css']
})
export class DailySummaryStatisComponent implements OnInit {
  gridCols = 3;

  selectedDate: Moment;
  selectedLesson = 1;

  // '(max-width: 599px)'

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit() {
    const breakPoints = [
      '(max-width: 499px)', // '(max-width: 767px)'
      '(max-width: 991px)',
      '(max-width: 1199px)',
      '(min-width: 1200px)'
    ];
    this.breakpointObserver.observe(breakPoints).subscribe(({matches, breakpoints}) => {
      console.log(matches, breakpoints);
      if (breakpoints[breakPoints[0]]) {
        this.gridCols = 1;
        return;
      }
      if (breakpoints[breakPoints[1]]) {
        this.gridCols = 2;
        return;
      }
      if (breakpoints[breakPoints[2]]) {
        this.gridCols = 3;
        return;
      }
      if (breakpoints[breakPoints[3]]) {
        this.gridCols = 4;
        return;
      }
    });
  }


  dateSelected(date: Moment): void {
    this.selectedDate = date;
    console.log(date);
  }

  lessonSelected(lessonIndex: number) {
    this.selectedLesson = lessonIndex;
    console.log(lessonIndex);
  }
}
