import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/user/auth.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatDividerModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  isLoggedIn = false;
  userName = '';

  // Mobile menu state
  menuOpen = false;

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = this.authService.getName();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();

    this.isLoggedIn = false;
    this.userName = '';
    this.menuOpen = false;

    this.router.navigate(['/login']);
  }
}
