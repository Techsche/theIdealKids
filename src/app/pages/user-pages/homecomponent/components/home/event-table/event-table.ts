import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  PLATFORM_ID,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { EventService } from '../../../../../../services/user/event.service';
import { UpcomingEvents } from '../../../../../../core/models/user/upcoming-events.models';

@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatIconModule,
    DatePipe,
    RouterModule,
  ],
  templateUrl: './event-table.html',
  styleUrl: './event-table.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventTable implements OnInit {

  displayedColumns = ['name', 'date', 'link'];

  readonly isLoading = signal(true);

  readonly events = signal<UpcomingEvents[]>([]);

  private eventService = inject(EventService);
  private platformId = inject(PLATFORM_ID);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadUpcomingEvents();
    }
  }

  private loadUpcomingEvents(): void {

    this.eventService
      .getUpcomingEvent()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({

        next: (events) => {

          this.events.set(
            events.filter(event => event.is_published)
          );

          this.isLoading.set(false);

        },

        error: err => {

          console.error(err);

          this.isLoading.set(false);

        }

      });

  }

}