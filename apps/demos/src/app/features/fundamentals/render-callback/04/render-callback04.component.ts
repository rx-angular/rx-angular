import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { of, Subject } from 'rxjs';
import { delay, map, shareReplay, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'rxa-render-callback-04',
  template: `
    <h1>Render Callback example 04</h1>
    <h4>Wait for items to be rendered</h4>
    <h4>RenderStrategy: {{strategyName$ | push: 'local'}}</h4>
    <button unpatch (click)="reset()">(Re-) Start</button>
    <div class="example-results">
      <mat-progress-spinner
        *ngIf="(rendering$ | push) === true"
        diameter="100" mode="indeterminate"></mat-progress-spinner>
    </div>
    <ng-container
      *rxLet="paragraphs$;
      let paragraphs;
      strategy: strategyName$;
      renderCallback: rendered$">
      <div class="example-boxes" [class.hidden]="(rendering$ | push) === true">
        <div class="example-box" *ngFor="let p of paragraphs"
             #box>
          {{ p }}
        </div>
      </div>
    </ng-container>
  `,
  styles: [
      `
      .hidden {
        display: none !important;
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

      .example-boxes {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
      }

      .example-box {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 75px;
        height: 75px;
        padding: 1rem;
        outline: 1px solid red;
        overflow: scroll;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderCallback04Component implements AfterViewInit {

  @ViewChild('box') box: ElementRef<HTMLElement>;

  private readonly afterViewInit$ = new Subject();

  readonly strategyName$ = of('local');

  readonly rendered$ = new Subject<string>();
  readonly resetClick = new Subject<void>();
  readonly paragraphs$ = this.resetClick.pipe(
    delay(1000),
    map(() => Array(100).fill(paragraph())),
    shareReplay(1)
  );
  readonly rendering$ = this.resetClick.pipe(
    switchMap(() => this.rendered$.pipe(
      map(() => false),
      startWith(true)
    )),
    startWith(true),
    shareReplay(1)
  );

  readonly calculatedAfterRender$ = this.afterViewInit$.pipe(
    switchMap(() => this.rendered$),
    map(() => this.box.nativeElement.getBoundingClientRect().height)
  );

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
  }

  reset() {
    this.resetClick.next();
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.afterViewInit$.next();
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
