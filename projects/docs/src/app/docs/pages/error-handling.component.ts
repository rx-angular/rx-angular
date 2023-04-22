import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PAGE_IDS, configurePage } from '../services/docs-layout.service';
import { NgxIsrService } from 'ngx-isr/browser';
import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-error-handling',
  template: `
    <p class="text-dark dark:text-white min-h-[300px]">
      Not written yet.

      <br /><br />
      More info on this realease:
      <a
        href="https://github.com/eneajaho/ngx-isr/releases/tag/v0.2.0"
        target="_blank"
        class="text-main-100">
        v.0.2.0
      </a>

      or in this commit:
      <a
        href="https://github.com/eneajaho/ngx-isr/commit/3be09593dcc7d1b266deb8fdfb9613a051351351"
        target="_blank"
        class="text-main-100">
        3be0959
      </a>
    </p>

    {{ data | json }}
  `,
  standalone: true,
  imports: [RouterLink, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ErrorHandlingComponent {
  isrService = inject(NgxIsrService);
  http = inject(HttpClient);

  hasErrorInQueryParam = inject(ActivatedRoute).snapshot.queryParamMap.has('withError');

  data = {};

  constructor() {
    configurePage(PAGE_IDS.errorHandling);

    this.http.get('https://jsonplaceholder.typicode.com/todos/1').subscribe(data => {
      if (this.hasErrorInQueryParam) {
        const error: Error = {
          name: 'This is an error',
          message: 'This is an error message',
          stack: 'This is an error stack',
        };
        this.isrService.addError(error);
      }

      this.data = data;
    });
  }
}
