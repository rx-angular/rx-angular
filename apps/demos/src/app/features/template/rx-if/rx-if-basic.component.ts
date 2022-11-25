import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rxa-rx-if-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>rxIf POC</h2>
        <rxa-strategy-select
          (strategyChange)="strategy$.next($event)"
        ></rxa-strategy-select>
        <rxa-value-provider
          #v="rxaValueProvider"
          [buttons]="true"
        ></rxa-value-provider>
        <button
          mat-raised-button
          (click)="staticBool = !staticBool; v.next()"
          class="mr-1"
        >
          toggle
        </button>
        <button
          mat-raised-button
          [unpatch]
          (click)="staticBool = !staticBool; v.next()"
        >
          toggle (unpatched)
        </button>
      </div>
      <div class="row w-100">
        <div class="col-sm-3">
          <h3>RxIf (observable value)</h3>
          <strong *rxLet="rendered$; let rendered"
            >Rendercallback: {{ rendered }}</strong
          >
          <div
            class="dh-embedded-view"
            *rxIf="
              v.boolean$;
              let value;
              renderCallback: renderCallback;
              strategy: strategy$;
              else: elseTpl;
              suspense: suspenseTpl;
              complete: completeTpl;
              error: errorTpl
            "
          >
            <rxa-dirty-check></rxa-dirty-check>
            TRUE TEMPLATE
          </div>
        </div>
        <div class="col-sm-3">
          <h3>RxIf (static value)</h3>
          <strong *rxLet="rendered$; let rendered"
            >Rendercallback: {{ rendered }}</strong
          >
          <div
            class="dh-embedded-view"
            *rxIf="
              staticBool;
              renderCallback: renderCallback;
              strategy: strategy$;
              else: elseTpl
            "
          >
            <rxa-dirty-check></rxa-dirty-check>
            TRUE TEMPLATE
          </div>
        </div>
        <ng-template #elseTpl>
          <div class="dh-embedded-view">
            <rxa-dirty-check></rxa-dirty-check>
            FALSE TEMPLATE
          </div>
        </ng-template>
        <ng-template #errorTpl> ERROR </ng-template>
        <ng-template #completeTpl> COMPLETE </ng-template>
        <ng-template #suspenseTpl> SUSPENSE </ng-template>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxIfBasicComponent {
  private _renderCalled = 0;
  readonly renderCallback = new Subject();

  rendered$ = this.renderCallback.pipe(map(() => this._renderCalled++));

  strategy$ = new BehaviorSubject('normal');

  staticBool = true;
}
