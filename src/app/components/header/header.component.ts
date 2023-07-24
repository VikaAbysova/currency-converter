import { ECurrency } from '../../enums/currency.enum';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { ConverterService } from 'src/app/services/converter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  rateUSD = 0;
  rateEUR = 0;

  constructor(private converterService: ConverterService) {}

  ngOnInit(): void {
    combineLatest([
      this.converterService.getCurrencyRate(ECurrency.USD),
      this.converterService.getCurrencyRate(ECurrency.EUR),
    ]).subscribe(([rateUSD, rateEUR]) => {
      (this.rateUSD = <number>rateUSD), (this.rateEUR = <number>rateEUR);
    });
  }
}
