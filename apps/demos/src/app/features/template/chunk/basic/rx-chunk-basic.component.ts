import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'rx-chunk-basic',
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <h3>*rxChunk</h3>
        <rxa-strategy-select
          (strategyChange)="strategy = $event"
        ></rxa-strategy-select>
        <div>
          Rendercallback:
          <ng-container *rxLet="rendered$; let rendered">{{
            rendered
          }}</ng-container>
        </div>
        <div>
          <button mat-button (click)="showContent = !showContent">
            Toggle Content
          </button>
        </div>
      </ng-container>
      <div class="row w-100 mt-5">
        <ng-container *ngIf="showContent">
          <div class="col-6">
            <div><strong>Non-Chunked</strong></div>
            <rxa-work-visualizer
              [reCreateContentOnCd]="false"
              [work]="250"
            ></rxa-work-visualizer>
          </div>
          <div class="col-6">
            <div><strong>Chunked</strong></div>
            <ng-container *rxChunk="strategy; renderCallback: renderCallback">
              <rxa-work-visualizer
                [reCreateContentOnCd]="false"
                [work]="250"
              ></rxa-work-visualizer>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RxChunkBasicComponent {
  strategy: string;

  showContent = true;

  renderCallback = new Subject<void>();
  private _rendered = 1;
  rendered$ = this.renderCallback.pipe(map(() => this._rendered++));
}
