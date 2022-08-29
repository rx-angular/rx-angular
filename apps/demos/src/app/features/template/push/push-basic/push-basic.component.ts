import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';

@Component({
  selector: 'rxa-push-basic-example',
  template: `
    <div class="row mb-2">
      <div class="col">
        <button mat-raised-button unpatch (click)="updateClick.next()">Update</button>
      </div>
    </div>
    <rxa-dirty-check></rxa-dirty-check>
    <div class="row">
      <div class="col">
        Rendered: {{ renderCallback$ | push }}
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="mat-headline">
          Value
        </div>
        <div> {{ value$ | push: { renderCallback: renderCallback, patchZone: true } }}</div>
      </div>
      <div class="col-4">
        <div class="mat-headline">
          Value
        </div>
        <div> {{ value$ | push }}</div>
      </div>
      <div class="col-4">
        <div class="mat-headline">
          Value
        </div>
        <div> {{ value$ | push }}</div>
      </div>
    </div>
  `,
  styles: [`

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PushBasicComponent {

  readonly updateClick = new Subject<void>();
  private _numRendered = 0;
  readonly renderCallback = new Subject<void>();
  readonly renderCallback$ = this.renderCallback.pipe(
    tap(() => console.log('rendered')),
    map(() => this._numRendered++)
  )

  readonly value$ = this.updateClick.pipe(
    map(() => Math.ceil(Math.random() * 100)),
    distinctUntilChanged(),
    share()
  );
}
