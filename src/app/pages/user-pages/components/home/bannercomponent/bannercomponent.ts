import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { interval, Subscription } from 'rxjs';
import { HomeBannerService } from '../../../../../services/user/home-banner.service';
import { environment } from '../../../../../../environment/environment';
import { IBanner } from '../../../../../core/models/user/home-banner.model';

@Component({
  selector: 'app-bannercomponent',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './bannercomponent.html',
  styleUrl: './bannercomponent.scss',
})
export class Bannercomponent implements OnInit, OnDestroy {
  banners = signal<IBanner[]>([]);
  currentIndex = signal(0);
  autoplaySub!: Subscription;
  apiUrl = environment.base;
  constructor(private bannerService: HomeBannerService) {}

  ngOnInit(): void {
    this.bannerService.getBanners().subscribe({
      next: (data) => {
        const enabled = data.filter(b => b.is_enable);
        this.banners.set(enabled);

        if (enabled.length > 1) {
          this.autoplaySub = interval(5000).subscribe(() => this.next());
        }
      },
      error: (err) => console.error(err)
    });
  }

  ngOnDestroy(): void {
    this.autoplaySub?.unsubscribe();
  }

  next(): void {
    const len = this.banners().length;
    if (!len) return;
    this.currentIndex.set((this.currentIndex() + 1) % len);
  }

  prev(): void {
    const len = this.banners().length;
    if (!len) return;
    this.currentIndex.set((this.currentIndex() - 1 + len) % len);
  }

  getTransform(): string {
    return `translateX(-${this.currentIndex() * 100}%)`;
  }

  redirect(banner: IBanner): void {
    if (banner.redirectUrl && banner.redirectUrl !== '#') {
      window.open(banner.redirectUrl, '_blank');
    }
  }
}