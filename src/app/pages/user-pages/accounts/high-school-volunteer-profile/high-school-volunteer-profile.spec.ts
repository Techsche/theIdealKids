import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighSchoolVolunteerProfile } from './high-school-volunteer-profile';

describe('HighSchoolVolunteerProfile', () => {
  let component: HighSchoolVolunteerProfile;
  let fixture: ComponentFixture<HighSchoolVolunteerProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighSchoolVolunteerProfile],
    }).compileComponents();

    fixture = TestBed.createComponent(HighSchoolVolunteerProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
