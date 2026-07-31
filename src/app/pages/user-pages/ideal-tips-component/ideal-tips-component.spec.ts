import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdealTipsComponent } from './ideal-tips-component';

describe('IdealTipsComponent', () => {
  let component: IdealTipsComponent;
  let fixture: ComponentFixture<IdealTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdealTipsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdealTipsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
