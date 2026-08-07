import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventMarquee } from './event-marquee';

describe('EventMarquee', () => {
  let component: EventMarquee;
  let fixture: ComponentFixture<EventMarquee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventMarquee],
    }).compileComponents();

    fixture = TestBed.createComponent(EventMarquee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
