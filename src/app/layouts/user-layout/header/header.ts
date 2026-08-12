import { Component, DestroyRef, inject, OnInit } from '@angular/core';
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
  isShowAdmin: boolean = false;
  isShowScoring: boolean = false;
  isHighSchooolVolunteer: boolean = false;

  ngOnInit(): void {
    this.getUserInfo();
  }

  getUserInfo(): void {
    if (!this.authService.getToken()) {
      return;
    }

    this.userService
      .getLoggedInUser()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          const authorities = response?.authorities ?? [];

          this.isShowAdmin =
            authorities.includes('ROLE_ADMIN') || authorities.includes('ROLE_LOCATION_ADMIN');

          this.isShowScoring = authorities.includes('ROLE_JUDGE');

          this.isHighSchooolVolunteer = authorities.includes('ROLE_HIGH_SCHOOL_VOlUNTEER');
        },
        error: (err) => {},
      });
  }

  // Mobile menu state
  menuOpen = false;

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
