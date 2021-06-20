import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { StocksComponent } from './screens/stocks/stocks.component';
import { StockService } from './services/stock.service';
import { StockCardComponent } from './components/stock-card/stock-card.component';

@NgModule({
  declarations: [AppComponent, StocksComponent, StockCardComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [StockService],
  bootstrap: [AppComponent],
})
export class AppModule {}
