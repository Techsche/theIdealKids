import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Bannercomponent } from './bannercomponent';

describe('Bannercomponent', () => {
  let component: Bannercomponent;
  let fixture: ComponentFixture<Bannercomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Bannercomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Bannercomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
