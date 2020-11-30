import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'rxa-a',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Component A (Parent)</h1>
      </ng-container>
      <div class="row w-100">
        <div class="col-12">
          {{prop}}
        </div>
        <div class="col">
          <rxa-b [prop]="prop"></rxa-b>
        </div>
        <div class="col">
          <rxa-c [prop]="prop"></rxa-c>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AComponent {

  prop = 'value';

}
