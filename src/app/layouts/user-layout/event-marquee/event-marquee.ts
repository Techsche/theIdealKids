import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  PLATFORM_ID,
  signal,
  OnInit,
} from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventService } from '../../../services/user/event.service';
import { AuthService } from '../../../services/user/auth.service';
import { UpcomingEvents } from '../../../core/models/user/upcoming-events.models';

@Component({
  selector: 'app-event-marquee',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, DatePipe],
  templateUrl: './event-marquee.html',
  styleUrl: './event-marquee.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventMarquee implements OnInit {
  private eventService = inject(EventService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);

  readonly upcomingEvents = signal<UpcomingEvents[]>([]);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadEvents();
    }
  }

  private loadEvents(): void {
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

  register(event: UpcomingEvents, e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();

    this.router.navigate(['/event', event.id]);
  }
}
