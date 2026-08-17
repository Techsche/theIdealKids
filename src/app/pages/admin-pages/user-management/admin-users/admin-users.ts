import { Component, inject, signal } from '@angular/core';
import { UserManagementService } from '../../../../services/user/user-management.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-users',
  standalone:true,
  imports: [FormsModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.scss',
})
export class AdminUsers {
  private userManagementService = inject(UserManagementService);
  filteredUsers: any[] | [] = [];

  loading = signal(true);
  searchText: string = '';

  onSearch() {}

  editUser(user: any) {}
  deleteUser(user: any) {}
}
