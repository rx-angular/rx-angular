import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DocsLayoutService } from '../services/docs-layout.service';
import { DocsDesktopNavComponent } from './docs-desktop-nav.component';
import { DocsFooterComponent } from "./docs-footer.component";
import { DocsMobileNavComponent } from './docs-mobile-nav.component';
import { DocsNavbarComponent } from './docs-navbar.component';
import { DocsPageLayoutComponent } from "./docs-page-layout.component";
import { DocsPaginationComponent } from "./docs-paginations.component";
import { DocsScrollTopComponent } from './docs-scroll-top.component';

@Component({
    selector: 'app-docs-layout',
    template: `
    <div
      class="h-full mx-auto bg-white 2xl:max-w-7xl dark:bg-tuna"
      [class.dark]="layout.darkMode$ | async">
      <div class="min-h-[640px] bg-white dark:bg-tuna">
        <div>
          <app-docs-desktop-nav></app-docs-desktop-nav>
          <div class="relative z-0 flex flex-1 overflow-hidden">
            <div class="relative z-0 flex-1 overflow-y-auto focus:outline-none lg:pl-72">
              <app-docs-navbar></app-docs-navbar>
              <app-docs-mobile-nav></app-docs-mobile-nav>
              <app-docs-page-layout>
                <router-outlet></router-outlet>
              </app-docs-page-layout>

              <app-docs-pagination></app-docs-pagination>
              <app-docs-footer></app-docs-footer>

            </div>
          </div>
        </div>
      </div>
      <app-docs-scroll-top></app-docs-scroll-top>
    </div>
  `,
    standalone: true,
    imports: [
        RouterOutlet,
        RouterLink,
        AsyncPipe,
        DocsDesktopNavComponent,
        DocsNavbarComponent,
        DocsMobileNavComponent,
        DocsScrollTopComponent,
        DocsPageLayoutComponent,
        DocsPaginationComponent,
        DocsFooterComponent
    ],
})
export default class DocsLayoutComponent {
  layout = inject(DocsLayoutService);
}
