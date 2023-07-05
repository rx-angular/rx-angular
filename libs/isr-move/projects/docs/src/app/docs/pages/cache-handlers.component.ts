import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
  selector: 'app-cache-handlers',
  template: `
    <p class="text-dark dark:text-white min-h-[300px]">
        Not written yet.

        <br><br>
        More info on how the cache handlers are pluggable: 
        <a href="https://github.com/eneajaho/ngx-isr/commit/57965b4135d1ca0b10fc06113c5252a29cbfbb0d" target="_blank" class="text-main-100">
          57965b4
        </a>

        or checkout this issue about many urls in cache handler:
        <a href="https://github.com/eneajaho/ngx-isr/issues/26" target="_blank" class="text-main-100">
          #26
        </a>
    </p>
  `,
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CacheHandlersComponent {
  constructor() { 
    configurePage(PAGE_IDS.cacheHandlers);
  }
}
