import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
  selector: 'app-on-demand-revalidation',
  template: `
    <p class="text-dark dark:text-white min-h-[300px]">
        Not written yet.

        <br><br>
        Read this release data for changes in the on demand revalidation feature: 
        <a href="https://github.com/eneajaho/ngx-isr/releases/tag/v.0.5.0" target="_blank" class="text-main-100">
          v.0.5.0
        </a>
    </p>
  `,
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OnDemandRevalidationComponent {
  constructor() { 
    configurePage(PAGE_IDS.onDemandRevalidation);
  }
}
