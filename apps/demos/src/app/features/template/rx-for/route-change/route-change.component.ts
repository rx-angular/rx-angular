import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'rxa-route-change',
  template: `
    <div class="d-flex">
      <input [(ngModel)]="items"
             (blur)="onInputBlur()">
      <nav mat-tab-nav-bar *rxLet="activeRoute$; let activeRoute; patchZone: true">
        <a mat-tab-link

           [active]="activeRoute.indexOf('native') === -1 && activeRoute.indexOf('rx-for') === -1"
           [routerLink]="'./'">
          empty
        </a>
        <a mat-tab-link
           [routerLink]="['native', { count: items}]"
           [active]="activeRoute.indexOf('native') !== -1">
          native
        </a>
        <a mat-tab-link
           [routerLink]="['rx-for', { count: items}]"
           [active]="activeRoute.indexOf('rx-for') !== -1">
          concurrent
        </a>
      </nav>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      height:100%;
      max-height: 100%;
      overflow: hidden;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteChangeComponent {

  readonly activeRoute$ = this.router.events.pipe(
    filter(e => e instanceof NavigationEnd),
    map((e: NavigationEnd) => e.urlAfterRedirects),
    startWith(this.router.url),
    map(url => url.split('/').pop()),
    tap(console.log)
  );

  items = 1000;

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  onInputBlur(): void {
    const url = this.router.url.split('/').pop();
    if (url.indexOf('native') !== -1) {
      this.router.navigate(['./native', { count: this.items}], { relativeTo: this.activeRoute});
    } else if (url.indexOf('rx-for') !== -1) {
      this.router.navigate(['./rx-for', { count: this.items}], { relativeTo: this.activeRoute});
    }
  }
}
