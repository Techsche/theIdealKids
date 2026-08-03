import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ToastrAlertService } from '../../../../services/common/toastr.services';
import { UserService } from '../../../../services/user/user.service';
import { RegisteredEvent } from '../../../../core/models/user/registered-event.model';

@Component({
  selector: 'app-my-events-component',
  imports: [CommonModule, FormsModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './my-events-component.html',
  styleUrl: './my-events-component.scss',
})
export class MyEventsComponent implements OnInit {
  private readonly userService = inject(UserService);

  private readonly toastrService = inject(ToastrAlertService);

  private readonly router = inject(Router);

  loading = signal(false);

  searchText = '';

  events: RegisteredEvent[] = [];

  filteredEvents: RegisteredEvent[] = [];

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.loading.set(true);

    this.userService.getMyEvents().subscribe({
      next: (response) => {
        this.loading.set(false);

        if (response) {
          this.events = response ?? [];

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

  clearSearch(): void {
    this.searchText = '';

    this.filteredEvents = [...this.events];
  }

  refresh(): void {
    this.searchText = '';

    this.loadEvents();
  }

  viewCompetition(event: RegisteredEvent): void {
    this.router.navigate(['/my-event-competition'], {
      queryParams: {
        id: event.id,
      },
    });
  }

  viewAttendance(event: RegisteredEvent): void {
    this.router.navigate(['/attendance'], {
      queryParams: {
        id: event.id,
      },
    });
  }
}
