import { ECurrency } from 'src/app/enums/currency.enum';
import { ConverterService } from 'src/app/services/converter.service';
import { Component } from '@angular/core';
import { IConverter } from 'src/app/interfaces/converter.interface';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss'],
})
export class ConverterComponent {
  currencyConverter: IConverter = {
    firstCurrency: { firstCurrencyName: '', firstCurrencyAmount: 0 },
    secondCurrency: { secondCurrencyName: '', secondCurrencyAmount: 0 },
  };

  options = [
    { name: ECurrency.UAH, value: ECurrency.UAH },
    { name: ECurrency.EUR, value: ECurrency.EUR },
    { name: ECurrency.USD, value: ECurrency.USD },
  ];

  constructor(private converterService: ConverterService) {}

  onChange(event: Event): void {
    const targetSelectedName = (event.target as HTMLElement).id;
    this.converterService
      .convertCurrency(this.currencyConverter, targetSelectedName)
      .subscribe((convertedValue) => {
        targetSelectedName === 'firstCurrencyName'
          ? (this.currencyConverter.secondCurrency.secondCurrencyAmount =
              convertedValue)
          : (this.currencyConverter.firstCurrency.firstCurrencyAmount =
              convertedValue);
      });
  }
}
