import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DocsSidebarLinksComponent } from './docs-sidebar-links.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-docs-desktop-nav',
  template: `
    <div
      class="z-50 hidden  bg-alabaster lg:flex md:w-72 md:flex-col md:fixed md:inset-y-0 dark:bg-cinder">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex flex-col flex-1 min-h-0 border-r border-smoke dark:border-gun">
        <div class="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto lg:pl-6">
          <div class="flex items-center flex-shrink-0 px-4 text-comet dark:text-white">
            <a
              routerLink="/"
              class="flex items-center w-100 transition-colors text-main hover:text-main-900">
              <img src="assets/logo.svg" class="h-16 w-16" alt="Logo" />
              <span class="ml-4 text-2xl font-bold min-w-[100px]">ngx-isr</span>
            </a>
          </div>
          <nav class="flex-1 mt-12">
            <app-docs-sidebar-links></app-docs-sidebar-links>
          </nav>
        </div>
        <div
          class="flex justify-center flex-shrink-0 p-2 border-t lg:p-6 border-smoke dark:border-gun">
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
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DocsSidebarLinksComponent, RouterLink],
})
export class DocsDesktopNavComponent {}
