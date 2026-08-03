import { NgClass } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/user/auth.service';
import { ToastrAlertService } from '../../../services/common/toastr.services';

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
  private authService = inject(AuthService);
  private toastrService = inject(ToastrAlertService);
  private cdr = inject(ChangeDetectorRef);

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

  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();

      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.cdr.detectChanges();

        if (res.success) {
          this.toastrService.success(res.message || 'Login successful!');
          this.router.navigate(['/my-events']);
        } else {
          this.toastrService.error(res.message || 'Login failed.');
        }
      },

      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();

        this.toastrService.error('An error occurred while logging in.');
      },
    });
  }

  cancel(): void {
    this.loginForm.reset();
    this.submitted = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }
}
