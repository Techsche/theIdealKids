import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrAlertService } from '../../../../services/common/toastr.services';
import { RegisteredEvent } from '../../../../core/models/user/registered-event.model';
import { EventService } from '../../../../services/user/event.service';
@Component({
  selector: 'app-my-events-component',
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './my-events-component.html',
  styleUrl: './my-events-component.scss',
})
export class MyEventsComponent implements OnInit {
  private readonly eventService = inject(EventService);

  private readonly toastrService = inject(ToastrAlertService);

  private readonly router = inject(Router);

  loading = signal(true);

  searchText = '';

  events: RegisteredEvent[] = [];

  filteredEvents: RegisteredEvent[] = [];

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.eventService.getMyEvents().subscribe({
      next: (response) => {
        this.loading.set(false);
        if (response) {
          this.events = response.reverse() ?? [];

          this.filteredEvents = [...this.events];
        } else {
          this.events = [];
          this.filteredEvents = [];

          this.toastrService.error('Unable to load registered events.');
        }
      },

      error: () => {
        this.loading.set(false);
        this.toastrService.error('Something went wrong while loading your events.');
      },
    });
  }

  onSearch(): void {
    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      this.filteredEvents = [...this.events];

      return;
    }

    this.filteredEvents = this.events.filter(
      (event) =>
        event.event.name?.toLowerCase().includes(keyword) ||
        event.student.first_name?.toLowerCase().includes(keyword) ||
        event.student.last_name?.toLowerCase().includes(keyword) ||
        event.register_number?.toString().includes(keyword),
    );
  }

  viewCompetition(event: RegisteredEvent): void {
    this.router.navigate(['/student-competition', event.event_id, event.student_id, event.register_number]);
  }

  viewAttendance(event: RegisteredEvent): void {
    this.router.navigate(['/student-attendance', event.id]);
  }
}
