import { Component, DestroyRef, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { HomeBannerService } from '../../../services/user/home-banner.service';
import { ToastrAlertService } from '../../../services/common/toastr.services';
import { AlertService } from '../../../services/common/alert.service';
import { environment } from '../../../../environment/environment.prod';
import { IBanner } from '../../../core/models/user/home-banner.model';

@Component({
  selector: 'app-banners',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './banners.html',
  styleUrl: './banners.scss',
})
export class Banners implements OnInit {
  private bannerService = inject(HomeBannerService);
  private destroyedRef = inject(DestroyRef);
  private platformId = inject(PLATFORM_ID);
  private toastr = inject(ToastrAlertService);
  private alertService = inject(AlertService);

  apiUrl = environment.base;

  loading = signal(true);

  banners: IBanner[] | [] = [];

  filteredBanners: IBanner[] | [] = [];

  searchText: string = '';

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadBanners();
    }
  }

  loadBanners() {
    this.bannerService
      .getAllBanners()
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe({
        next: (response) => {
          this.loading.set(false);
          this.banners = response.reverse();
          this.filteredBanners = [...this.banners];
        },
        error: () => {
          this.loading.set(false);
        },
      });
  }

  onSearch(): void {
    const search = this.searchText.trim().toLowerCase();

    if (!search) {
      this.filteredBanners = [...this.banners];

      return;
    }

    this.filteredBanners = this.banners.filter(
      (banner) =>
        banner.description?.toLowerCase().includes(search) ||
        banner.text?.toLowerCase().includes(search),
    );
  }

  toggleBanner(banner: IBanner): void {
    this.loading.set(true);
    banner.is_enable = !banner.is_enable;
    this.bannerService
      .updateBanner(banner.id, banner)
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe({
        next: (response: any) => {
          this.loading.set(false);
          if (response.success) {
            this.loadBanners();
          } else {
            this.toastr.error(response.message || 'Something went wrong!');
          }
        },
        error: () => {
          this.loading.set(false);
          this.toastr.error('Something went wrong!');
        },
      });
  }

  deleteBanner(banner: IBanner): void {
    this.alertService.confirm('Do you really want to delete this record?').then((result) => {
      if (result) {
        this.delete(banner.id);
      }
    });
  }

  delete(bannerId: string): void {
    this.loading.set(true);
    this.bannerService
      .deleteBanner(bannerId)
      .pipe(takeUntilDestroyed(this.destroyedRef))
      .subscribe({
        next: (response: any) => {
          this.loading.set(false);
          if (response.sucess) {
            this.loadBanners();
          } else {
            this.toastr.error(response.message || 'Something went wrong!');
          }
        },
        error: () => {
          this.loading.set(false);
          this.toastr.error('Something went wrong!');
        },
      });
  }
}
