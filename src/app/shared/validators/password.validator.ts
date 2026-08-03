import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = (control.value || '').trim();

    if (!password) {
      return null; // Let Validators.required handle empty values
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasMinLength = password.length >= 8;

    const isValid = hasUpperCase && hasLowerCase && hasNumber && hasMinLength;

    return isValid ? null : { passwordStrength: true };
  };
}
