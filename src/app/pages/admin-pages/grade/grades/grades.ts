import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-grades',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './grades.html',
  styleUrl: './grades.scss',
})
export class Grades {
  searchText: string = '';

  filteredGrades: any[] | [] = [];

  loading = signal(true)

  onSearch() {}

  sortBy(data:any){}
  getSortIcon(data:any){}

  editGrade(grade:any) {}
  deleteGrade(grade:any) {}
}
