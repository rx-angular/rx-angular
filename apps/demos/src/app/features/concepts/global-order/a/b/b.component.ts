import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'rxa-b',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Component B (Child)</h1>
      </ng-container>
      <div class="row">
        <div class="col">
          {{prop}}
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BComponent {

  @Input()
  prop;

}
