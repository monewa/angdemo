import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerFormComponent } from './player-form.component';

describe('CreatePlayerComponent', () => {
  let component: PlayerFormComponent;
  let fixture: ComponentFixture<PlayerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});