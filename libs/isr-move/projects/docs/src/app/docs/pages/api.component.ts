import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
  selector: 'app-api',
  template: `
    <p class="text-dark dark:text-white min-h-[300px]">
        Not written yet.
    </p>
  `,
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ApiComponent {
  constructor() { 
    configurePage(PAGE_IDS.api);
  }
}
