import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type SortColumn =
  | 'name'
  | 'email'
  | 'mobile'
  | 'parentName'
  | 'parentEmail'
  | 'parentMobile'
  | 'role'
  | 'volunteerCategories'
  | 'areaOfExpertise';

type SortDirection = 'asc' | 'desc' | '';

@Component({
  selector: 'app-high-school-volunteers',
  standalone: true,

  imports: [CommonModule, FormsModule],
  templateUrl: './high-school-volunteers.html',
  styleUrl: './high-school-volunteers.scss',
})
export class HighSchoolVolunteers {
  volunteers: any[] | [] = [];

  filteredVolunteers: any[] | [] = [];

  loading = signal<boolean>(false);

  searchText = '';

  totalVolunteers = 0;

  selectedVolunteerIds = signal<number[]>([]);

  sortColumn = signal<SortColumn | ''>('');

  sortDirection = signal<SortDirection>('');

  onSearch(): void {
    this.applyFiltersAndSort();
  }

  applyFiltersAndSort(): void {
    let data = [...this.volunteers];

    /* -------------------------------------------------------
       SEARCH
    ------------------------------------------------------- */

    const search = this.searchText.trim().toLowerCase();

    if (search) {
      data = data.filter((volunteer) => {
        const categories = this.getCategoryNames(volunteer).toLowerCase();
        return;
        // return (
        //   this.getValue(volunteer.name).toLowerCase().includes(search) ||
        //   this.getValue(volunteer.email).toLowerCase().includes(search) ||
        //   this.getValue(volunteer.mobile).toLowerCase().includes(search) ||
        //   this.getValue(volunteer.parent_name_1).toLowerCase().includes(search) ||
        //   this.getValue(volunteer.parent_name_2).toLowerCase().includes(search) ||
        //   this.getValue(volunteer.parent_email_1).toLowerCase().includes(search) ||
        //   this.getValue(volunteer.parent_email_2).toLowerCase().includes(search) ||
        //   this.getValue(volunteer.parent_mobile_1).toLowerCase().includes(search) ||
        //   this.getValue(volunteer.parent_mobile_2).toLowerCase().includes(search) ||
        //   this.getValue(volunteer.role).toLowerCase().includes(search) ||
        //   categories.includes(search) ||
        //   this.getValue(volunteer.area_of_expertise).toLowerCase().includes(search)
        // );
      });
    }

    /* -------------------------------------------------------
       SORT
    ------------------------------------------------------- */

    const column = this.sortColumn();

    const direction = this.sortDirection();

    if (column && direction) {
      data.sort((a, b) => {
        const valueA = this.getSortValue(a, column);

        const valueB = this.getSortValue(b, column);

        if (valueA < valueB) {
          return direction === 'asc' ? -1 : 1;
        }

        if (valueA > valueB) {
          return direction === 'asc' ? 1 : -1;
        }

        return 0;
      });
    }

    this.filteredVolunteers = data;
  }

  /* =========================================================
     SORT
  ========================================================= */

  sortBy(column: SortColumn): void {
    const currentColumn = this.sortColumn();

    const currentDirection = this.sortDirection();

    if (currentColumn !== column) {
      this.sortColumn.set(column);

      this.sortDirection.set('asc');
    } else {
      if (currentDirection === 'asc') {
        this.sortDirection.set('desc');
      } else if (currentDirection === 'desc') {
        this.sortColumn.set('');

        this.sortDirection.set('');
      } else {
        this.sortDirection.set('asc');
      }
    }

    this.applyFiltersAndSort();
  }

  /* =========================================================
     SORT ICON
  ========================================================= */

  getSortIcon(column: SortColumn): string {
    if (this.sortColumn() !== column) {
      return 'unfold_more';
    }

    if (this.sortDirection() === 'asc') {
      return 'arrow_upward';
    }

    if (this.sortDirection() === 'desc') {
      return 'arrow_downward';
    }

    return 'unfold_more';
  }

  /* =========================================================
     SORT VALUE
  ========================================================= */

  private getSortValue(volunteer: any, column: SortColumn): string {
    switch (column) {
      case 'name':
        return this.getValue(volunteer.name).toLowerCase();

      case 'email':
        return this.getValue(volunteer.email).toLowerCase();

      case 'mobile':
        return this.getValue(volunteer.mobile).toLowerCase();

      case 'parentName':
        return (
          this.getValue(volunteer.parent_name_1) +
          ' ' +
          this.getValue(volunteer.parent_name_2)
        ).toLowerCase();

      case 'parentEmail':
        return (
          this.getValue(volunteer.parent_email_1) +
          ' ' +
          this.getValue(volunteer.parent_email_2)
        ).toLowerCase();

      case 'parentMobile':
        return (
          this.getValue(volunteer.parent_mobile_1) +
          ' ' +
          this.getValue(volunteer.parent_mobile_2)
        ).toLowerCase();

      case 'role':
        return this.getValue(volunteer.role).toLowerCase();

      case 'volunteerCategories':
        return this.getCategoryNames(volunteer).toLowerCase();

      case 'areaOfExpertise':
        return this.getValue(volunteer.area_of_expertise).toLowerCase();

      default:
        return '';
    }
  }

  /* =========================================================
     SAFE VALUE
  ========================================================= */

  private getValue(value: string | null | undefined): string {
    return value ?? '';
  }

  /* =========================================================
     CATEGORY NAMES
  ========================================================= */

  getCategoryNames(volunteer: any): string {
    if (!volunteer.volunteer_categories || volunteer.volunteer_categories.length === 0) {
      return '';
    }
    return '';
    // return volunteer.volunteer_categories
    //   .map((category) => {
    //     if (typeof category === 'string') {
    //       return category;
    //     }

    //     return category?.name ?? category?.category ?? '';
    //   })
    //   .filter(Boolean)
    //   .join(', ');
  }

  /* =========================================================
     SELECTION
  ========================================================= */

  toggleVolunteerSelection(volunteer: any): void {
    const current = [...this.selectedVolunteerIds()];

    const index = current.indexOf(volunteer.id);

    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(volunteer.id);
    }

    this.selectedVolunteerIds.set(current);
  }

  /* =========================================================
     SELECT ALL
  ========================================================= */

  toggleSelectAll(event: Event): void {
    // const checked = (event.target as HTMLInputElement).checked;
    // if (checked) {
    //   const ids = this.filteredVolunteers.map((volunteer) => volunteer?.id);
    //   this.selectedVolunteerIds.set(ids);
    // } else {
    //   this.selectedVolunteerIds.set([]);
    // }
  }

  /* =========================================================
     ALL SELECTED
  ========================================================= */

  isAllSelected(): boolean {
    return true;
    // const volunteers = this.filteredVolunteers;

    // if (volunteers.length === 0) {
    //   return false;
    // }

    // return volunteers.every((volunteer) => this.selectedVolunteerIds().includes(volunteer.id));
  }

  /* =========================================================
     SOME SELECTED
  ========================================================= */

  isSomeSelected(): boolean {
    const selected = this.selectedVolunteerIds();

    const total = this.filteredVolunteers.length;

    return selected.length > 0 && selected.length < total;
  }

  /* =========================================================
     SEND EMAIL
  ========================================================= */

  sendEmailToVolunteers(): void {
    const selected = this.selectedVolunteerIds();

    if (selected.length === 0) {
      /*
       * No selection means email all
       * High School Volunteers.
       */

      console.log('Send email to all High School Volunteers');

      return;
    }

    console.log('Send email to selected volunteers:', selected);

    /*
     * Add your email navigation/API call here.
     */
  }

  /* =========================================================
     EDIT
  ========================================================= */

  editVolunteer(volunteer: any): void {}

  /* =========================================================
     DELETE
  ========================================================= */

  deleteVolunteer(volunteer: any): void {}

  /* =========================================================
     CLEAR SELECTION
  ========================================================= */

  clearSelection(): void {
    this.selectedVolunteerIds.set([]);
  }

  /* =========================================================
     REFRESH
  ========================================================= */

  refresh(): void {
    this.clearSelection();

    this.searchText = '';

    this.sortColumn.set('');

    this.sortDirection.set('');

    // this.loadVolunteers();
  }

  exportAllData() {}
  printAllData() {}
  exportSelectedData() {}
}
