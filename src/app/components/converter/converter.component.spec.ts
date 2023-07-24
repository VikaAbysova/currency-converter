import { FormsModule } from '@angular/forms';
import { ConverterService } from 'src/app/services/converter.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConverterComponent } from './converter.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('ConverterComponent', () => {
  let component: ConverterComponent;
  let fixture: ComponentFixture<ConverterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConverterComponent],
      providers: [ConverterService, HttpClient, HttpHandler],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(ConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
