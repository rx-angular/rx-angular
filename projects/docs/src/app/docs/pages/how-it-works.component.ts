import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';
import { DocsPageSectionComponent } from '../layout/docs-page-section.component';

@Component({
  selector: 'app-how-it-works',
  template: `
    <docs-page-section title="">
      I talked about how it works in
      <a href="https://www.ng-ind.com/" class="text-main-100">ngIndia</a> conference. You can watch
      the talk here: <br />
      <a href="https://www.youtube.com/embed/gIqyTp36NJ0" target="_blank" class="text-main-100">
        👉 ng-India 2023 | Incremental Static Regeneration for Angular
      </a>

      <br /><br />

      Or, you can read the blog post here:
      <br />

      <a
        href="https://medium.com/itnext/incremental-static-regeneration-for-angular-42b0a8440e53"
        target="_blank"
        class="text-main-100">
        👉 Incremental Static Regeneration for Angular
      </a>
    </docs-page-section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DocsPageSectionComponent],
})
export default class HowItWorksComponent {
  constructor() {
    configurePage(PAGE_IDS.howItWorks);
  }
}
