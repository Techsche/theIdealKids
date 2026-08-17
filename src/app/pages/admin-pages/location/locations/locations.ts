import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ILocation } from '../../../../core/models/user/location.model';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locations.html',
  styleUrl: './locations.scss',
})
export class Locations {
  searchText: string = '';
  totalLocations: number = 0;
  loading = signal(true);

  filteredLocations: ILocation[] | [] = [];

  sortBy(data: any) {}

  getSortIcon(data: any) {}


  editLocation(location: ILocation) {}
  deleteLocation(location: ILocation) {}

  onSearch() {}
}
