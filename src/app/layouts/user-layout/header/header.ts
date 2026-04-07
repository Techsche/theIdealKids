import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  isLoggedIn = false; // 🔥 toggle later with auth

  toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu?.classList.toggle('active');
  }

 
}
