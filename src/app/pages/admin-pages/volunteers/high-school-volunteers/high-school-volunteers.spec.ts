import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighSchoolVolunteers } from './high-school-volunteers';

describe('HighSchoolVolunteers', () => {
  let component: HighSchoolVolunteers;
  let fixture: ComponentFixture<HighSchoolVolunteers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighSchoolVolunteers],
    }).compileComponents();

    fixture = TestBed.createComponent(HighSchoolVolunteers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
