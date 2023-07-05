import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
  selector: 'app-prerendering-isr',
  template: `
    <p class="text-dark dark:text-white min-h-[300px]">
        Not written yet.

        <br><br>
        This page is about the pre-rendering and incremental static regeneration features.

        <br><br>

        It was released in this release: 
        <a href="https://github.com/eneajaho/ngx-isr/releases/tag/v.0.3.1" target="_blank" class="text-main-100">
          v.0.3.1
        </a>
    </p>
  `,
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PrerenderingIsrComponent {
  constructor() { 
    configurePage(PAGE_IDS.preRenderingAndIsr);
  }
}
