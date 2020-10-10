import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Subject } from 'rxjs';
import { scan } from 'rxjs/operators';

@Component({
  selector: 'rxa-cd-embedded-view-parent02',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>
          rxIf POC
        </h2>
        <button mat-raised-button [unpatch] (click)="toggleClick$.next($event)">
          toggle
        </button>
      </div>
      <div class="row w-100">
        <div class="col">
          <rxa-visualizer>
            <h3>Render EmbeddedViews directly</h3>
            <ng-container *poc1If="value1$; let value; falsey: f1">
              <rxa-dirty-check></rxa-dirty-check>
              TRUE
              {{value}}
            </ng-container>
            <ng-template #f1>
              <rxa-dirty-check></rxa-dirty-check>
              FALSE
            </ng-template>
          </rxa-visualizer>
        </div>
        <div class="col">
          <rxa-visualizer>
            <h3>Display/Hide EmbeddedViews</h3>
            <ng-container *poc2If="value1$; let value; falsey: f1">
              <rxa-dirty-check></rxa-dirty-check>
              TRUE
              {{value}}
              <ng-template #f2>
                <rxa-dirty-check></rxa-dirty-check>
                FALSE
              </ng-template>
            </ng-container>
          </rxa-visualizer>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection
})
export class RxIfPocComponent {
  toggleClick$ = new Subject<Event>();
  value1$ = this.toggleClick$.pipe(
    scan(a => !a, false)
  );
}
