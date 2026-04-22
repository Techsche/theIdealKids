import { Component, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-table',
  standalone: true,
  imports: [MatTableModule, MatCardModule, DatePipe, MatIconModule],
  templateUrl: './event-table.html',
  styleUrl: './event-table.scss',
  encapsulation: ViewEncapsulation.None
})
export class EventTable implements OnInit {
  displayedColumns: string[] = ['name', 'date', 'link'];
  isLoading = true;
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
    },{
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
  dataSource: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.isLoading = true;
    this.dataSource = this.events();
    this.isLoading = false;
  }


}
