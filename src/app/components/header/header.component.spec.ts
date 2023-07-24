import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ConverterService } from 'src/app/services/converter.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ConverterService, HttpClient, HttpHandler],
      imports: [FormsModule],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
