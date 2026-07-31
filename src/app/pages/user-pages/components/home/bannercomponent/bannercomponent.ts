import { Component, OnInit, signal } from '@angular/core';

import { HomeBannerService } from '../../../../../services/user/home-banner.service';
import { environment } from '../../../../../../environment/environment';
import { IBanner } from '../../../../../core/models/user/home-banner.model';
import { CarouselComponent, CarouselItem } from '../carousel-component/carousel-component';

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

  constructor(private bannerService: HomeBannerService) {}

  ngOnInit(): void {
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
