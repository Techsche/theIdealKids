import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.scss',
})
export class AdminHeaderComponent {

  @Input() sidebarCollapsed = false;

  @Output() menuToggle = new EventEmitter<void>();

  @Output() logoutClicked = new EventEmitter<void>();


  toggleMenu(): void {
    this.menuToggle.emit();
  }


  logout(): void {
    this.logoutClicked.emit();
  }


  toggleFullscreen(): void {

    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  }
}