import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { DocsPageSectionComponent } from '../layout/docs-page-section.component';
import { DocsPaginationComponent } from "../layout/docs-paginations.component";
import { DocsLayoutService, PAGE_IDS, configurePage } from '../services/docs-layout.service';

@Component({
    selector: 'app-intro',
    template: `
    <docs-page-section title="Welcome to the ngx-isr documentation 🙌. !">
      This library helps manage caching of server side
      pages rendered with Angular Universal. 
      <br>
      It provides an easy way to cache pages on the server
      side and to invalidate the cache when needed.
    </docs-page-section>
    <docs-page-section title="Why?">
      <b>Angular Universal</b> pacakge doesn't currently provide any API to pass route data or information
      directly to the server-side rendering pipeline.
      <br><br>
      With <b>ngx-isr</b> we provide this functionality by doing some <b><i>tricks under the hood</i></b> ⚡️.
    </docs-page-section>
    <docs-page-section title="How?">
      The moment we register the providers using the <b>NgxIsrModule.forRoot()</b> or the <b>provideISR()</b>
      function, the NgxIsrService will start to listen to route changes on the server-side. 
      <br><br>
      The moment the route is set and won't change anymore, 
      we grab the route data and attach them in the HTML as JSON. 
      <br><br>
      Then, the moment the server-side rendering is about to finish, we read the rendered html and grab the
      route data from it using regex. We parse the JSON, and now we now if we need to cache the page
      or not. If we need to cache the page, we save it in the cache and serve it to the user. If we
      don’t need to cache the page, we just serve it to the user.
    </docs-page-section>
    <docs-page-section title="What’s next?">
      Learn more about ISR and how to use it in Angular.

      <br><br>

    </docs-page-section>
  `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [DocsPageSectionComponent, DocsPaginationComponent]
})
export default class IntroComponent {
  constructor() { 
    configurePage(PAGE_IDS.intro);
  }
}
