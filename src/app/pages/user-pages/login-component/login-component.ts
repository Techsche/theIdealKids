import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, NgClass],
  templateUrl: './login-component.html',
  styleUrl: './login-component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  loginForm!: FormGroup;

  submitted = false;
  loading = false;

  showPassword = false;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  login(): void {
    this.submitted = true;

    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.loginForm.getRawValue());

    // Replace with your API call
    setTimeout(() => {
      this.loading = false;

      alert('Login Successful');
    }, 1500);
  }

  cancel(): void {
    this.loginForm.reset();

    this.submitted = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
