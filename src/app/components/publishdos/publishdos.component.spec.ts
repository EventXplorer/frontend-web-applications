import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishdosComponent } from './publishdos.component';

describe('PublishdosComponent', () => {
  let component: PublishdosComponent;
  let fixture: ComponentFixture<PublishdosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublishdosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublishdosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
