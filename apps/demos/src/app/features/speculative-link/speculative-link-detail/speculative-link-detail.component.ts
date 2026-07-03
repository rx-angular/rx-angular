import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <h2>Speculative Link Detail</h2>
    <p>This route was pre-resolved!</p>
    <pre>{{ data$ | async | json }}</pre>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeculativeLinkDetailComponent {
  private readonly route = inject(ActivatedRoute);
  readonly data$ = this.route.data.pipe(map((d) => d['preResolvedData']));
}
