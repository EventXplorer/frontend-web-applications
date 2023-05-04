import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeEventProgressComponent } from './pe-event-progress.component';

describe('PeEventProgressComponent', () => {
  let component: PeEventProgressComponent;
  let fixture: ComponentFixture<PeEventProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeEventProgressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeEventProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
