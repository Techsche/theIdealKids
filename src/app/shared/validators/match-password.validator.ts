import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPassword(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordField);

    const confirmPassword = group.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({
        passwordMismatch: true,
      });

      return {
        passwordMismatch: true,
      };
    }

    return null;
  };
}
