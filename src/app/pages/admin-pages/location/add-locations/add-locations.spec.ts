import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLocations } from './add-locations';

describe('AddLocations', () => {
  let component: AddLocations;
  let fixture: ComponentFixture<AddLocations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddLocations],
    }).compileComponents();

    fixture = TestBed.createComponent(AddLocations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
