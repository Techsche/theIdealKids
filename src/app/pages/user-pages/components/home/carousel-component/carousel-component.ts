import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  signal,
  afterNextRender,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CarouselItem {
  image: string;
  title?: string;
  redirectUrl?: string;
  data?: unknown;
}

@Component({
  selector: 'app-carousel-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel-component.html',
  styleUrl: './carousel-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CarouselComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() items: CarouselItem[] = [];
  @Input() autoPlay = true;
  @Input() delay = 4000;
  @Input() showDots = true;
  @Input() showArrows = true;
  @Input() pauseOnHover = true;
  @Input() infinite = true;
  @Input() animation: 'slide' | 'fade' = 'slide';

  @Output() itemClick = new EventEmitter<CarouselItem>();

  @ViewChild('track')
  track?: ElementRef<HTMLDivElement>;

  currentIndex = signal(0);
  hovered = signal(false);

  private timer?: ReturnType<typeof setInterval>;
  private touchStartX = 0;
  private touchEndX = 0;

  ngAfterViewInit(): void {
    afterNextRender(() => {
      this.updateTransform();

      if (this.autoPlay) {
        this.startAutoplay();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.currentIndex.set(0);

      afterNextRender(() => {
        this.updateTransform();

        if (this.autoPlay) {
          this.restartAutoplay();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  /* ------------------------------------ */
  /* Autoplay                             */
  /* ------------------------------------ */

  private startAutoplay(): void {
    if (!this.autoPlay || this.items.length <= 1) {
      return;
    }

    this.stopAutoplay();

    this.timer = setInterval(() => {
      if (this.pauseOnHover && this.hovered()) {
        return;
      }

      this.next(false);
    }, this.delay);
  }

  private stopAutoplay(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
  }

  private restartAutoplay(): void {
    this.stopAutoplay();
    this.startAutoplay();
  }

  /* ------------------------------------ */
  /* Navigation                           */
  /* ------------------------------------ */

  next(restart = true): void {
    if (!this.items.length) return;

    if (this.currentIndex() >= this.items.length - 1) {
      if (this.infinite) {
        this.currentIndex.set(0);
      }
    } else {
      this.currentIndex.update((v) => v + 1);
    }

    this.updateTransform();

    if (restart) {
      this.restartAutoplay();
    }
  }

  previous(restart = true): void {
    if (!this.items.length) return;

    if (this.currentIndex() <= 0) {
      if (this.infinite) {
        this.currentIndex.set(this.items.length - 1);
      }
    } else {
      this.currentIndex.update((v) => v - 1);
    }

    this.updateTransform();

    if (restart) {
      this.restartAutoplay();
    }
  }

  goTo(index: number): void {
    this.currentIndex.set(index);
    this.updateTransform();
    this.restartAutoplay();
  }

  click(item: CarouselItem): void {
    this.itemClick.emit(item);
  }

  private updateTransform(): void {
    if (!this.track?.nativeElement) {
      return;
    }

    if (this.animation === 'slide') {
      this.track.nativeElement.style.transform = `translate3d(-${this.currentIndex() * 100}%,0,0)`;
    }
  }

  mouseEnter(): void {
    this.hovered.set(true);
  }

  mouseLeave(): void {
    this.hovered.set(false);
  }

  touchStart(event: TouchEvent): void {
    this.touchStartX = event.changedTouches[0].clientX;
  }

  touchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;

    const distance = this.touchStartX - this.touchEndX;

    if (Math.abs(distance) < 40) {
      return;
    }

    distance > 0 ? this.next() : this.previous();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent): void {
    if (event.key === 'ArrowRight') {
      this.next();
    }

    if (event.key === 'ArrowLeft') {
      this.previous();
    }
  }
}
