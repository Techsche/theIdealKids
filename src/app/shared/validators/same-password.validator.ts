import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function samePasswordValidator(oldPassword: string, newPassword: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const old = control.get(oldPassword)?.value;
    const current = control.get(newPassword)?.value;

    if (!old || !current) {
      return null;
    }

    return old === current ? { samePassword: true } : null;
  };
}
