import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { RouterLink, RouterLinkActive } from '@angular/router';

interface AdminMenuItem {
  label: string;
  icon: string;
  route?: string;

  /**
   * Optional children.
   */
  children?: AdminMenuItem[];

  /**
   * Roles allowed to see this item.
   */
  roles?: string[];
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  @Input() collapsed = false;

  @Input() mobileOpen = false;

  @Input() userRole = 'admin';

  @Output() menuItemClicked = new EventEmitter<void>();

  expandedMenu: string | null = null;

  readonly menuItems: AdminMenuItem[] = [
    {
      label: 'Home Page',
      icon: 'home',
      route: '/admin/dashboard',
      roles: ['admin', 'event-manager'],
    },

    {
      label: 'User Management',
      icon: 'person',
      route: '/admin/users',
      roles: ['admin'],
    },

    {
      label: 'Locations',
      icon: 'map',
      route: '/admin/locations',
      roles: ['admin', 'event-manager'],
    },

    {
      label: 'Event',
      icon: 'event',
      route: '/admin/events',
      roles: ['admin', 'event-manager'],
    },

    {
      label: 'Volunteers',
      icon: 'groups',
      route: '/admin/volunteers',
      roles: ['admin', 'event-manager'],
    },

    {
      label: 'Grades',
      icon: 'school',
      route: '/admin/grades',
      roles: ['admin'],
    },

    {
      label: 'Competitions',
      icon: 'emoji_events',
      route: '/admin/competitions',
      roles: ['admin', 'event-manager'],
    },

    {
      label: 'Coachings',
      icon: 'sports',
      route: '/admin/coachings',
      roles: ['admin', 'event-manager'],
    },

    {
      label: 'Notifications',
      icon: 'notifications',
      route: '/admin/notifications',
      roles: ['admin', 'event-manager'],
    },

    {
      label: 'Settings',
      icon: 'settings',
      route: '/admin/settings',
      roles: ['admin'],
    },
  ];

  get visibleMenuItems(): AdminMenuItem[] {
    return this.menuItems.filter((item) => {
      if (!item.roles || item.roles.length === 0) {
        return true;
      }

      return item.roles.includes(this.userRole);
    });
  }

  toggleSubMenu(item: AdminMenuItem): void {
    if (!item.children?.length) {
      this.menuItemClicked.emit();
      return;
    }

    if (this.expandedMenu === item.label) {
      this.expandedMenu = null;
    } else {
      this.expandedMenu = item.label;
    }
  }

  closeMenu(): void {
    this.menuItemClicked.emit();
  }
}
