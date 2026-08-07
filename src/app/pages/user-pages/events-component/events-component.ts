import { Component, inject, OnInit } from '@angular/core';
import { PAST_EVENTS } from '../../../core/data/past-events';
import { NgClass } from '@angular/common';
import { EventService } from '../../../services/user/event.service';
import { UpcomingEvents } from '../../../core/models/user/upcoming-events.models';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-events-component',
  standalone: true,
  imports: [NgClass, DatePipe],
  templateUrl: './events-component.html',
  styleUrl: './events-component.scss',
})
export class EventsComponent implements OnInit{
  pastEvents = PAST_EVENTS;
  upcomingEvents: UpcomingEvents[] = [];
  expandedYear: number | null = this.pastEvents[0]?.year;

  private eventService = inject(EventService);

  ngOnInit(): void {
    this.getAllUpcomingEvents();
  }

  getAllUpcomingEvents() {
    this.eventService.getUpcomingEvent().subscribe({
      next: (data) => {
        this.upcomingEvents = data;
      },
      error: (error) => {
        console.error('Error fetching upcoming events:', error);
      },
    });
  }


  toggleAccordion(year: number): void {
    this.expandedYear = this.expandedYear === year ? null : year;
  }

  isExpanded(year: number): boolean {
    return this.expandedYear === year;
  }
}
