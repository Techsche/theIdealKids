import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionModal } from './competition-modal';

describe('CompetitionModal', () => {
  let component: CompetitionModal;
  let fixture: ComponentFixture<CompetitionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompetitionModal],
    }).compileComponents();

    fixture = TestBed.createComponent(CompetitionModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
