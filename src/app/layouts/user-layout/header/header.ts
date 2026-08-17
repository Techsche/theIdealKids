import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../../services/user/auth.service';
import { MatDividerModule } from '@angular/material/divider';
import { EventMarquee } from '../event-marquee/event-marquee';
import { UserService } from '../../../services/user/user.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    RouterModule,
    EventMarquee,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private authService = inject(AuthService);

  private readonly router = inject(Router);

  private userService = inject(UserService);

  private destroyRef = inject(DestroyRef);

  isLoggedIn = this.authService.isLoggedIn;
  userName = this.authService.userName;
  isShowAdmin = signal(false);
  isShowScoring = signal(false);
  isHighSchooolVolunteer = signal(false);
  menuOpen = false;

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    const token = this.authService.getToken();

    if (!token) {
      this.clearRoles();
      return;
    }

    this.userService
      .getLoggedInUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const authorities = response?.authorities ?? [];

          this.isShowAdmin.set(authorities.includes('ROLE_ADMIN') || authorities.includes('ROLE_LOCATION_ADMIN'));

          this.isShowScoring.set(authorities.includes('ROLE_JUDGE'));

          this.isHighSchooolVolunteer.set(authorities.includes('ROLE_HIGH_SCHOOL_VOlUNTEER'));
        },
        error: () => {
          this.authService.logout();
          this.router.navigate(['/login']);
        },
      });
  }

  // =========================================================
  // CLEAR ROLES
  // =========================================================

  private clearRoles(): void {
    this.isShowAdmin.set(false);

    this.isShowScoring.set(false);

    this.isHighSchooolVolunteer.set(false);
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  logout(): void {
    this.authService.logout();

    this.menuOpen = false;

    this.router.navigate(['/home']);
  }
}
