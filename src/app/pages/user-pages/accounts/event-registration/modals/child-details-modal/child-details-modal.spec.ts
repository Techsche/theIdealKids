import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildDetailsModal } from './child-details-modal';

describe('ChildDetailsModal', () => {
  let component: ChildDetailsModal;
  let fixture: ComponentFixture<ChildDetailsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildDetailsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(ChildDetailsModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
