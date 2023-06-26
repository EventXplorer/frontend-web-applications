import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeMakeEventComponent } from './pe-make-event.component';

describe('PeMakeEventComponent', () => {
  let component: PeMakeEventComponent;
  let fixture: ComponentFixture<PeMakeEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeMakeEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeMakeEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
