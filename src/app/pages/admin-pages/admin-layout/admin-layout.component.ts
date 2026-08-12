import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';



@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminFooterComponent,
  ],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss',
})
export class AdminLayoutComponent {
  sidebarCollapsed = false;
  mobileSidebarOpen = false;

  /**
   * Change this based on your actual authentication/user service.
   *
   * Example:
   * admin
   * event-manager
   * volunteer-manager
   */
  userRole = 'admin';

  toggleSidebar(): void {
    if (window.innerWidth <= 991) {
      this.mobileSidebarOpen = !this.mobileSidebarOpen;
      return;
    }

    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  closeMobileSidebar(): void {
    this.mobileSidebarOpen = false;
  }

  onLogout(): void {
    // Replace this with your actual logout service.
    console.log('Logout clicked');
  }
}