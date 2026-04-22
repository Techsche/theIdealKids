import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [MatIconModule, MatCardModule],
  templateUrl: './who-we-are.html',
  styleUrl: './who-we-are.scss',
})
export class WhoWeAre {}
