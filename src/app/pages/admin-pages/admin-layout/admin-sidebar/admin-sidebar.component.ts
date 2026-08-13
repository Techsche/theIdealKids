import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface AdminMenuItem {
  label: string;
  icon: string;
  route?: string;
  roles?: string[];
  children?: AdminMenuItem[];
}

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss',
})
export class AdminSidebarComponent {
  @Input() collapsed = false;
  @Input() mobileOpen = false;
  @Input() userRole = '';

  @Output() menuItemClicked = new EventEmitter<void>();

  expandedMenu: string | null = null;

  /*
   * =========================================================
   * ADMIN MENU
   * =========================================================
   */

  menuItems: AdminMenuItem[] = [
    {
      label: 'Dashboard',
      icon: 'dashboard',
      route: '/admin',
    },

    {
      label: 'Banners',
      icon: 'image',
      route: '/admin/banners',
    },

    {
      label: 'Events',
      icon: 'event',
      children: [
        {
          label: 'All Events',
          icon: 'event',
          route: '/admin/events',
        },
        {
          label: 'Add Event',
          icon: 'add_circle',
          route: '/admin/events/add',
        },
        {
          label: 'Upcoming Events',
          icon: 'event_available',
          route: '/admin/events/upcoming',
        },
        {
          label: 'Past Events',
          icon: 'history',
          route: '/admin/events/past',
        },
      ],
    },

    {
      label: 'Registrations',
      icon: 'how_to_reg',
      children: [
        {
          label: 'All Registrations',
          icon: 'list_alt',
          route: '/admin/registrations',
        },
        {
          label: 'Pending Registrations',
          icon: 'pending_actions',
          route: '/admin/registrations/pending',
        },
        {
          label: 'Completed Registrations',
          icon: 'task_alt',
          route: '/admin/registrations/completed',
        },
      ],
    },

    {
      label: 'Children',
      icon: 'child_care',
      children: [
        {
          label: 'All Children',
          icon: 'groups',
          route: '/admin/children',
        },
        {
          label: 'Add Child',
          icon: 'person_add',
          route: '/admin/children/add',
        },
      ],
    },

    {
      label: 'Competitions',
      icon: 'emoji_events',
      children: [
        {
          label: 'All Competitions',
          icon: 'emoji_events',
          route: '/admin/competitions',
        },
        {
          label: 'Add Competition',
          icon: 'add_circle',
          route: '/admin/competitions/add',
        },
      ],
    },

    {
      label: 'Volunteers',
      icon: 'volunteer_activism',
      children: [
        {
          label: 'All Volunteers',
          icon: 'groups',
          route: '/admin/volunteers',
        },
        {
          label: 'Volunteer Categories',
          icon: 'category',
          route: '/admin/volunteers/categories',
        },
      ],
    },

    {
      label: 'Reports',
      icon: 'assessment',
      children: [
        {
          label: 'Registration Report',
          icon: 'description',
          route: '/admin/reports/registrations',
        },
        {
          label: 'Attendance Report',
          icon: 'fact_check',
          route: '/admin/reports/attendance',
        },
      ],
    },

    {
      label: 'Settings',
      icon: 'settings',
      children: [
        {
          label: 'Profile',
          icon: 'person',
          route: '/admin/settings/profile',
        },
        {
          label: 'Change Password',
          icon: 'lock',
          route: '/admin/settings/change-password',
        },
      ],
    },
  ];

  /*
   * =========================================================
   * ROLE BASED MENU
   * =========================================================
   */

  get visibleMenuItems(): AdminMenuItem[] {
    return this.menuItems.filter((item) => this.canViewItem(item));
  }

  private canViewItem(item: AdminMenuItem): boolean {
    if (!item.roles || item.roles.length === 0) {
      return true;
    }

    return item.roles.includes(this.userRole);
  }

  /*
   * =========================================================
   * SUBMENU TOGGLE
   * =========================================================
   */

  toggleSubMenu(item: AdminMenuItem): void {
    if (!item.children?.length) {
      return;
    }

    /*
     * If sidebar is collapsed, first expand the sidebar.
     * You can remove this behaviour if you don't want it.
     */
    if (this.collapsed) {
      return;
    }

    if (this.expandedMenu === item.label) {
      this.expandedMenu = null;
    } else {
      this.expandedMenu = item.label;
    }
  }

  /*
   * =========================================================
   * CLOSE MENU
   * =========================================================
   */

  closeMenu(): void {
    this.menuItemClicked.emit();
  }
}
