import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { POLLING_TIMER } from '../../consts';
import { Stock } from '../../services/stock.service';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css'],
})
export class StockCardComponent implements OnInit {
  @Input() stock: string;
  stock_details: Stock;
  stock_active: boolean = true;
  polling_ref: number;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.fetchStockDetails();
    this.startPolling();
  }

  fetchStockDetails = () => {
    this.stockService.getStockDetails(this.stock).subscribe((res: Stock) => {
      this.stock_details = res;
    });
  };

  startPolling = () => {
    this.polling_ref = window.setInterval(() => {
      this.fetchStockDetails();
    }, POLLING_TIMER);
  };

  stopPolling = () => window.clearInterval(this.polling_ref);

  // handle custom events
  handle_stockToggle = () =>
    this.stock_active ? this.startPolling() : this.stopPolling();
}
