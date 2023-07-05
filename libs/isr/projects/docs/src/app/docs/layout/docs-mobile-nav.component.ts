import { Component, inject } from '@angular/core';
import { DocsSidebarLinksComponent } from './docs-sidebar-links.component';
import { CommonModule } from '@angular/common';
import { DocsLayoutService } from '../services/docs-layout.service';

@Component({
  selector: 'app-docs-mobile-nav',
  template: `
    <div *ngIf="open$ | async" class="fixed inset-0 z-40 flex lg:hidden" aria-modal="true">
      <div
        class="fixed inset-0 bg-gray-600 bg-opacity-75"
        (click)="layout.toggleMobileMenu()"
        aria-hidden="true"></div>

      <div class="relative flex flex-col flex-1 w-full max-w-xs bg-white dark:bg-pearl">
        <div *ngIf="open$ | async" class="absolute top-0 right-0 pt-2 -mr-12">
          <button
            type="button"
            class="flex items-center justify-center w-10 h-10 ml-1 rounded-full  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            (click)="layout.toggleMobileMenu()">
            <span class="sr-only">Close sidebar</span>
            <svg
              class="w-6 h-6 text-white"
              x-description="Heroicon name: outline/x"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4 text-comet dark:text-white">
            <a href="./index.html">
              <img class="w-auto h-8" src="assets/logo.svg" alt="Logo" />
            </a>
          </div>
          <nav class="px-2 mt-5 space-y-1">
            <app-docs-sidebar-links (itemClicked)="layout.toggleMobileMenu(false)">
            </app-docs-sidebar-links>
          </nav>
        </div>
        <div class="flex flex-shrink-0 p-4 pl-12 border-t  border-smoke dark:border-tuna">
          <a href="https://ko-fi.com/A0A5KJQS4" target="_blank"
            ><img
              height="36"
              style="border:0px;height:36px;"
              src="https://storage.ko-fi.com/cdn/kofi1.png?v=3"
              border="0"
              alt="Buy Me a Coffee at ko-fi.com"
          /></a>
        </div>
      </div>

      <div class="flex-shrink-0 w-14">
        <!-- Force sidebar to shrink to fit close icon -->
      </div>
    </div>
  `,
  standalone: true,
  imports: [DocsSidebarLinksComponent, CommonModule],
})
export class DocsMobileNavComponent {
  layout = inject(DocsLayoutService);

  open$ = this.layout.mobileMenuOpen$;
}
