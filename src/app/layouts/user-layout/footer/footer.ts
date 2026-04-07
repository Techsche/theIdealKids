import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear: number = new Date().getFullYear();
}
