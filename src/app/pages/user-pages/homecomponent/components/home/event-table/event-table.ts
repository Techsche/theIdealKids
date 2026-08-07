import { Component, OnInit, inject, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { EventService } from '../../../../../../services/user/event.service';
import { UpcomingEvents } from '../../../../../../core/models/user/upcoming-events.models';

@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [MatTableModule, MatCardModule, DatePipe, MatIconModule],
  templateUrl: './event-table.html',
  styleUrl: './event-table.scss',
  encapsulation: ViewEncapsulation.None,
})
export class EventTable implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'link'];
  isLoading = true;
  events: UpcomingEvents[] = [];
  dataSource: any[] = [];

  private eventService = inject(EventService);

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.isLoading = true;
    this.eventService.getUpcomingEvent().subscribe({
      next: (data) => {
        this.isLoading = false;
        this.events = data;
        this.prepareDataSource();
      },
      error: (error) => {
        console.error('Error fetching events:', error);
        this.isLoading = false;
      },
    });
  }

  prepareDataSource() {
    this.dataSource = this.events
      .filter((event) => event.is_published)
      .map((event) => {
        return {
          name: event.name,
          date: new Date(event.start_date).toLocaleDateString(),
          link: `/event/${event.id}`,
        };
      });
    this.isLoading = false;
  }
}
