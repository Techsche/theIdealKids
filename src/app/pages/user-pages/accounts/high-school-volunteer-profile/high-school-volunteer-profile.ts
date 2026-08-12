import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { ToastrAlertService } from '../../../../services/common/toastr.services';
import { VolunteerService } from '../../../../services/user/volunteer.services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { mobileValidator } from '../../../../shared/validators/mobileNo.validators';

@Component({
  selector: 'app-high-school-volunteer-profile',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './high-school-volunteer-profile.html',
  styleUrl: './high-school-volunteer-profile.scss',
})
export class HighSchoolVolunteerProfile implements OnInit {
  submitted: boolean = true;

  loading = signal(true);

  saving = signal(false);

  private volunteerService = inject(VolunteerService);

  private router = inject(Router);

  private toastr = inject(ToastrAlertService);

  private fb = inject(FormBuilder);

  private readonly route = inject(ActivatedRoute);

  private destroyRef = inject(DestroyRef);

  userId: string = '';

  volunteerprofileForm!: FormGroup;

  ngOnInit(): void {
    this.initForm();
    this.getData();
  }

  initForm() {
    this.volunteerprofileForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],

      email: ['', [Validators.required, Validators.email]],

      school_name: ['', Validators.required],

      school_city: ['', Validators.required],

      grade: ['', Validators.required],

      mobileNo: ['', [Validators.required, mobileValidator(10, 15)]],

      mom_name: ['', [Validators.minLength(3)]],

      mom_email: ['', Validators.email],

      mom_mobile_number: ['', mobileValidator(10, 15)],

      dad_name: ['', [Validators.minLength(3)]],

      dad_email: ['', Validators.email],

      dad_mobile_number: ['', [Validators.minLength(10), mobileValidator(10, 15)]],

      coach_name: [''],

      coach_email: ['', Validators.email],
    });
  }

  getData() {
    this.volunteerService
      .getById()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.userId = response.id ?? '';
          this.volunteerprofileForm.patchValue({
            name: response.name ?? '',
            email: response.email ?? '',
            school_name: response.school_name ?? '',
            school_city: response.school_city ?? '',
            grade: response.grade ?? '',
            mobileNo: response.mobileNo ?? '',

            mom_name: response.mom_name ?? '',
            mom_email: response.mom_email ?? '',
            mom_mobile_number: response.mom_mobile_number ?? '',

            dad_name: response.dad_name ?? '',
            dad_email: response.dad_email ?? '',
            dad_mobile_number: response.dad_mobile_number ?? '',

            coach_name: response.coach_name ?? '',
            coach_email: response.coach_email ?? '',
          });

          this.loading.set(false);
        },
        error: (error) => {
          this.loading.set(false);
        },
      });
  }

  get f() {
    return this.volunteerprofileForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.volunteerprofileForm.valid) {
      return;
    }
    this.saving.set(true);

    this.volunteerService.updateVolunteer(this.userId, this.volunteerprofileForm.value).subscribe({
      next: (response) => {
        this.saving.set(false);
        this.toastr.success(response.message || 'Profile updated Successfully!');
      },
      error: (error) => {
        this.saving.set(false);
        this.toastr.error(error.message);
      },
    });
  }

  cancel() {
    this.submitted = false;
    this.getData();
    this.volunteerprofileForm.markAsPristine();
    this.volunteerprofileForm.markAsUntouched();
  }
}
