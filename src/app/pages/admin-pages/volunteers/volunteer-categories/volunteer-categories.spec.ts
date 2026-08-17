import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerCategories } from './volunteer-categories';

describe('VolunteerCategories', () => {
  let component: VolunteerCategories;
  let fixture: ComponentFixture<VolunteerCategories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerCategories],
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteerCategories);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
