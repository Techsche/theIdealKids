import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { PAST_EVENTS } from '../../../core/data/past-events';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { EventService } from '../../../services/user/event.service';
import { UpcomingEvents } from '../../../core/models/user/upcoming-events.models';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
@Component({
  selector: 'app-events-component',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './events-component.html',
  styleUrl: './events-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsComponent implements OnInit {
  pastEvents = PAST_EVENTS;
  readonly upcomingEvents = signal<UpcomingEvents[]>([]);
  expandedYear: number | null = this.pastEvents[0]?.year;

  private eventService = inject(EventService);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.getAllUpcomingEvents();
  }

  getAllUpcomingEvents() {
    this.eventService
      .getUpcomingEvent()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (events) => {
          this.upcomingEvents.set(events);
        },

        error: () => {},
      });
  }

  toggleAccordion(year: number): void {
    this.expandedYear = this.expandedYear === year ? null : year;
  }

  isExpanded(year: number): boolean {
    return this.expandedYear === year;
  }

  register(event: UpcomingEvents, e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    this.router.navigate(['/event', event.id]);
  }
}
