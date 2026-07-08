import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HydrationDemo } from './hydration-demo';
import { VVHydrationDemo } from './vv-demo';

@Component({
  imports: [VVHydrationDemo, HydrationDemo],
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './app.component.scss',
})
export class AppComponent {}
