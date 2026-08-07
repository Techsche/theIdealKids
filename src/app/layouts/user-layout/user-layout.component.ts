import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopHeader } from './top-header/top-header';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { ColorStrip } from './color-strip/color-strip';
import { EventMarquee } from './event-marquee/event-marquee';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [RouterOutlet, TopHeader, Header, Footer, ColorStrip, EventMarquee],
  template: `
    <!-- Header -->
    <app-top-header></app-top-header>
    <app-header></app-header>
    <app-event-marquee></app-event-marquee>
    <app-color-strip></app-color-strip>

    <router-outlet></router-outlet>

    <!-- Footer -->
    <app-color-strip></app-color-strip>
    <app-footer></app-footer>
  `,
})
export class UserLayoutComponent {}
