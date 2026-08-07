import { Component, OnInit, signal, inject } from '@angular/core';

import { CarouselComponent, CarouselItem } from '../carousel-component/carousel-component';
import { environment } from '../../../../../../../environment/environment';
import { HomeBannerService } from '../../../../../../services/user/home-banner.service';

@Component({
  selector: 'app-bannercomponent',
  standalone: true,
  imports: [CarouselComponent],
  templateUrl: './bannercomponent.html',
  styleUrl: './bannercomponent.scss',
})
export class Bannercomponent implements OnInit {
  apiUrl = environment.base;

  carouselItems = signal<CarouselItem[]>([]);

  private bannerService = inject(HomeBannerService);

  ngOnInit(): void {
    this.getAllBanners();
  }

  getAllBanners() {
    this.bannerService.getBanners().subscribe({
      next: (data) => {
        const enabled = data.filter((x) => x.is_enable);

        this.carouselItems.set(
          enabled.map((b) => ({
            image: this.getImage(b.imagePath),

            title: b.text,

            redirectUrl: b.redirectUrl,

            data: b,
          })),
        );
      },

      error: console.error,
    });
  }

  getImage(path: string): string {
    if (!path) return '';

    if (path.startsWith('http')) {
      return path;
    }

    return this.apiUrl + path;
  }

  redirect(item: CarouselItem) {
    if (item.redirectUrl && item.redirectUrl !== '#') {
      window.open(item.redirectUrl, '_blank');
    }
  }
}
