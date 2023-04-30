import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';
import { HttpClient } from '@angular/common/http';
import { JsonPipe, NgOptimizedImage } from '@angular/common';
import { DocsPageSectionComponent } from '../layout/docs-page-section.component';
import { HighlightModule } from 'ngx-highlightjs';
import { AlertWarningComponent } from '../components/alert-warning.component';
import { AlerSuccessComponent } from '../components/alert-success.component';

@Component({
  selector: 'app-error-handling',
  template: `
    <docs-page-section title="How it works?">
      Errors are a part of web development. They can happen at any time, and they can be caused by a
      variety of factors. When an error occurs, it's important to handle it appropriately to ensure
      that your site remains accessible and functional. ISR has a feature that allows you to handle
      errors during the regeneration or caching of your pages.

      <br /><br />
      By default, when an <b>http error</b> occurs during the server-rendering of a page, we don't
      cache the page but fall back to client-side rendering, because it probably will have error
      messages or other content that is not intended to be cached. <br /><br />
    </docs-page-section>

    <docs-page-section title="Configure error handling">
      To configure error handling, you can use the <b>skipCachingOnHttpError</b> flag in the ISR
      configuration. By default, this flag is set to <b>true</b>.

      <br /><br />
      In order to enable caching of pages with http errors, you should set this flag to
      <b>false</b>.

      <pre>
        <code
          class="!m-0 !p-0 bg-gray-900"
          [highlight]="enableCachingOnHttpErrorCode"
          [languages]="['typescript']"
          [lineNumbers]="true">
        </code>
      </pre>

      <app-alert-warning>
        <span title>Warning!</span>
        <span description class="text-base">
          Be aware that this may cause some issues with your site. And you should handle these
          errors appropriately to ensure that your site remains accessible and functional.
        </span>
      </app-alert-warning>

      <br /><br />

      In, order to see if the page has an error, you can check the errors property in the generated
      html. Here's an example of a page with an error: <br />
      <br />
      <img src="assets/images/errors-in-html.png" alt="ISR state of a page with an error" />
    </docs-page-section>

    <docs-page-section title="Handle other errors">
      You can also handle other errors that are not http errors. For example, if you have a posts
      page, but with no content, you can add an error the <b>errors</b> of the ISR state.
      <br /><br />

      In order to do that, you can use the <b>addError</b> method of the <b>NgxIsrService</b>.
      <br />

      <pre>
        <code
          class="!m-0 !p-0 bg-gray-900"
          [highlight]="addErrorCode"
          [languages]="['typescript']"
          [lineNumbers]="true">
        </code>
      </pre>

      So, if we have a page with no posts, by adding the error to the <b>errors</b> property, we
      will be able to skip the caching of the page and fall back to client-side rendering.

      <br /><br />

      <app-alert-success>
        <span title> Benefits: </span>
        <span description class="text-base">
          You can use this feature to handle errors, or you can use it only to skip caching of
          pages.
        </span>
      </app-alert-success>
    </docs-page-section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    JsonPipe,
    HighlightModule,
    AlertWarningComponent,
    DocsPageSectionComponent,
    NgOptimizedImage,
    AlerSuccessComponent,
  ],
})
export default class ErrorHandlingComponent {
  // isrService = inject(NgxIsrService);
  http = inject(HttpClient);

  // hasErrorInQueryParam = inject(ActivatedRoute).snapshot.queryParamMap.has('withError');

  // data = {};

  constructor() {
    configurePage(PAGE_IDS.errorHandling);

    // this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
    //   if (this.hasErrorInQueryParam) {
    //     const error = {
    //       name: 'This is an error',
    //       message: 'This is an error message',
    //       stack: 'This is an error stack',
    //     };
    //     this.isrService.addError(error);
    //   }

    //   this.data = data;
    // });
  }

  enableCachingOnHttpErrorCode = `
    const isr = new ISRHandler({
      // other options
      skipCachingOnHttpError: false
    });
  `;

  addErrorCode = `
  import { NgxIsrService } from 'ngx-isr/browser';

  @Component({})
  export class PostSComponent {
    private isrService = inject(NgxIsrService);

    loadPosts() {
      this.otherService.getPosts().subscribe({
        next: (posts) => {
          if (posts.length === 0) {
            this.isrService.addError({
              name: 'No posts',
              message: 'There are no posts to show',
            } as Error);
          }

          // other logic
        }
      });
    }
  }
  `;
}
