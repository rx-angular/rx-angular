import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/static" routerLinkActive="active">Static</a>
      <a routerLink="/dynamic/1" routerLinkActive="active">Page 1</a>
      <a routerLink="/dynamic/2" routerLinkActive="active">Page 2</a>
      <a routerLink="/dynamic/3" routerLinkActive="active">Page 3</a>
    </nav>

    <button (click)="revalidate('/dynamic/1')">Revalidate 1</button>
    <button (click)="revalidate('/dynamic/2')">Revalidate 2</button>
    <button (click)="revalidate('/dynamic/3')">Revalidate 2</button>

    <div style="padding: 2em;">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  private http = inject(HttpClient);

  revalidate(pageUrl: string) {
    this.http
      .post('/api/invalidate', {
        token: 'MY_TOKEN',
        urlsToInvalidate: [pageUrl],
      })
      .subscribe((res) => {
        console.log('invalidate', res);
      });
  }
}
