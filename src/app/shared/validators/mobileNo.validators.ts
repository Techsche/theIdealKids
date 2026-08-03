import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function mobileValidator(minLength: number = 10, maxLength: number = 15): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) {
      return null;
    }

    const value = control.value.toString().trim();

    // Only digits allowed
    if (!/^\d+$/.test(value)) {
      return {
        invalidMobile: true,
      };
    }

    if (value.length < minLength || value.length > maxLength) {
      return {
        invalidMobile: true,
      };
    }

    return null;
  };
}
