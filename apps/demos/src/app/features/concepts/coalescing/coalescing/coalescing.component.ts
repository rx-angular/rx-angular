import { Platform } from '@angular/cdk/platform';
import { ChangeDetectionStrategy, Component, ElementRef } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { PushPipe } from '../../../../rx-angular-pocs/template/pipes/push/push.pipe';
import { StrategySelectComponent } from '../../../../shared/debug-helper/strategy-select/strategy-select.component';
import { VisualizerComponent } from '../../../../shared/debug-helper/visualizer/visualizer/visualizer.component';

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
  imports: [
    VisualizerComponent,
    StrategySelectComponent,
    MatButton,
    RxUnpatch,
    RxPush,
    PushPipe,
  ],
})
export class CoalescingComponent {
  click$ = new Subject<any>();
  strategy$ = new Subject<string>();
  triggerRipple$ = new Subject<any>();
  incremental$ = this.click$.pipe(mergeMap(() => [1, 2, Math.random()]));

  constructor(
    private readonly elRef: ElementRef,
    private readonly platform: Platform,
  ) {}
}
