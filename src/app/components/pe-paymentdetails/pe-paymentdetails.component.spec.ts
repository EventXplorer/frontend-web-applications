import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PePaymentdetailsComponent } from './pe-paymentdetails.component';

describe('PePaymentdetailsComponent', () => {
  let component: PePaymentdetailsComponent;
  let fixture: ComponentFixture<PePaymentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PePaymentdetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PePaymentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
