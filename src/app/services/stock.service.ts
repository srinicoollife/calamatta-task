import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { of } from 'rxjs';
import { stock_data, POLLING_TIMER } from '../consts';
import { getRandomInt } from '../helper';

export interface Stock {
  name: string;
  price: number;
  high: number;
  low: number;
  '52_wk_high': number;
  '52_wk_low': number;
  prev_close: number;
}

@Injectable({
  providedIn: 'root',
})
export class StockService {
  data: Array<Stock> = stock_data;

  constructor(private http: HttpClient) {
    this.simulateData();
  }

  getStockDetails = (name) => {
    return of(this.data.filter((stock) => stock.name == name).pop());
  };

  simulateData = () => {
    window.setInterval(() => {
      let random = getRandomInt(-10, 10);
      this.updateWithRandomValue(random);
    }, POLLING_TIMER);
  };

  updateWithRandomValue = (random) => {
    this.data = this.data.map((stock) => {
      let new_price = stock.price + random;

      return {
        ...stock,
        price: new_price,
        high: Math.max(stock.high, new_price),
        low: Math.min(stock.low, new_price),
        '52_wk_high': Math.max(stock['52_wk_high'], new_price),
        '52_wk_low': Math.min(stock['52_wk_low'], new_price),
      };
    });
  };
}
