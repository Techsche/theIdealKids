import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-top-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule],
  templateUrl: './top-header.html',
  styleUrl: './top-header.scss',
})
export class TopHeader {
   taxNumber : string = '45-2877692'
}
