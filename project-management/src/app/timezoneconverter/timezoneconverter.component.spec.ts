import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimezoneconverterComponent } from './timezoneconverter.component';

describe('TimezoneconverterComponent', () => {
  let component: TimezoneconverterComponent;
  let fixture: ComponentFixture<TimezoneconverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimezoneconverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimezoneconverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
