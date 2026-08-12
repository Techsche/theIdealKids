import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiverComponent } from './waiver.component';

describe('WaiverComponent', () => {
  let component: WaiverComponent;
  let fixture: ComponentFixture<WaiverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WaiverComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WaiverComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
