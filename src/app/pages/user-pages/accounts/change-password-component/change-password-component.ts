import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { UserService } from '../../../../services/user/user.service';
import { ToastrAlertService } from '../../../../services/common/toastr.services';

import { ChangePasswordRequest } from '../../../../core/models/user/change-password.model';
import { passwordValidator } from '../../../../shared/validators/password.validator';
import { matchPassword } from '../../../../shared/validators/match-password.validator';
import { samePasswordValidator } from '../../../../shared/validators/same-password.validator';

@Component({
  selector: 'app-change-password-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './change-password-component.html',
  styleUrl: './change-password-component.scss',
})
export class ChangePasswordComponent {
  private readonly fb = inject(FormBuilder);

  private readonly userService = inject(UserService);

  private readonly toastr = inject(ToastrAlertService);

  submitted = false;

  loading = signal(false);

  hideCurrent = true;

  hideNew = true;

  hideConfirm = true;

  changePasswordForm = this.fb.group(
    {
      oldPassword: ['', Validators.required],

      newPassword: ['', [Validators.required, passwordValidator()]],

      confirmPassword: ['', Validators.required],
    },
    {
      validators: [
        matchPassword('newPassword', 'confirmPassword'),
        samePasswordValidator('oldPassword', 'newPassword'),
      ],
    },
  );

  get f() {
    return this.changePasswordForm.controls;
  }

  submit(): void {
    this.submitted = true;

    if (this.changePasswordForm.invalid) {
      this.changePasswordForm.markAllAsTouched();

      return;
    }

    this.loading.set(true);

    const payload: ChangePasswordRequest = {
      oldPassword: this.f.oldPassword.value!,
      newPassword: this.f.newPassword.value!,
      confirmPassword: this.f.confirmPassword.value!,
    };

    this.userService.changePassword(payload).subscribe({
      next: (response) => {
        this.loading.set(false);

        if (response.success) {
          this.toastr.success(response.message);

          this.changePasswordForm.reset();

          this.submitted = false;
        } else {
          this.toastr.error(response.message);
        }
      },

      error: (error) => {
        this.loading.set(false);

        this.toastr.error(error?.error?.message ?? 'Unable to change password.');
      },
    });
  }

  cancel(): void {
    this.changePasswordForm.reset();

    this.submitted = false;

    this.hideCurrent = true;
    this.hideNew = true;
    this.hideConfirm = true;
  }
}
