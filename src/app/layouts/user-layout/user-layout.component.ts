import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopHeader } from './top-header/top-header';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ColorStrip } from './color-strip/color-strip';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, TopHeader, Header, Footer, ColorStrip],
  template: `
    <!-- Header -->
    <app-top-header></app-top-header>
    <app-header></app-header>
    <app-color-strip></app-color-strip>

    <router-outlet></router-outlet>

    <!-- Footer -->
    <app-color-strip></app-color-strip>
    <app-footer></app-footer>
  `,
})
export class UserLayoutComponent {}
