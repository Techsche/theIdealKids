import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBanner } from './create-banner';

describe('CreateBanner', () => {
  let component: CreateBanner;
  let fixture: ComponentFixture<CreateBanner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateBanner],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateBanner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
