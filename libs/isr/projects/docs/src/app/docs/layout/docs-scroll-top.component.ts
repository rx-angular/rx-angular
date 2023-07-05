import { ViewportScroller } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject } from '@angular/core';

@Component({
  selector: 'app-docs-scroll-top',
  template: `
    <div class="z-50">
      <a
        (click)="scrollTop()"
        aria-label="Back to top"
        class="
      fixed
      bottom-0
      right-0
      p-2
      mx-5
      my-5
      text-white
      rounded-full
      bg-main
      hover:bg-gray-700
      focus:outline-none
    ">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 18c4.42 0 8-3.58 8-8s-3.58-8-8-8-8 3.58-8 8 3.58 8 8 8zm1-8v4h-2v-4H8l4-4 4 4h-3z"
            fill="rgba(255,255,255,1)" />
        </svg>
      </a>
    </div>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocsScrollTopComponent {
  viewportScroller = inject(ViewportScroller);

  scrollTop() {
    this.viewportScroller.scrollToPosition([0, 0]);
  }
}
