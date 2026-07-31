import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrAlertService } from '../../../services/common/toastr.services';
import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-forgot-password-component',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password-component.html',
  styleUrl: './forgot-password-component.scss',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);
  private authService = inject(AuthService);
  private toastrService = inject(ToastrAlertService);

  forgotForm!: FormGroup;

  submitted = false;
  loading = false;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.forgotForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.forgotForm.controls;
  }

  sendResetLink(): void {
    this.submitted = true;

    this.forgotForm.markAllAsTouched();

    if (this.forgotForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.forgotPassword(this.forgotForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.cdr.detectChanges();

        if (res.success) {
          this.toastrService.success(res.message);
          this.router.navigate(['/login']);
        } else {
          this.toastrService.error(res.message || 'Something went wrong!');
        }
      },

      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();

        this.toastrService.error('Something went wrong!');
      },
    });
  }

  cancel(): void {
    this.forgotForm.reset();

    this.submitted = false;
  }
}
