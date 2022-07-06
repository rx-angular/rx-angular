import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { LetDirective } from '@rx-angular/template/let';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rxa-rx-let-poc',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>rxLet SCOPING</h2>
        <rxa-strategy-select
          (strategyChange)="strategy = $event"
        ></rxa-strategy-select>
        <rxa-value-provider
          #v="rxaValueProvider"
          [buttons]="true"
        ></rxa-value-provider>
        <button (click)="v.next()" class="mr-1">toggle</button>
        <button [unpatch] (click)="v.next()">toggle (unpatched)</button>
      </div>
      <div class="row w-100">
        <div class="col-sm-3">
          <h3>RxLet</h3>
          <rxa-content-parent>
            <div
              class="dh-embedded-view"
              *rxLet="
                v.incremental$;
                let value;
                parent: withParent;
                renderCallback: renderCallback;
                strategy: strategy
              "
            >
              <rxa-dirty-check></rxa-dirty-check>
              Value: {{ value }}
              <div #letChild rxaContentChild></div>
            </div>
          </rxa-content-parent>
        </div>
        <div class="col-sm-3">
          <h3>RxLet</h3>
          <rxa-content-parent>
            <div
              class="dh-embedded-view"
              *rxLet="
                v.incremental$;
                let value;
                parent: withParent;
                renderCallback: renderCallback;
                strategy: strategy
              "
            >
              <rxa-dirty-check></rxa-dirty-check>
              Value: {{ value }}
              <div #letChild rxaContentChild></div>
            </div>
          </rxa-content-parent>
        </div>
        <div class="col-sm-3">
          <h3>RxLet</h3>
          <rxa-content-parent>
            <div
              class="dh-embedded-view"
              *rxLet="
                v.incremental$;
                let value;
                parent: withParent;
                renderCallback: renderCallback;
                strategy: strategy
              "
            >
              <rxa-dirty-check></rxa-dirty-check>
              Value: {{ value }}
              <div #letChild rxaContentChild></div>
            </div>
          </rxa-content-parent>
        </div>
        <div class="col-sm-3">
          <h3>RxLet</h3>
          <rxa-content-parent>
            <div
              class="dh-embedded-view"
              *rxLet="
                v.incremental$;
                let value;
                parent: withParent;
                renderCallback: renderCallback;
                strategy: strategy
              "
            >
              <rxa-dirty-check></rxa-dirty-check>
              Value: {{ value }}
              <div #letChild rxaContentChild></div>
            </div>
          </rxa-content-parent>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxLetScopingComponent implements AfterViewInit {
  private _renderCalled = 0;
  readonly renderCallback = new Subject();

  @ViewChildren('letChild') letChildren: QueryList<ElementRef>;

  rendered$ = this.renderCallback.pipe(map(() => this._renderCalled++));

  strategy;

  withParent = true;

  ngAfterViewInit() {
    this.letChildren.changes.subscribe((letDirs) => {
      console.log('letChildren', letDirs);
    });
  }
}
