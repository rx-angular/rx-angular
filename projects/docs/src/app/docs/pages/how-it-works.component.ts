import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DocsLayoutService, PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
  selector: 'app-how-it-works',
  template: `
    <p class="text-dark dark:text-white min-h-[300px]">
        Not written yet.

        <br><br>
        Read the blog post until this page is written:
        <a href="https://medium.com/itnext/incremental-static-regeneration-for-angular-42b0a8440e53" target="_blank" class="text-main-100">
          Incremental Static Regeneration for Angular
        </a>
    </p>
  `,
  standalone: true,
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HowItWorksComponent  {
  constructor() { 
    configurePage(PAGE_IDS.howItWorks);
  }
}
