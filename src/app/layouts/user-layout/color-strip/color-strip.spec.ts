import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorStrip } from './color-strip';

describe('ColorStrip', () => {
  let component: ColorStrip;
  let fixture: ComponentFixture<ColorStrip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorStrip],
    }).compileComponents();

    fixture = TestBed.createComponent(ColorStrip);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
