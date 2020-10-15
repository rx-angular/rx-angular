import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

@Component({
  selector: 'rxa-rx-if-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>
          rxIf POC
        </h2>
        <button mat-raised-button (click)="toggleClick$.next($event)" class="mr-1">
          toggle
        </button>
        <button mat-raised-button [unpatch] (click)="toggleClick$.next($event)">
          toggle (unpatched)
        </button>
      </div>
      <div class="row w-100">
        <div class="col-sm-3">
          <h3>Angular Native</h3>
          <ng-template #f1>
            <div class="dh-embedded-view">
              <rxa-dirty-check></rxa-dirty-check>
              FALSE
            </div>
          </ng-template>
          <div class="dh-embedded-view" *ngIf="value1$ | async; else: f1">
            <rxa-dirty-check></rxa-dirty-check>
            TRUE
          </div>
        </div>
        <div class="col-sm-3">
          <h3>Render EmbeddedViews directly</h3>
          <ng-template #f1>
            <div class="dh-embedded-view">
              <rxa-dirty-check></rxa-dirty-check>
              FALSE
            </div>
          </ng-template>
          <div class="dh-embedded-view" *poc1If="value1$; let value; falsey: f1">
            <rxa-dirty-check></rxa-dirty-check>
            TRUE
          </div>

        </div>
        <div class="col-sm-3">
          <h3 visualizerHeader>Create/Destroy EmbeddedViews</h3>
          <ng-template #f2>
            <div class="dh-embedded-view">
              <rxa-dirty-check></rxa-dirty-check>
              FALSE
            </div>
          </ng-template>
          <div class="dh-embedded-view" *poc2If="value1$; let value; falsey: f2">
            <rxa-dirty-check></rxa-dirty-check>
            TRUE
          </div>
        </div>
        <div class="col-sm-3">
          <h3 visualizerHeader>Display/Hide EmbeddedViews</h3>
          <ng-template #f3>
            <div class="dh-embedded-view">
              <rxa-dirty-check></rxa-dirty-check>
              FALSE
            </div>
          </ng-template>
          <div class="dh-embedded-view" *rxIf="value1$; let value;">
            <rxa-dirty-check></rxa-dirty-check>
            TRUE
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: environment.changeDetection
})
export class RxIfPocComponent {
  toggleClick$ = new Subject<Event>();
  value1$ = this.toggleClick$.pipe(
    scan(a => !a, false),
    startWith(false)
  );
}
