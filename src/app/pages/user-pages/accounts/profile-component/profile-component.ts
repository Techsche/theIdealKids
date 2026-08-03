import { Component, OnInit, inject, signal } from '@angular/core';
import { ILocation } from '../../../../core/models/user/location.model';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { mobileValidator } from '../../../../shared/validators/mobileNo.validators';
import { UserService } from '../../../../services/user/user.service';
import { ToastrAlertService } from '../../../../services/common/toastr.services';
import { IUserProfile } from '../../../../core/models/user/profile.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.scss',
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;

  submitted = false;

  loading = signal(false);

  saving = signal(false);

  locations: ILocation[] = [];

  userId: string = '';

  private fb = inject(FormBuilder);
  private userService = inject(UserService);
  private toastService = inject(ToastrAlertService);

  ngOnInit(): void {
    this.initializeForm();

    this.loadLocations();

    this.loadProfile();
  }

  initializeForm(): void {
    this.profileForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],

      email: [
        {
          value: '',
          disabled: true,
        },
      ],

      mobileNo: ['', [Validators.required, mobileValidator()]],

      secondary_name: [''],

      secondary_email: ['', Validators.email],

      location_id: ['', Validators.required],
    });
  }

  loadProfile(): void {
    this.loading.set(true);

    this.userService.getProfile().subscribe({
      next: (profile: IUserProfile) => {
        this.loading.set(false);
        this.userId = profile.id;
        this.profileForm.patchValue({
          id: profile.id,
          name: profile.name,

          email: profile.email,

          mobileNo: profile.mobileNo,

          secondary_name: profile.secondary_name,

          secondary_email: profile.secondary_email,

          location_id: profile.location_id,
        });
      },

      error: (err) => {
        this.loading.set(false);

        this.toastService.error(err?.error?.message || 'Unable to load profile.');
      },
    });
  }

  loadLocations(): void {
    this.userService.getLocations().subscribe({
      next: (locations: ILocation[]) => {
        this.locations = locations;
      },

      error: () => {
        this.toastService.error('Unable to load locations.');
      },
    });
  }

  saveProfile(): void {
    this.submitted = true;

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();

      return;
    }

    this.saving.set(true);

    const payload = this.profileForm.getRawValue();

    this.userService.updateProfile(payload, this.userId).subscribe({
      next: (response: any) => {
        this.saving.set(false);

        this.toastService.success(response.message || 'Profile updated successfully.');
      },

      error: (err) => {
        this.saving.set(false);

        this.toastService.error(err?.error?.message || 'Unable to update profile.');
      },
    });
  }

  resetForm(): void {
    this.submitted = false;

    this.loadProfile();
  }

  get f() {
    return this.profileForm.controls;
  }
}
