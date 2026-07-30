import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '../../../shared/validators/password.validator';
import { matchPassword } from '../../../shared/validators/match-password.validator';
import { Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-signup-component',
  imports: [RouterModule, ReactiveFormsModule, NgClass],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss',
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  signupForm!: FormGroup;

  submitted = false;
  loading = false;

  showPassword = false;
  showConfirmPassword = false;

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signupForm = this.fb.group(
      {
        name: ['', Validators.required],

        email: ['', [Validators.required, Validators.email]],

        secondaryName: ['', Validators.required],

        secondaryEmail: ['', Validators.email],

        mobileNumber: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{7,14}$/)]],

        password: ['', [Validators.required, passwordValidator()]],

        confirmPassword: ['', Validators.required],
      },
      {
        validators: matchPassword('password', 'confirmPassword'),
      },
    );
  }

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

    /**
     * TODO
     * Replace with your API
     */

    setTimeout(() => {
      this.loading = false;

      alert('Account Created Successfully');

      // this.router.navigate(['/login']);
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
