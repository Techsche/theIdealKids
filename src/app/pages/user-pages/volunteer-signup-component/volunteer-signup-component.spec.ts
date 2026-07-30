import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerSignupComponent } from './volunteer-signup-component';

describe('VolunteerSignupComponent', () => {
  let component: VolunteerSignupComponent;
  let fixture: ComponentFixture<VolunteerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerSignupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteerSignupComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
