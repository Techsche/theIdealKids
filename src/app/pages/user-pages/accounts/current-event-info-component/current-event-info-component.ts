import { Component, DestroyRef, inject, signal } from '@angular/core';
import { EventService } from '../../../../services/user/event.service';
import { Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CompetitionService } from '../../../../services/user/competition.service';
import { UserService } from '../../../../services/user/user.service';

import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-current-event-info-component',
  standalone: true,
  imports: [RouterModule, DatePipe],
  templateUrl: './current-event-info-component.html',
  styleUrl: './current-event-info-component.scss',
})
export class CurrentEventInfoComponent {
  private readonly eventService = inject(EventService);
  private readonly competitionService = inject(CompetitionService);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  readonly sanitizer = inject(DomSanitizer);

  loading = signal(false);

  event: any = null;

  competitionInfo: any[] = [];

  locations: any[] = [];

  subEventDates: any[] = [];

  isRegistrationClosed: boolean = false;

  talentEvent: boolean = false;

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loading.set(true);

    forkJoin({
      event: this.eventService.getUpcomingEvent(),
      competitions: this.competitionService.getCompetitions(),
      locations: this.userService.getLocations(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ event, competitions, locations }) => {
          this.event = event;
          this.talentEvent = true;
          this.locations = this.filterLocations(locations);

          this.buildCompetitionInfo(competitions);

          this.buildSummerRunInfo();

          this.isRegistrationClosed =
            new Date(event.registration_close_date).getTime() < Date.now();

          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  private filterLocations(locations: any[]) {
    if (!this.event) return [];

    if (this.event.summer_run) {
      return locations.filter(
        (x) => x.country === this.event.country_code && x.type === 'Run type',
      );
    }

    return locations.filter(
      (x) => x.country === this.event.country_code && x.type === 'Talent event type',
    );
  }

  private buildCompetitionInfo(competitions: any[]): void {
    if (!this.event || this.event.summer_run || !this.event.eventCompetitions?.length) {
      return;
    }

    // Your existing competition processing logic
    // (move your old code here)
  }

  private buildSummerRunInfo(): void {
    if (!this.event?.summer_run) {
      return;
    }

    this.subEventDates = this.event.subEvents
      .map((x: any) => x.event_date)
      .filter((value: any, index: number, self: any[]) => self.indexOf(value) === index)
      .sort();
  }

  register(): void {
    this.router.navigate(['/register-event', this.event.id]);
  }
}
