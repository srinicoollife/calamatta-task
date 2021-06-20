import { Component, OnInit, Input } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { POLLING_TIMER } from '../../consts';

@Component({
  selector: 'app-stock-card',
  templateUrl: './stock-card.component.html',
  styleUrls: ['./stock-card.component.css'],
})
export class StockCardComponent implements OnInit {
  @Input() stock;
  stock_details;
  polling_ref;
  stock_active = true;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.fetchStockDetails();
    this.startPolling();
  }

  fetchStockDetails = () => {
    this.stockService.getStockDetails(this.stock).subscribe((res) => {
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
  handle_stockToggle = () => {
    console.log(this.stock_active);
    if (this.stock_active) {
      this.startPolling();
    } else {
      this.stopPolling();
    }
  };
}
