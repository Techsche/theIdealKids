import { Component, DestroyRef, inject, signal } from '@angular/core';
import { EventService } from '../../../../services/user/event.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CompetitionService } from '../../../../services/user/competition.service';
import { UserService } from '../../../../services/user/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../../../services/user/auth.service';
import { ILocation } from '../../../../core/models/user/location.model';

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
  private readonly route = inject(ActivatedRoute);
  private authService = inject(AuthService);

  loading = signal(false);

  event = signal<any | null>(null);

  competitionInfo: any[] = [];

  multiDateCompetitions: any[] = [];

  locations: ILocation[] = [];

  subEventDates: any[] = [];

  isRegistrationClosed: boolean = false;

  talentEvent: boolean = false;

  isMultiDate: boolean = false;

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');

    if (eventId) {
      this.loadData(eventId);
    }
  }

  loadData(eventId: string): void {
    this.loading.set(true);

    forkJoin({
      event: this.eventService.getUpcomingEventById(eventId),
      competitions: this.competitionService.getCompetitions(),
      locations: this.userService.getLocations(),
    })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.event.set(response.event);

          this.talentEvent = !this.event().summer_run;

          this.locations = this.filterLocations(response.locations);

          this.buildCompetitionInfo(response.competitions);

          this.buildSummerRunInfo();

          this.isRegistrationClosed =
            new Date(this.event().registration_close_date).getTime() < Date.now();

          this.loading.set(false);
        },

        error: (error) => {
          this.loading.set(false);
        },
      });
  }

  private filterLocations(locations: ILocation[]): any[] {
    if (!this.event()) {
      return [];
    }

    if (this.event().summer_run) {
      return locations.filter(
        (location) =>
          location.country === this.event()?.country_code && location.type === 'Run type',
      );
    }

    return locations.filter(
      (location) =>
        location.country === this.event()?.country_code && location.type === 'Talent event type',
    );
  }

  private buildCompetitionInfo(competitions: any[]): void {
    this.competitionInfo = [];
    this.multiDateCompetitions = [];
    this.isMultiDate = false;

    if (!this.event() || this.event().summer_run || !this.event().eventCompetitions?.length) {
      return;
    }

    // Check whether the event has multi-date competitions
    this.isMultiDate = this.event().is_multiDate;

    // =========================================================
    // MULTI-DATE COMPETITION
    // =========================================================

    if (this.isMultiDate) {
      this.event().eventCompetitions.forEach((eventCompetition: any) => {
        if (!eventCompetition.selected) {
          return;
        }

        const competition = competitions.find(
          (comp) => comp.id === eventCompetition.competition_Id,
        );

        if (!competition) {
          return;
        }

        this.multiDateCompetitions.push({
          name: competition.name,
          shortDescription: competition.short_description || '',
          grades: competition.gradeList || [],
          multiDates: eventCompetition.competitionDates || [],
        });
      });

      return;
    }

    // =========================================================
    // SINGLE-DATE COMPETITION
    // =========================================================

    const grouped = new Map<number, any[]>();

    this.event().eventCompetitions.forEach((eventCompetition: any) => {
      if (!eventCompetition.selected) {
        return;
      }

      const competition = competitions.find((comp) => comp.id === eventCompetition.competition_Id);

      if (!competition) {
        return;
      }

      const competitionData = {
        name: competition.name,
        shortDescription: competition.short_description || '',
        grades: competition.gradeList || [],
      };

      const date = eventCompetition.competition_date;

      if (!grouped.has(date)) {
        grouped.set(date, []);
      }

      grouped.get(date)!.push(competitionData);
    });

    this.competitionInfo = Array.from(grouped.entries())
      .map(([date, competitions]) => ({
        date,
        competitions,
      }))
      .sort((a, b) => a.date - b.date);
  }

  private buildSummerRunInfo(): void {
    if (!this.event()?.summer_run) {
      this.subEventDates = [];
      return;
    }

    this.subEventDates =
      this.event()
        .subEvents?.map((item: any) => item.event_date)
        .filter((date: any, index: number, dates: any[]) => dates.indexOf(date) === index)
        .sort((n1: number, n2: number) => n1 - n2) ?? [];
  }

  register(): void {
    if (!this.event) {
      return;
    }

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], {
        queryParams: {
          returnUrl: `/register-event/${this.event().id}`,
        },
      });

      return;
    }

    this.router.navigate(['/register-event', this.event().id]);
  }
}
