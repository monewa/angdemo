import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailinglistdataComponent } from './mailinglistdata.component';

describe('MailinglistdataComponent', () => {
  let component: MailinglistdataComponent;
  let fixture: ComponentFixture<MailinglistdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailinglistdataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailinglistdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
