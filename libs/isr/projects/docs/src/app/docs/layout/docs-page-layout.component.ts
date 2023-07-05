import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DocsLayoutService } from '../services/docs-layout.service';
import { CommonModule } from '@angular/common';
import { DocsPageSectionComponent } from './docs-page-section.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-docs-page-layout',
  template: `
    <div class="flex-1 mx-auto">
      <section
        class="
              mx-auto
              bg-white
              border-b
              dark:bg-tuna
              border-main
              max-w-7xl
              dark:border-gun
            ">
        <div class="px-4 mx-auto max-w-7xl sm:px-6 md:px-32 pt-10">
          <h1
            class="py-10 mx-auto text-4xl font-light leading-none text-comet dark:text-manatee lg:text-5xl">
            {{ docsPageLayout.mainTitle$ | async }}
          </h1>
        </div>
      </section>
      <section class="pt-6 pb-24 bg-white dark:bg-tuna">
        <div class="px-4 mx-auto sm:px-6 md:px-32">
          <section>
            <div class="max-w-3xl">
              <div class="mx-auto space-y-24 text-lg text-left">
                <ng-content></ng-content>
              </div>
            </div>
          </section>
        </div>
      </section>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, RouterOutlet, DocsPageSectionComponent],
})
export class DocsPageLayoutComponent {
  readonly docsPageLayout = inject(DocsLayoutService);
}
