import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgClass],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  submitted = false;
  showPassword = false;
  loading = false;

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.loading = true;

    console.log(this.loginForm.getRawValue());

    // Replace this with your API call
    setTimeout(() => {
      this.loading = false;
    }, 1500);
  }

  cancel(): void {
    this.loginForm.reset({
      email: '',
      password: '',
    });

    this.submitted = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
