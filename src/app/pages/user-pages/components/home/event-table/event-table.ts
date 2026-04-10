import { Component, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [MatTableModule, MatCardModule],
  templateUrl: './event-table.html',
  styleUrl: './event-table.scss',
})
export class EventTable {
  displayedColumns: string[] = ['name', 'date', 'link'];
  events = signal([
    {
      name: 'Summer Run Event',
      date: 'June 15, 2026',
      link: 'San Ramon',
    },
    {
      name: 'Public Speaking Competition',
      date: 'July 10, 2026',
      location: 'Online',
    },
    {
      name: 'Drawing Competition',
      date: 'August 5, 2026',
      location: 'Community Hall',
    },
    {
      name: 'Yoga Session',
      date: 'August 20, 2026',
      location: 'Park',
    },
  ]);
}
