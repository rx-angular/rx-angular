import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'docs-page-section',
  template: `
    <div [attr.id]="title">
      <h2
        *ngIf="title"
        class="text-2xl font-normal text-comet dark:text-manatee hover:text-main group mt-4">
        <!-- <a href="#{{ title }}"> -->
        <a
          class="inline-flex items-center gap-2 text-comet dark:text-manatee dark:hover:text-main-100;">
          {{ title }}
          <!-- <svg
            class="hidden w-6 h-6 group-hover:block"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M17.657 14.828l-1.414-1.414L17.657 12A4 4 0 1 0 12 6.343l-1.414 1.414-1.414-1.414 1.414-1.414a6 6 0 0 1 8.485 8.485l-1.414 1.414zm-2.829 2.829l-1.414 1.414a6 6 0 1 1-8.485-8.485l1.414-1.414 1.414 1.414L6.343 12A4 4 0 1 0 12 17.657l1.414-1.414 1.414 1.414zm0-9.9l1.415 1.415-7.071 7.07-1.415-1.414 7.071-7.07z" />
          </svg> -->
        </a>
      </h2>
      <p class="text-base font-light text-waterloo mt-6 dark:text-santa sm:text-lg md:text-xl;">
        <ng-content></ng-content>
      </p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsPageSectionComponent {
  @Input() title = '';
}
