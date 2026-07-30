import { NgClass, SlicePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { passwordValidator } from '../../../shared/validators/password.validator';
import { matchPassword } from '../../../shared/validators/match-password.validator';
import { VolunteerCategory } from '../../../core/models/user/volunteer.model';
import { VolunteerService } from '../../../services/user/volunteer.services';
import { RouterLink } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-volunteer-signup-component',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, RouterLink, NgSelectComponent, SlicePipe],
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

  constructor(private volunteerService: VolunteerService) {}

  ngOnInit(): void {
    this.getCategories();
    this.setForm();
  }

  getCategories(): void {
    this.volunteerService.getAllCategories().subscribe({
      next: (response: any) => {
        if (response) {
          this.volunteerCategories = response;
          console.log('Volunteer Categories Response:', this.volunteerCategories);
        } else {
          // console.error('Failed to fetch volunteer categories:', response?.message);
        }
      },
      error: (error) => {
        console.error('Error fetching volunteer categories:', error);
      },
    });
  }

  setForm(): void {
    this.volunteerForm = this.fb.group(
      {
        studentName: ['', Validators.required],
        studentEmail: ['', [Validators.required, Validators.email]],
        schoolName: ['', Validators.required],
        schoolCity: ['', Validators.required],
        grade: ['', Validators.required],
        mobileNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        momName: ['', Validators.required],
        dadName: ['', Validators.required],
        momMobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        dadMobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
        momEmail: ['', [Validators.required, Validators.email]],
        dadEmail: ['', [Validators.required, Validators.email]],
        coachName: [''],
        coachEmail: ['', Validators.email],
        volunteerCategories: [[]],
        expertise: [''],
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ['', Validators.required],
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
    return (this.volunteerForm.get('volunteerCategories')?.value ?? []) as VolunteerCategory[];
  }

  isCategorySelected(categoryId: string): boolean {
    const selectedCategories = this.f['volunteerCategories'].value ?? [];

    return selectedCategories.includes(categoryId);
  }
  onCategoryChange(event: Event, categoryId: string): void {
    const checked = (event.target as HTMLInputElement).checked;

    const selectedCategories = [...(this.f['volunteerCategories'].value ?? [])];

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

    this.f['volunteerCategories'].setValue(selectedCategories);

    this.f['volunteerCategories'].markAsDirty();

    this.f['volunteerCategories'].markAsTouched();
  }

  signup(): void {
    this.submitted = true;

    this.volunteerForm.markAllAsTouched();

    if (this.volunteerForm.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.volunteerForm.getRawValue());

    setTimeout(() => {
      this.loading = false;

      alert('Volunteer Registration Successful');
    }, 1500);
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
