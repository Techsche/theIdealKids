import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-registration-stepper',
  standalone: true,
  templateUrl: './registration-stepper.component.html',
  styleUrl: './registration-stepper.component.scss',
})
export class RegistrationStepperComponent {
  @Input() steps: string[] = [];

  @Input() activeIndex = 0;

  get progressPercentage(): number {
    if (!this.steps.length) {
      return 0;
    }

    return Math.round(((this.activeIndex + 1) / this.steps.length) * 100);
  }
}
