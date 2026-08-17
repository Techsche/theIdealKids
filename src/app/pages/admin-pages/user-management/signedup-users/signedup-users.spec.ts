import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedupUsers } from './signedup-users';

describe('SignedupUsers', () => {
  let component: SignedupUsers;
  let fixture: ComponentFixture<SignedupUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignedupUsers],
    }).compileComponents();

    fixture = TestBed.createComponent(SignedupUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
