import {Component, OnInit, AfterViewInit} from '@angular/core';

import {GenericChartComponent, Dataset} from '../../common/generic-chart.component';

@Component({
  selector: 'app-statistic-chart',
  templateUrl: './statistic-chart.component.html',
  styleUrls: ['./statistic-chart.component.css']
})
export class StatisticChartComponent extends GenericChartComponent implements OnInit, AfterViewInit {

  constructor() {
    super();
  }

  ngOnInit(): void {
  }

  buildDataset(dims): Dataset {

    return null;
  }

}
