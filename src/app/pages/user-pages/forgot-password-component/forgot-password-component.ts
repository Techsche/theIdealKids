import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password-component',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password-component.html',
  styleUrl: './forgot-password-component.scss',
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

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

    console.log(this.forgotForm.getRawValue());

    /**
     * TODO
     * Replace with your API call
     */

    setTimeout(() => {
      this.loading = false;

      alert('Password reset link sent successfully.');

      // this.router.navigate(['/login']);
    }, 1500);
  }

  cancel(): void {
    this.forgotForm.reset();

    this.submitted = false;
  }
}
