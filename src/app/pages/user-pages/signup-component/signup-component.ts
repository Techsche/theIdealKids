import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '../../../shared/validators/password.validator';
import { matchPassword } from '../../../shared/validators/match-password.validator';
import { RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signup-component',
  imports: [RouterModule, ReactiveFormsModule, NgClass],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss',
})
export class SignupComponent {
  private fb = inject(FormBuilder);

  submitted = false;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;

  signupForm = this.fb.group(
    {
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      secondaryName: [''],
      secondaryEmail: ['', Validators.email],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      password: ['', [Validators.required, passwordValidator()]],
      confirmPassword: ['', Validators.required],
    },
    {
      validators: matchPassword('password', 'confirmPassword'),
    },
  );

  get f() {
    return this.signupForm.controls;
  }

  signup(): void {
    this.submitted = true;

    this.signupForm.markAllAsTouched();

    if (this.signupForm.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.signupForm.getRawValue());

    // Replace with API call

    setTimeout(() => {
      this.loading = false;

      alert('Registration Successful');
    }, 1500);
  }

  cancel(): void {
    this.signupForm.reset();

    this.submitted = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
