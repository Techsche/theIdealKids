import { Component } from '@angular/core';
import { Bannercomponent } from '../components/home/bannercomponent/bannercomponent';
import { EventTable } from '../components/home/event-table/event-table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-homecomponent',
  standalone: true,
  imports: [Bannercomponent, EventTable, MatIconModule],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.scss',
})
export class Homecomponent {}
