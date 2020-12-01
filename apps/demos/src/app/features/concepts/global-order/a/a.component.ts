import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'rxa-a',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h1 class="mat-headline">Component A (Parent)</h1>
      </ng-container>
      <button mat-button unpatch (click)="update()">
        update
      </button>
      <div class="row w-100">
        <rxa-children>
          <rxa-c [prop]="20"></rxa-c>
          <rxa-c
            *rxLet="values$; let v"
            [prop]="v"></rxa-c>
        </rxa-children>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.Default
})
export class AComponent {


  values$ = new Subject();

  prop = 'value';

  update(): void {
    this.values$.next((new Array(100).fill(20)));
  }

}
