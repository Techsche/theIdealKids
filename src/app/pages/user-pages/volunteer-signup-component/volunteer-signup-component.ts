import { NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '../../../shared/validators/password.validator';
import { matchPassword } from '../../../shared/validators/match-password.validator';
import { VolunteerCategory } from '../../../core/models/user/volunteer.model';
import { VolunteerService } from '../../../services/user/volunteer.services';
import { RouterLink, Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ToastrAlertService } from '../../../services/common/toastr.services';

@Component({
  selector: 'app-volunteer-signup-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink, NgSelectComponent],
  templateUrl: './volunteer-signup-component.html',
  styleUrl: './volunteer-signup-component.scss',
})
export class VolunteerSignupComponent {
  private fb = inject(FormBuilder);
  volunteerForm!: FormGroup;
  submitted = false;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;
  volunteerCategories: VolunteerCategory[] = [];

  grades = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  private volunteerService = inject(VolunteerService);
  private toastrService = inject(ToastrAlertService);
  private cdr = inject(ChangeDetectorRef);
  private router = inject(Router);

  ngOnInit(): void {
    this.getCategories();
    this.setForm();
  }

  getCategories(): void {
    this.volunteerService.getAllCategories().subscribe({
      next: (response: any) => {
        if (response) {
          this.volunteerCategories = response;
        } else {
          // console.error('Failed to fetch volunteer categories:', response?.message);
        }
      },
      error: (error: any) => {
        console.error('Error fetching volunteer categories:', error);
      },
    });
  }

  setForm(): void {
    this.volunteerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        school_name: ['', Validators.required],
        school_city: ['', Validators.required],
        grade: ['', Validators.required],
        mobileNo: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', Validators.required],

        mom_name: ['', Validators.required],
        mom_email: ['', [Validators.required, Validators.email]],
        mom_mobile_number: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],

        dad_name: ['', Validators.required],
        dad_email: ['', [Validators.required, Validators.email]],
        dad_mobile_number: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],

        coach_name: [''],
        coach_email: ['', Validators.email],

        area_of_expertise: [''],
        volunteer_categories: [[]],
        selectedCategories: [[]],
      },
      {
        validators: matchPassword('password', 'confirmPassword'),
      },
    );
  }

  get f() {
    return this.volunteerForm.controls;
  }

  get selectedCategories(): VolunteerCategory[] {
    return (this.volunteerForm.get('volunteer_categories')?.value ?? []) as VolunteerCategory[];
  }

  isCategorySelected(categoryId: string): boolean {
    const selectedCategories = this.f['volunteer_categories'].value ?? [];

    return selectedCategories.includes(categoryId);
  }

  onCategoryChange(event: Event, categoryId: string): void {
    const checked = (event.target as HTMLInputElement).checked;

    const selectedCategories = [...(this.f['volunteer_categories'].value ?? [])];

    if (checked) {
      if (!selectedCategories.includes(categoryId)) {
        selectedCategories.push(categoryId);
      }
    } else {
      const index = selectedCategories.indexOf(categoryId);

      if (index > -1) {
        selectedCategories.splice(index, 1);
      }
    }

    this.f['volunteer_categories'].setValue(selectedCategories);

    this.f['volunteer_categories'].markAsDirty();

    this.f['volunteer_categories'].markAsTouched();
  }

  signup(): void {
    this.submitted = true;

    this.volunteerForm.markAllAsTouched();

    if (this.volunteerForm.invalid) {
      return;
    }

    this.loading = true;

    this.volunteerService.createHighSchoolVolunteer(this.volunteerForm.value).subscribe({
      next: (response: any) => {
        this.loading = false;
        this.cdr.detectChanges();
        if (response.success) {
          // Handle successful signup, e.g., show a success message or redirect
          this.toastrService.success(response.message || 'Signup successful!');
          this.router.navigate(['/login']);
        } else {
          // Handle error response, e.g., show an error message
          this.toastrService.error(response.message || 'Signup failed.');
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.cdr.detectChanges();
        // Handle error, e.g., show an error message
        this.toastrService.error(error.message || 'An error occurred during signup.');
      },
    });
  }

  cancel(): void {
    this.volunteerForm.reset();

    this.submitted = false;
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
