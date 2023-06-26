import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PePaymentCompletedComponent } from './pe-payment-completed.component';

describe('PePaymentCompletedComponent', () => {
  let component: PePaymentCompletedComponent;
  let fixture: ComponentFixture<PePaymentCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PePaymentCompletedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PePaymentCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
