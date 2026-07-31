import { Component } from '@angular/core';
import { UpcomingEvent } from '../../../core/models/user/pastevents.models';
import { PAST_EVENTS } from '../../../core/data/past-events';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-events-component',
  imports: [NgClass],
  templateUrl: './events-component.html',
  styleUrl: './events-component.scss',
})
export class EventsComponent {
  pastEvents = PAST_EVENTS;
  upcomingEvents: UpcomingEvent[] = [];
  expandedYear: number | null = this.pastEvents[0]?.year;

  toggleAccordion(year: number): void {
    this.expandedYear = this.expandedYear === year ? null : year;
  }

  isExpanded(year: number): boolean {
    return this.expandedYear === year;
  }
}
