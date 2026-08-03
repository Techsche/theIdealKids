import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '../../../shared/validators/password.validator';
import { matchPassword } from '../../../shared/validators/match-password.validator';
import { Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { ToastrAlertService } from '../../../services/common/toastr.services';

@Component({
  selector: 'app-signup-component',
  imports: [RouterModule, ReactiveFormsModule, NgClass],
  templateUrl: './signup-component.html',
  styleUrl: './signup-component.scss',
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private userService = inject(UserService);
  private toastrService = inject(ToastrAlertService);
  private cdr = inject(ChangeDetectorRef);

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

        secondary_name: ['', Validators.required],

        secondary_email: ['', Validators.email],

        mobileNo: ['', [Validators.required, Validators.pattern(/^\+?[1-9]\d{7,14}$/)]],

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

    this.userService.createUser(this.signupForm.value).subscribe({
      next: (res) => {
        this.loading = false;
        this.cdr.detectChanges();
        if (res.success) {
          this.toastrService.success(res.message || 'Signup successful!');
          this.router.navigate(['/login']);
        } else {
          this.toastrService.error(res.message || 'Signup failed.');
        }
      },
      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
        this.toastrService.error(err.message || 'An error occurred during signup.');
      },
    });
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
