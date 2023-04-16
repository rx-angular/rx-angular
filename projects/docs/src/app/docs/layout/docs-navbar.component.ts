import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DocsLayoutService } from '../services/docs-layout.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-docs-navbar',
  template: `
    <nav class="mx-auto bg-white border-b dark:bg-gun dark:border-gun border-smoke">
      <div class="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div class="flex justify-between h-16">
          <div
            class="flex  justify-between items-center  flex-1 px-2 space-x-8  lg:ml-6 lg:justify-end">
            <button
              type="button"
              class="
      -ml-0.5
      -mt-0.5
      h-12
      w-12
      inline-flex
      items-center
      justify-center
      rounded-md
      text-gray-500
      hover:text-gray-900
      md:hidden
      focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500
    "
              (click)="layout.toggleMobileMenu()">
              <span class="sr-only">Open sidebar</span>
              <svg
                class="w-6 h-6"
                x-description="Heroicon name: outline/menu"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <a routerLink="/docs" class="md:hidden !m-auto">
              <img src="assets/logo.svg" alt="logo" class="w-8 h-8" />
            </a>
            <button
              (click)="layout.toggleDarkMode()"
              id="dark-mode-toggle"
              class="text-pearl dark:text-white text-xl">
              <span *ngIf="layout.darkMode$ | async">☀️</span>
              <span *ngIf="(layout.darkMode$ | async) === false">🌙</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  `,
  standalone: true,
  imports: [NgIf, AsyncPipe, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsNavbarComponent {
  layout = inject(DocsLayoutService);
}
