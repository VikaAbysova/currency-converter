import { ECurrency } from 'src/app/enums/currency.enum';
import { FIXED_FLOAT_NUMBER } from './../constants/fixed-float-number.constants';
import { ICurrency } from './../interfaces/currency.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.dev';
import {
  Observable,
  catchError,
  combineLatest,
  map,
  of,
  switchMap,
} from 'rxjs';
import { IConverter } from '../interfaces/converter.interface';

@Injectable({
  providedIn: 'root',
})
export class ConverterService {
  firstCurrencyRate = 0;
  secondCurrencyRate = 0;

  constructor(private http: HttpClient) {}

  getCurrencyRate(currency: string): Observable<number | string> {
    return this.http
      .get<ICurrency[]>(
        `${environment.apiUrl}/NBUStatService/v1/statdirectory/exchange?valcode=${currency}&json`
      )
      .pipe(
        map((currency) => {
          if (currency.length > 0) {
            const currencyRate = currency[0].rate;
            return currencyRate !== undefined ? currencyRate : 1;
          }
          return 1;
        }),
        catchError((err: Error) => {
          console.error(err.message);
          return of(1);
        })
      );
  }

  private calculateConvertedAmount(
    currencyAmount: number,
    rateFrom: number,
    rateTo: number,
  ): number {
    return Number(
      ((currencyAmount * rateFrom) / rateTo).toFixed(FIXED_FLOAT_NUMBER)
    );
  }

  convertCurrency(
    currencyConverter: IConverter,
    targetSelectedName: string
  ): Observable<number> {
    const { firstCurrencyName, firstCurrencyAmount } =
      currencyConverter.firstCurrency;
    const { secondCurrencyName, secondCurrencyAmount } =
      currencyConverter.secondCurrency;

    return combineLatest([
      this.getCurrencyRate(firstCurrencyName),
      this.getCurrencyRate(secondCurrencyName),
    ]).pipe(
      switchMap(([firstRate, secondRate]) => {
        this.firstCurrencyRate = <number>firstRate;
        this.secondCurrencyRate = <number>secondRate;
        if (
          targetSelectedName === 'firstCurrencyName' &&
          secondCurrencyName &&
          firstCurrencyAmount > 0
        ) {
          return of(
            this.calculateConvertedAmount(
              firstCurrencyAmount,
              this.firstCurrencyRate,
              this.secondCurrencyRate
            )
          );
        }
        if (
          targetSelectedName === 'secondCurrencyName' &&
          firstCurrencyName &&
          secondCurrencyAmount > 0
        ) {
          return of(
            this.calculateConvertedAmount(
              secondCurrencyAmount,
              this.secondCurrencyRate,
              this.firstCurrencyRate
            )
          );
        }
        return of(0);
      })
    );
  }
}
