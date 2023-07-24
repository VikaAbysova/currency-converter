import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConverterService } from 'src/app/services/converter.service';
import { ConverterComponent } from './components/converter/converter.component';
import { HeaderComponent } from './components/header/header.component';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      declarations: [AppComponent, HeaderComponent, ConverterComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ConverterService, HttpClient, HttpHandler]
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
