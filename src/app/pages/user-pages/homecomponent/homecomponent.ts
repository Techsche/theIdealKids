import { Component } from '@angular/core';
import { Bannercomponent } from '../components/home/bannercomponent/bannercomponent';
import { EventTable } from '../components/home/event-table/event-table';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { WhoWeAre } from '../components/home/who-we-are/who-we-are';

@Component({
  selector: 'app-homecomponent',
  standalone: true,
  imports: [Bannercomponent, EventTable,MatIconModule, WhoWeAre],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.scss',
})
export class Homecomponent {}
