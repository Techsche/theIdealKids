import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-footer',
  standalone: true,
  templateUrl: './admin-footer.component.html',
  styleUrl: './admin-footer.component.scss',
})
export class AdminFooterComponent {

  readonly currentYear = new Date().getFullYear();

}