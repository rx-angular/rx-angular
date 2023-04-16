import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
  selector: 'app-error-handling',
  template: `
    <p class="text-dark dark:text-white min-h-[300px]">
        Not written yet.

        <br><br>
        More info on this realease: 
        <a href="https://github.com/eneajaho/ngx-isr/releases/tag/v0.2.0" target="_blank" class="text-main-100">
          v.0.2.0
        </a>

        or in this commit:
        <a href="https://github.com/eneajaho/ngx-isr/commit/3be09593dcc7d1b266deb8fdfb9613a051351351" target="_blank" class="text-main-100">
          3be0959
        </a>
    </p>
  `,
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ErrorHandlingComponent {
  constructor() { 
    configurePage(PAGE_IDS.errorHandling);
  }
}
