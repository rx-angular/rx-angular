import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { merge, of, Subject, throwError } from 'rxjs';
import { map, scan, shareReplay, switchMap, switchMapTo, take, takeUntil } from 'rxjs/operators';

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
      <div class="example-result" style="height: 170px; overflow-y: scroll">
        <h4>render callback output</h4>
        <span>rendered$:</span>
      </div>
      <div class="example-result">
        <h4>After value changed</h4>
        <span>calculated size: <strong>{{ (
                                            calculatedAfterValue$ | push: 'local': rendered$
                                          ) + 'px' }}</strong></span>
      </div>
      <div class="example-result">
        <h4>After renderCallback</h4>
        <span>calculated size: <strong>{{ (
                                            calculatedAfterRender$ | push: 'local': rendered$
                                          ) + 'px' }}</strong></span>
      </div>
    </div>
    <ng-template let-content
                 [rxLet]="content$"
                 (rendered)="rendered$.next($event)">
      <div class="example-box"
           #box>
        {{ content }}
      </div>
    </ng-template>
  `,
  styles: [
      `
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
export class RenderCallback01Component implements AfterViewInit {

  @ViewChild('box') box: ElementRef<HTMLElement>;

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
    scan(a => !a, false),
    map(b => b ? sentence() : paragraph()),
    takeUntil(this.completeClick),
    shareReplay(1)
  );

  readonly calculatedAfterRender$ = this.afterViewInit$.pipe(
    switchMap(() => this.rendered$),
    map(() => this.box.nativeElement.getBoundingClientRect().height)
  );

  // afterViewInit$ is needed, otherwise the ViewChild would not be ready
  readonly calculatedAfterValue$ = this.afterViewInit$.pipe(
    switchMap(() => this.rendered$.pipe(take(1))),
    switchMap(() => this.content$.pipe(
      map(() => this.box.nativeElement.getBoundingClientRect().height)
    )),
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
