import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { ActivatedRoute, ParamMap, RouterModule } from '@angular/router';
import { EMPTY, forkJoin } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { EventService } from '../../../../../../services/user/event.service';
import { ToastrAlertService } from '../../../../../../services/common/toastr.services';
import { FormsModule } from '@angular/forms';
import { EventDetails } from '../../../../../../core/models/user/event-details.model';
import {
  RegisteredEvent,
  StudentInfo,
} from '../../../../../../core/models/user/registered-event.model';

@Component({
  selector: 'app-competition',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatIconModule, FormsModule],
  templateUrl: './competition.component.html',
  styleUrl: './competition.component.scss',
})
export class CompetitionComponent {
  private readonly route = inject(ActivatedRoute);

  private readonly eventService = inject(EventService);

  private readonly toastr = inject(ToastrAlertService);

  private readonly destroyRef = inject(DestroyRef);

  loading = signal(true);

  event!: EventDetails;

  student!: StudentInfo;

  competitions: RegisteredEvent[] = [];

  filteredCompetitions: RegisteredEvent[] = [];

  registrationNo = '';

  eventId = '';

  studentId = '';

  isRegistrationClosed = false;

  searchText = '';

  ngOnInit(): void {
    this.loadCompetitionDetails();
  }

  private loadCompetitionDetails(): void {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          this.eventId = params.get('eventId') ?? '';
          this.studentId = params.get('studentId') ?? '';
          this.registrationNo = params.get('registrationNo') ?? '';

          if (!this.eventId || !this.studentId) {
            this.toastr.error('Invalid request.');
            return EMPTY;
          }

          return forkJoin({
            event: this.eventService.getEvent(this.eventId),
            student: this.eventService.getStudent(this.studentId),
            competitions: this.eventService.getRegCompetitionListforStudent(
              this.eventId,
              this.studentId,
            ),
          });
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: ({ event, student, competitions }) => {
          this.loading.set(false);
          this.event = event;
          this.student = student;

          this.checkRegistrationClosed();

          this.competitions = (competitions ?? []).map((competition) => {
            const schedule = this.event.eventCompetitions?.find(
              (x) => x.competition_Id === competition?.competition?.id,
            );

            return {
              ...competition,
              competition_date: schedule?.competition_date ?? null,
            };
          });

          this.competitions.sort((a, b) => (a.competition_date ?? 0) - (b.competition_date ?? 0));

          this.filteredCompetitions = [...this.competitions];
        },

        error: () => {
          this.toastr.error('Unable to load competition details.');
        },
      });
  }

  private checkRegistrationClosed(): void {
    if (!this.event?.registration_close_date) {
      return;
    }

    const closeDate = new Date(this.event.registration_close_date);

    closeDate.setDate(closeDate.getDate() + 1);

    this.isRegistrationClosed = closeDate < new Date();
  }

  onSearch(): void {
    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      this.filteredCompetitions = [...this.competitions];
      return;
    }

    this.filteredCompetitions = this.competitions.filter((item) => {
      const name = item.competition?.name?.toLowerCase() ?? '';

      const room = item.room?.room_name?.toLowerCase() ?? '';

      const regNo = String(item.register_number ?? '');

      return name.includes(keyword) || room.includes(keyword) || regNo.includes(keyword);
    });
  }
}
