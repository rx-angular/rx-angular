import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
  selector: 'app-create-own-cache-handler',
  template: `
    <p class="text-dark dark:text-white min-h-[300px]">
        Not written yet.

        <br><br>
        More info on this realease: 
        <a href="https://github.com/eneajaho/ngx-isr/releases/tag/v0.2.0" target="_blank" class="text-main-100">
          v.0.2.0
        </a>

        or in this commit:
        <a href="https://github.com/eneajaho/ngx-isr/commit/83cf2532492592173b121b9e81637edb352d07d5" target="_blank" class="text-main-100">
          83cf253
        </a>
    </p>
  `,
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreateOwnCacheHandlerComponent {
  constructor() { 
    configurePage(PAGE_IDS.createYourOwnCacheHandler);
  }
}
