import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILocation } from '../../../../core/models/user/location.model';

/* =========================================================
   SORT FIELD
========================================================= */

type SortField =
  | 'name'
  | 'email'
  | 'secondaryName'
  | 'secondaryEmail'
  | 'mobile'
  | 'role'
  | 'createdAt'
  | 'lastLogin';

type SortDirection = 'asc' | 'desc' | '';

@Component({
  selector: 'app-signedup-users',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './signedup-users.html',
  styleUrl: './signedup-users.scss',
})
export class SignedupUsers {
  filteredUsers: any[] | [] = [];
  selectedUsers: any[] | [] = [];
  locations: ILocation[] | [] = [];
  isAllSelected = signal<boolean>(false);
  isSomeSelected = signal<boolean>(false);

  loading = signal(true);

  searchText: string = '';
  selectedLocation: any = '';

  totalUsers: number = 0;

  selectedUserIds = signal<number[]>([]);

  sortField = signal<SortField>('name');

  sortDirection = signal<SortDirection>('asc');

  isSelected(id: string) {}
  toggleUserSelection(user: any) {}

  toggleSelectAll(event: any) {}

  editUser(user: any) {}
  deleteUser(user: any) {}

  exportSelectedData() {}
  printAllData() {}

  exportAllData() {}

  onSearch(value?: string): void {
    if (value !== undefined) {
      this.searchText = value;
    }
  }

  onLocationChange(): void {
    // this.selectedLocation.set(value);
  }

  sortBy(field: SortField): void {
    if (this.sortField() === field) {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortField.set(field);

      this.sortDirection.set('asc');
    }
  }

  getSortIcon(field: SortField): string {
    if (this.sortField() !== field) {
      return 'unfold_more';
    }

    return this.sortDirection() === 'asc' ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }

  private getSortValue(user: any, field: SortField): string | number {
    switch (field) {
      case 'name':
        return (user.name ?? '').toLowerCase();

      case 'email':
        return (user.email ?? '').toLowerCase();

      case 'secondaryName':
        return (user.secondary_name ?? '').toLowerCase();

      case 'secondaryEmail':
        return (user.secondary_email ?? '').toLowerCase();

      case 'mobile':
        return (user.mobile ?? '').toLowerCase();

      case 'role':
        return (user.role ?? '').toLowerCase();

      case 'createdAt':
        return this.getDateValue(user.created_at ?? user.createdAt);

      case 'lastLogin':
        return this.getDateValue(user.last_login ?? user.lastLogin);

      default:
        return '';
    }
  }
  private getDateValue(value?: string): number {
    if (!value) {
      return 0;
    }

    const date = new Date(value).getTime();

    return Number.isNaN(date) ? 0 : date;
  }
}
