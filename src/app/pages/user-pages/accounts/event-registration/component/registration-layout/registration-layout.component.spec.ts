import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationLayoutComponent } from './registration-layout.component';

describe('RegistrationLayoutComponent', () => {
  let component: RegistrationLayoutComponent;
  let fixture: ComponentFixture<RegistrationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
