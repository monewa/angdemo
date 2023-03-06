import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledConfirmComponent } from './scheduled-confirm.component';

describe('ScheduledConfirmComponent', () => {
  let component: ScheduledConfirmComponent;
  let fixture: ComponentFixture<ScheduledConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduledConfirmComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduledConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
