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
      label: 'User Management',
      icon: 'how_to_reg',
      children: [
        {
          label: 'Admin Users',
          icon: 'list_alt',
          route: '/admin/user-management/users',
        },
        {
          label: 'Create Admin User',
          icon: 'list_alt',
          route: '',
        },
        {
          label: 'Signed Up Users',
          icon: 'pending_actions',
          route: '/admin/user-management/signedup-users',
        },
        {
          label: 'Merge Users',
          icon: 'pending_actions',
          route: '',
        },
      ],
    },
    {
      label: 'Location',
      icon: 'event',
      children: [
        {
          label: 'Locations',
          icon: 'event',
          route: '/admin/location/locations',
        },
        {
          label: 'Add Location',
          icon: 'add_circle',
          route: '',
        },
      ],
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
        // {
        //   label: 'Upcoming Events',
        //   icon: 'event_available',
        //   route: '/admin/events/upcoming',
        // },
        // {
        //   label: 'Past Events',
        //   icon: 'history',
        //   route: '/admin/events/past',
        // },
      ],
    },

    {
      label: 'Volunteers',
      icon: 'volunteer_activism',
      children: [
        {
          label: 'High School Volunteers',
          icon: 'groups',
          route: '/admin/volunteers/high-school-volunteers',
        },
        {
          label: 'Volunteer Categories',
          icon: 'category',
          route: '/admin/volunteers/categories',
        },
        {
          label: 'Add Volunteer Categories',
          icon: 'category',
          route: '/admin/volunteers/add-category',
        },
      ],
    },

    {
      label: 'Grades',
      icon: 'assessment',
      children: [
        {
          label: 'Add Grade',
          icon: 'description',
          route: '/admin/grade/add-grade',
        },
        {
          label: 'Grades',
          icon: 'fact_check',
          route: '/admin/grade/grades',
        },
      ],
    },

    {
      label: 'Competitions',
      icon: 'emoji_events',
      children: [
        {
          label: 'Add Competition',
          icon: 'add_circle',
          route: '/admin/competitions/add',
        },
        {
          label: 'Competitions',
          icon: 'emoji_events',
          route: '/admin/competitions',
        },
      ],
    },

    {
      label: 'Coachings',
      icon: 'child_care',
      children: [
        {
          label: 'Add Coaching',
          icon: 'person_add',
          route: '/admin/children/add',
        },
        {
          label: 'Coachings',
          icon: 'groups',
          route: '/admin/children',
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
        {
          label: 'Email',
          icon: 'lock',
          route: '/admin/settings/change-password',
        },
        {
          label: 'Static Pages',
          icon: 'lock',
          route: '/admin/settings/change-password',
        },
        {
          label: 'Certificate',
          icon: 'lock',
          route: '/admin/settings/change-password',
        },
        {
          label: 'Logo',
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
