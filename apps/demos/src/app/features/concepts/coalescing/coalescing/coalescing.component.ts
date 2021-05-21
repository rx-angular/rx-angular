import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Platform } from '@angular/cdk/platform';

@Component({
  selector: 'rxa-demo-basics',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h2>Coalescing Tests</h2>
        <div>
          <rxa-strategy-select
            (strategyChange)="strategy$.next($event)"
          ></rxa-strategy-select>
          <br />
          <button mat-raised-button (click)="click$.next($event)">
            UpdateValue (native)
          </button>
          <button [unpatch] mat-raised-button (click)="click$.next($event)">
            UpdateValue
          </button>
        </div>
      </ng-container>

      <div class="col-sm-3">
        <h3>Push 1</h3>
        <br />
        {{ incremental$ | push: strategy$ }}<br />
      </div>
      <div class="col-sm-3">
        <h3>Push 2</h3>
        <br />
        {{ incremental$ | push: strategy$ }}
      </div>
      <div class="col-sm-3">
        <h3>Push 2</h3>
        <br />
        {{ incremental$ | push: strategy$ }}
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoalescingComponent {
  click$ = new Subject<any>();
  strategy$ = new Subject<string>();
  triggerRipple$ = new Subject<any>();
  incremental$ = this.click$.pipe(mergeMap(() => [1, 2, Math.random()]));

  constructor(
    private readonly elRef: ElementRef,
    private readonly platform: Platform
  ) {}
}
