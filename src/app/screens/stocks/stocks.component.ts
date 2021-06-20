import { Component, OnInit } from '@angular/core';
import { stocks_list } from '../../consts';
@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css'],
})
export class StocksComponent implements OnInit {
  stocks = stocks_list;
  constructor() {}

  ngOnInit(): void {}
}
