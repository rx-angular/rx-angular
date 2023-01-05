import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { take } from 'rxjs';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-main-layout',
  template: `
    <app-header></app-header>
    <!-- <div>
      <button (click)="invalidate('/one')">Clear one</button>
      <button (click)="invalidate('/two')">Clear two</button>
      <button (click)="invalidate('/three')">Clear three</button>
      <button (click)="invalidate('/details/1')">Clear details</button>
    </div> -->
    <div class="mt-3">
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent],
})
export default class MainLayoutComponent {
  constructor(private http: HttpClient) {}

  invalidate(url: string): void {
    const path = `http://localhost:4200/api/invalidate?secret=MY_TOKEN&urlToInvalidate=${url}`;
    this.http
      .get(path)
      .pipe(take(1))
      .subscribe((res) => console.log(res));
  }
}
