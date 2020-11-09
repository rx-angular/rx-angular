import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { concat, merge, Subject, throwError } from 'rxjs';
import { map, scan, shareReplay, startWith, switchMap, switchMapTo, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'rxa-render-callback-01',
  template: `
    <h1>Render Callback example 01</h1>
    <h4>Height calculation using rendered$ Event</h4>
    <button mat-raised-button [unpatch] (click)="reset()">Reset</button>
    <button mat-raised-button [unpatch] (click)="updateClick.next()">Update content</button>
    <button mat-raised-button [unpatch] (click)="errorClick.next()">Error</button>
    <button mat-raised-button [unpatch] (click)="completeClick.next()">Complete</button>
    <div class="example-results">
      <div class="example-result">
        <h4>Calculated after renderCallback</h4>
        <strong>{{ (
                     calculatedAfterRender$ | push
                   ) + 'px' }}</strong>
      </div>
      <div class="example-result">
        <h4>Calculated after value changed</h4>
        <strong>{{ (
          calculatedAfterValue$ | push
          ) + 'px' }}</strong>
      </div>
    </div>
    <h4>Value</h4>
    <div class="example-value p-4">
      <ng-container *rxLet="content$; strategy: 'chunk'; let content; renderCallback: rendered$">
        <div id="box" class="example-box">
          {{ content }}
        </div>
      </ng-container>
      <!-- TEMPLATE SYNTAX:
      <ng-template let-content
                   [rxLet]="content$"
                   [rxLetStrategy]="'chunk'"
                   (rendered)="rendered$.next($event)">
        <div id="box" class="example-box">
          {{ content }}
        </div>
      </ng-template>-->
    </div>
  `,
  styles: [
    `
      .example-value {
        width: 400px;
        max-height: 500px;
        overflow: auto;
      }

      .example-results {
        display: flex;
        width: 100%;
        justify-content: space-evenly;
        margin-bottom: 3rem;
      }

      .example-result {
        flex-grow: 1;
      }

      .example-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 300px;
        outline: 1px solid red;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderCallbackComponent implements AfterViewInit {

  private _box: HTMLElement;
  get box(): HTMLElement {
    if (!this._box) {
      this._box = document.getElementById('box');
    }
    return this._box;
  }

  private readonly afterViewInit$ = new Subject();

  readonly rendered$ = new Subject<number>();
  readonly updateClick = new Subject();
  readonly errorClick = new Subject();
  readonly completeClick = new Subject();
  private readonly reset$ = new Subject();
  readonly content$ = this.reset$.pipe(
    switchMap(() => merge(
      this.updateClick,
      this.errorClick.pipe(switchMapTo(throwError(new Error('Boom!'))))
    )),
    startWith(false),
    scan(a => !a, false),
    map(b => b ? sentence() : paragraph()),
    takeUntil(this.completeClick),
    shareReplay({ bufferSize: 1, refCount: true })
  );

  readonly calculatedAfterRender$ = this.afterViewInit$.pipe(
    switchMap(() => this.rendered$),
    map(() => this.box.getBoundingClientRect().height)
  );

  // afterViewInit$ is needed, otherwise the ViewChild would not be ready
  readonly calculatedAfterValue$ = this.afterViewInit$.pipe(
    take(1),
    switchMapTo(concat(
      this.rendered$.pipe(take(1)),
      this.content$.pipe(
        map(() => this.box.getBoundingClientRect().height)
      )
      )
    )
  );

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
  }

  reset() {
    this.reset$.next();
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.afterViewInit$.next();
    this.reset();
  }

}

function sentence(): string {
  return text(3, 12);
}


function paragraph(): string {
  return text(35, 102);
}

function text(min: number, max: number): string {
  return 'Lorem Ipsum '.repeat(Math.ceil(Math.max(min, Math.random() * max)));
}
