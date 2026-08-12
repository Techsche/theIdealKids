import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RegistrationLayoutComponent } from './component/registration-layout/registration-layout.component';
import { KidsComponent } from './component/kids/kids.component';
import { VolunteerComponent } from './component/volunteer/volunteer.component';
import { DonationComponent } from './component/donation/donation.component';
import { WaiverComponent } from './component/waiver/waiver.component';
import { ConfirmationComponent } from './component/confirmation/confirmation.component';
import { CommonModule } from '@angular/common';
import { EventDetails } from '../../../../core/models/user/event-details.model';
import { EventService } from '../../../../services/user/event.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastrAlertService } from '../../../../services/common/toastr.services';

@Component({
  selector: 'app-event-registration',
  standalone: true,

  imports: [
    CommonModule,
    RegistrationLayoutComponent,
    KidsComponent,
    VolunteerComponent,
    DonationComponent,
    WaiverComponent,
    ConfirmationComponent,
    RouterLink
],

  templateUrl: './event-registration.component.html',
  styleUrl: './event-registration.component.scss',
})
export class EventRegistrationComponent implements OnInit {
  event: EventDetails | null = null;

  steps: string[] = ['Kids', 'Volunteer', 'Waiver', 'Donation', 'Confirmation'];

  activeIndex = 0;

  canContinue = false;

  isLoading = signal(true);

  private eventService = inject(EventService);
  private route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private toastr = inject(ToastrAlertService);

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.getEventDetails(eventId);
    }
  }

  getEventDetails(id: string) {
    this.eventService
      .getUpcomingEventById(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.isLoading.set(false);
          if (response.success) {
            this.event = response;
          } else {
            this.toastr.error(response.message || 'Something went wrong!');
          }
        },
        error: () => {
          this.isLoading.set(false);
          this.toastr.error('Something went wrong!');
        },
      });
  }

  /**
   * Called when Kids component tells parent
   * whether the current step is valid.
   */
  onKidsValidationChanged(isValid: boolean): void {
    this.canContinue = isValid;
  }

  onVolunteerValidationChanged(isValid: boolean): void {
    this.canContinue = isValid;
  }

  onWaiverValidationChanged(isValid: boolean): void {
    this.canContinue = isValid;
  }

  onDonationValidationChanged(isValid: boolean): void {
    this.canContinue = isValid;
  }
  /**
   * Go to next step
   */
  nextStep(): void {
    if (!this.canContinue) {
      return;
    }

    if (this.activeIndex < this.steps.length - 1) {
      this.activeIndex++;

      this.updateStepValidation();
    }
  }

  /**
   * Go to previous step
   */
  previousStep(): void {
    if (this.activeIndex > 0) {
      this.activeIndex--;

      this.updateStepValidation();
    }
  }

  /**
   * Each step can have its own validation.
   */
  private updateStepValidation(): void {
    switch (this.activeIndex) {
      case 0:
        // Kids component will control this.
        this.canContinue = false;
        break;

      case 1:
        // Volunteer
        this.canContinue = true;
        break;

      case 2:
        // Waiver
        this.canContinue = true;
        break;

      case 3:
        // Donation
        this.canContinue = true;
        break;

      case 4:
        // Confirmation
        this.canContinue = true;
        break;

      default:
        this.canContinue = false;
    }
  }
}
