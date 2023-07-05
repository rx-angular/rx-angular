import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsLayoutService } from '../services/docs-layout.service';

@Component({
  selector: 'app-not-found',
  template: `
    <main class="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
      <div class="text-center">
        <p class="text-base font-semibold text-black dark:text-white">404</p>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-black dark:text-white sm:text-5xl">
          The page you’re looking for doesn’t exist or hasn’t been created yet.
        </h1>
        <p class="mt-6 text-base leading-7 text-black dark:text-white">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <a
            routerLink="/docs"
            class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Go back home</a
          >
        </div>
      </div>
    </main>
  `,
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class NotFoundComponent implements OnInit {
  docLayout = inject(DocsLayoutService);

  ngOnInit() {
    this.docLayout.setTitle('Not found');
    this.docLayout.setPagination({ show: false });
  }
}
