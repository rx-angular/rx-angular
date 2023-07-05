import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
  selector: 'app-modify-html-hooks',
  template: `
    <p class="text-dark dark:text-white min-h-[300px]">
        Not written yet.

        <br><br>
        More info on this PR: 
        <a href="https://github.com/eneajaho/ngx-isr/pull/31" target="_blank" class="text-main-100">
          #31
        </a>

    </p>
  `,
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ModifyHtmlHooksComponent {
  constructor() { 
    configurePage(PAGE_IDS.modifyHtmlCacheHooks);
  }
}
