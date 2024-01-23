import { Component } from '@angular/core';
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

    <div style="padding: 2em;">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  title = 'ssr-isr';
}
