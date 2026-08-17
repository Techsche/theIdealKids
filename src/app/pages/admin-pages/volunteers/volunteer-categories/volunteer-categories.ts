import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-volunteer-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volunteer-categories.html',
  styleUrl: './volunteer-categories.scss',
})
export class VolunteerCategories {
  searchText: string = '';
  totalCategories: number = 0;

  filteredCategories: any[] | [] = [];

  loading = signal(true);

  onSearch() {}

  sortBy(data: any) {}

  getSortIcon(data: any) {}


  editCategory(category:any){}
  deleteCategory(category:any){}
}
