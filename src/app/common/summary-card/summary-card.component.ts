import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-summary-card',
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css']
})
export class SummaryCardComponent implements OnInit {

  @Input() determiner: string;
  @Input() subject: string;
  @Input() supplement = '数';
  @Input() figure: number;

  constructor() {
  }

  ngOnInit(): void {
  }

}
