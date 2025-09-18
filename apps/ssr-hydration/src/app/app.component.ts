import { Component } from '@angular/core';
import { HydrationDemo } from './hydration-demo';

@Component({
  imports: [HydrationDemo],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
