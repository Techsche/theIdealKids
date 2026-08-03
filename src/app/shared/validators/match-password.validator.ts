import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPassword(passwordField: string, confirmPasswordField: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordField);
    const confirmPassword = group.get(confirmPasswordField);

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  };
}
