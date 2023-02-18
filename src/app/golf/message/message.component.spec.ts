import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GolfMessageComponent } from './message.component';

describe('FormComponent', () => {
  let component: GolfMessageComponent;
  let fixture: ComponentFixture<GolfMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GolfMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GolfMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
