import { Component } from '@angular/core';
import { Bannercomponent } from '../components/home/bannercomponent/bannercomponent';

@Component({
  selector: 'app-homecomponent',
  standalone: true,
  imports: [Bannercomponent],
  templateUrl: './homecomponent.html',
  styleUrl: './homecomponent.scss',
})
export class Homecomponent {}
