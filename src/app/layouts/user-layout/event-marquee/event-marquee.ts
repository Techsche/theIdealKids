import { Component, inject, OnInit } from '@angular/core';
import { EventService } from '../../../services/user/event.service';
import { UpcomingEvents } from '../../../core/models/user/upcoming-events.models';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-event-marquee',
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: './event-marquee.html',
  styleUrl: './event-marquee.scss',
})
export class EventMarquee implements OnInit {
  upcomingEvents: UpcomingEvents[] = [];

  private eventService = inject(EventService);

  ngOnInit(): void {
    this.getAllUpcomingEvents();
  }

  getAllUpcomingEvents() {
    this.eventService.getUpcomingEvent().subscribe({
      next: (response) => {
        this.upcomingEvents = response;
      },
      error: (error) => {
        console.error('Error fetching upcoming events:', error);
      },
    });
  }
}
