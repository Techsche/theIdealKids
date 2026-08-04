import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { ToastrAlertService } from '../../../../services/common/toastr.services';
import { Children } from '../../../../core/models/user/children.model';
import { ChildrenService } from '../../../../services/user/children.service';
import { AlertService } from '../../../../services/common/alert.service';

@Component({
  selector: 'app-children-component',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './children-component.html',
  styleUrl: './children-component.scss',
})
export class ChildrenComponent implements OnInit {
  private readonly childrenService = inject(ChildrenService);

  private readonly toastrService = inject(ToastrAlertService);

  private readonly router = inject(Router);

  private alertService = inject(AlertService);

  loading = signal(true);

  searchText = '';

  children: Children[] = [];

  filteredChildren: Children[] = [];

  ngOnInit(): void {
    this.loadChildren();
  }

  loadChildren(): void {
    this.childrenService.getChildren().subscribe({
      next: (response) => {
        this.loading.set(false);

        this.children = response ?? [];
        this.filteredChildren = [...this.children];
      },

      error: () => {
        this.loading.set(false);

        this.children = [];
        this.filteredChildren = [];

        this.toastrService.error('Unable to load children.');
      },
    });
  }

  onSearch(): void {
    const keyword = this.searchText.trim().toLowerCase();

    if (!keyword) {
      this.filteredChildren = [...this.children];
      return;
    }

    this.filteredChildren = this.children.filter(
      (child) =>
        child.first_name.toLowerCase().includes(keyword) ||
        child.last_name.toLowerCase().includes(keyword) ||
        child.school.toLowerCase().includes(keyword) ||
        child.school_city.toLowerCase().includes(keyword) ||
        child.grade.toLowerCase().includes(keyword) ||
        child.grade_info?.name.toLowerCase().includes(keyword) ||
        child.gender.toLowerCase().includes(keyword),
    );
  }

  editChild(child: Children): void {
    this.router.navigate(['/child/edit', child.id]);
  }

  deleteChild(id: string): void {
    this.alertService
      .confirm('Are you sure you want to delete this child?', 'Confirm Deletion')
      .then((confirmed) => {
        if (confirmed) {
          this.performDeleteChild(id);
        }
      });
  }

  private performDeleteChild(id: string): void {
    this.childrenService.deleteChild(id).subscribe({
      next: () => {
        this.loadChildren();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
