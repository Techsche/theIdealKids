import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerComponent } from './volunteer.component';

describe('VolunteerComponent', () => {
  let component: VolunteerComponent;
  let fixture: ComponentFixture<VolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolunteerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteerComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
