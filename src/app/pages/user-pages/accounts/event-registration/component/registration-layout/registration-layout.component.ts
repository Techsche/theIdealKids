import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RegistrationStepperComponent } from '../registration-stepper/registration-stepper.component';

@Component({
  selector: 'app-registration-layout',
  standalone: true,
  imports: [RegistrationStepperComponent],
  templateUrl: './registration-layout.component.html',
  styleUrl: './registration-layout.component.scss',
})
export class RegistrationLayoutComponent {
  @Input() event: any;

  @Input() steps: string[] = [];

  @Input() activeIndex = 0;

  @Input() canContinue = false;

  @Output() nextClicked = new EventEmitter<void>();

  @Output() backClicked = new EventEmitter<void>();

  get isFirstStep(): boolean {
    return this.activeIndex === 0;
  }

  get isLastStep(): boolean {
    return this.activeIndex === this.steps.length - 1;
  }

  onNext(): void {
    this.nextClicked.emit();
  }

  onBack(): void {
    this.backClicked.emit();
  }
}
