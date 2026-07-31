import { Component, inject, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/user/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  isLoggedIn = false;
  userName = '';

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.userName = this.authService.getName();
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = '';
    this.router.navigate(['/login']);
  }

  toggleMenu(): void {
    document.querySelector('.nav-menu')?.classList.toggle('active');
  }
}
