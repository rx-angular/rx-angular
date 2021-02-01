import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rxa-rx-let-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>rxLet POC</h2>
        <rxa-strategy-select
          (strategyChange)="strategy = $event"
        ></rxa-strategy-select>
        <rxa-value-provider
          #v="rxaValueProvider"
          [buttons]="true"
        ></rxa-value-provider>
        <button mat-raised-button (click)="v.next()" class="mr-1">
          toggle
        </button>
        <button mat-raised-button [unpatch] (click)="v.next()">
          toggle (unpatched)
        </button>
      </div>
      <div class="row w-100">
        <div class="col-sm-3">
          <h3>RxLet</h3>
          <strong *rxLet="rendered$; let rendered"
            >Rendercallback: {{ rendered }}</strong
          >
          <div
            class="dh-embedded-view"
            *rxLet="
              v.incremental$;
              let value;
              renderCallback: renderCallback;
              strategy: strategy
            "
          >
            <rxa-dirty-check></rxa-dirty-check>
            Value: {{ value }}
          </div>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxLetBasicComponent {
  private _renderCalled = 0;
  readonly renderCallback = new Subject();

  rendered$ = this.renderCallback.pipe(map(() => this._renderCalled++));

  strategy;
}
