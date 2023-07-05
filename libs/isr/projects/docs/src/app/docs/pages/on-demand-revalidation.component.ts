import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';
import { DocsPageSectionComponent } from '../layout/docs-page-section.component';
import { HighlightModule } from 'ngx-highlightjs';
import { AlerSuccessComponent } from '../components/alert-success.component';

@Component({
  selector: 'app-on-demand-revalidation',
  template: `
    <docs-page-section title="Why do we need it?">
      Caching is a great way to improve the performance of your app. But, sometimes you need to
      revalidate the cache when the data changes. This is where on-demand revalidation comes in
      handy.
      <br />

      On-demand revalidation is a feature that allows you to revalidate the cache whenever you want.
      So, you won't have to wait for the cache to expire to get the latest data.

      <br />
    </docs-page-section>
    <docs-page-section title="How to use it?">
      In order to use on-demand revalidation, we need to add some configuration in the
      <b>server.ts</b> file. <br /><br />
      <pre><code [languages]="['typescript']" [highlight]="onDemandRevalidationConfig"></code></pre>

      <br />
      <br />
      Now, we can invalidate the cache by sending a <b>POST</b> request to the
      <b>/api/invalidate</b> endpoint. With the below request body: <br /><br />

      <pre><code [languages]="['typescript']" [highlight]="invalidateCacheRequestBody"></code></pre>
      <br />

      <b class="text-main-100">token</b> is the secret token that you set in the
      <b>ISRHandler invalidateSecretToken </b> field. <br />
      <b class="text-main-100">urlsToInvalidate</b> is an array of URLs that you want to invalidate.
      <br />

      <br /><br />
      Here's an example of how to invalidate the cache using <b>Postman</b>: <br /><br />
      <img src="assets/images/on-demand-postman.png" alt="Postman Invalidate Cache" />
    </docs-page-section>
    <docs-page-section title="Usecases" class="mt-3">
      This feature is best used when you have a CMS that updates the data frequently. <br />
      For example, if you have a blog that you update frequently, you can use on-demand revalidation
      to invalidate the cache whenever you update a blog post. <br />
      This way, you won't have to wait for the cache to expire to get the latest data.

      <br />
      <br />

      <app-alert-success>
        <span title>Hint:</span>
        <span description class="text-base">
          By setting the <b>revalidate: 0</b>, you can disable the scheduled (automatic)
          revalidation. <br />
          The cache will never revalidate, unless you manually invalidate it using on-demand
          revalidation. <br />

          <br />
          It's just like when you use <b>changeDetectorRef.detach</b> with
          <b>changeDetectorRef.detectChanges</b> methods. <b>You have full control!</b>
        </span>
      </app-alert-success>
    </docs-page-section>
  `,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DocsPageSectionComponent, HighlightModule, AlerSuccessComponent],
})
export default class OnDemandRevalidationComponent {
  constructor() {
    configurePage(PAGE_IDS.onDemandRevalidation);
  }

  onDemandRevalidationConfig = `export function app(): express.Express {
  // other configurations
  // 👇 add this line in order to allow the server to read the body of the request
  server.use(express.json());

  // 👇 add this line to enable on-demand revalidation
  server.post('/api/invalidate', async (req, res) => await isr.invalidate(req, res));
}`;

  invalidateCacheRequestBody = `{
  "token": "your-secret-token",
  "urlsToInvalidate": [
      "/",
      "/docs/on-demand-revalidation"
  ]
}`;
}
