import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeUsers } from './merge-users';

describe('MergeUsers', () => {
  let component: MergeUsers;
  let fixture: ComponentFixture<MergeUsers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MergeUsers],
    }).compileComponents();

    fixture = TestBed.createComponent(MergeUsers);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
