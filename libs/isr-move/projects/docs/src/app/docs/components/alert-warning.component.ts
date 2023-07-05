import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-alert-warning',
  template: `
    <div
      class="
              rounded-xl
              border-pumpikin
              dark:bg-tuna dark:border-pumpikin
              p-4
              bg-white
              border
            ">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="
                    icon icon-tabler
                    text-warning
                    icon-tabler-alert-triangle
                    text-pumpikin
                  "
            width="20"
            height="20"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 9v2m0 4v.01"></path>
            <path
              d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"></path>
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-pumpikin text-base font-medium">
            <ng-content select="[title]"></ng-content>
          </h3>
          <div class="text-santa mt-2 text-sm">
            <p>
              <ng-content select="[description]"></ng-content>
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertWarningComponent {}
