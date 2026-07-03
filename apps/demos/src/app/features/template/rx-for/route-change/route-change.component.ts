import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { RxLet } from '@rx-angular/template/let';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { DocsLinkComponent } from '../../../../shared/docs-link';

@Component({
  selector: 'rxa-route-change',
  standalone: true,
  imports: [
    FormsModule,
    MatTabsModule,
    RouterLink,
    RouterOutlet,
    RxLet,
    DocsLinkComponent,
  ],
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>Route Change</h2>
        <p class="rxa-demo-subtitle">
          Observe rendering behaviour when navigating between routed
          <code>*ngFor</code> and <code>*rxFor</code> lists.
        </p>
      </div>
      <rxa-docs-link
        docs="packages/template/reference/rx-for"
        source="apps/demos/src/app/features/template/rx-for"
      />
    </header>
    <div class="rxa-demo-toolbar">
      <section class="rxa-demo-group">
        <span class="rxa-demo-label">Item count</span>
        <input
          class="rxa-demo-input"
          [(ngModel)]="items"
          (blur)="onInputBlur()"
        />
      </section>
      <section class="rxa-demo-group">
        <span class="rxa-demo-label">Route</span>
        <nav
          mat-tab-nav-bar
          [tabPanel]="tabPanel"
          *rxLet="activeRoute$; let activeRoute; patchZone: true"
        >
          <a
            mat-tab-link
            [active]="
              activeRoute.indexOf('native') === -1 &&
              activeRoute.indexOf('rx-for') === -1
            "
            [routerLink]="'./'"
          >
            empty
          </a>
          <a
            mat-tab-link
            [routerLink]="['native', { count: items }]"
            [active]="activeRoute.indexOf('native') !== -1"
          >
            native
          </a>
          <a
            mat-tab-link
            [routerLink]="['rx-for', { count: items }]"
            [active]="activeRoute.indexOf('rx-for') !== -1"
          >
            concurrent
          </a>
        </nav>
      </section>
    </div>
    <mat-tab-nav-panel #tabPanel>
      <router-outlet></router-outlet>
    </mat-tab-nav-panel>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        height: 100%;
        max-height: 100%;
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteChangeComponent {
  private router = inject(Router);
  private activeRoute = inject(ActivatedRoute);

  readonly activeRoute$ = this.router.events.pipe(
    filter((e) => e instanceof NavigationEnd),
    map((e: NavigationEnd) => e.urlAfterRedirects),
    startWith(this.router.url),
    map((url) => url.split('/').pop()),
    tap(console.log),
  );

  items = 1000;

  onInputBlur(): void {
    const url = this.router.url.split('/').pop();
    if (url.indexOf('native') !== -1) {
      this.router.navigate(['./native', { count: this.items }], {
        relativeTo: this.activeRoute,
      });
    } else if (url.indexOf('rx-for') !== -1) {
      this.router.navigate(['./rx-for', { count: this.items }], {
        relativeTo: this.activeRoute,
      });
    }
  }
}
