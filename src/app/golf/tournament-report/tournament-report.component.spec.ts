import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournamentReportComponent } from './tournament-report.component';

describe('TournamentReportComponent', () => {
  let component: TournamentReportComponent;
  let fixture: ComponentFixture<TournamentReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TournamentReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TournamentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
