import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEventInfoComponent } from './current-event-info-component';

describe('CurrentEventInfoComponent', () => {
  let component: CurrentEventInfoComponent;
  let fixture: ComponentFixture<CurrentEventInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentEventInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentEventInfoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
