import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { concat, NEVER, of, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'rxa-render-callback-04',
  template: `
    <h1>Render Callback example 04</h1>
    <h4>Multiple rendercallbacks</h4>
    <h4>RenderStrategy: {{strategyName$ | pushRcb: 'local'}}</h4>
    <button unpatch (click)="updateClick.next()">Update</button>
    <div class="example-results">
      <div class="example-result">
        <div class="example-box">
          <h4 class="mat-headline">Value</h4>
          {{ content$ | pushRcb: 'local': rendered$ }}
          <mat-divider></mat-divider>
          <h4 class="mat-headline">Callback Value</h4>
          {{ rendered$ | pushRcb: 'local' }}
        </div>
      </div>
      <div class="example-result">
        <div class="example-box">
          <h4 class="mat-headline">Value</h4>
          {{ content$ | pushRcb: 'local': rendered2$ }}
          <mat-divider></mat-divider>
          <h4 class="mat-headline">Callback Value</h4>
          {{ rendered2$ | pushRcb: 'local' }}
        </div>
      </div>
      <div class="example-result">
        <div class="example-box">
          <h4 class="mat-headline">Value</h4>
          {{ content$ | pushRcb: 'local': rendered3$ }}
          <mat-divider></mat-divider>
          <h4 class="mat-headline">Callback Value</h4>
          {{ rendered3$ | pushRcb: 'local' }}
        </div>
      </div>
    </div>
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
        flex-flow: column;
        justify-content: center;
        align-items: center;
        width: 300px;
        outline: 1px solid red;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderCallback04Component implements AfterViewInit {

  @ViewChild('box') box: ElementRef<HTMLElement>;

  private readonly afterViewInit$ = new Subject();

  readonly strategyName$ = concat(of('local'), NEVER);
  readonly rendered$ = new Subject<number>();
  readonly rendered2$ = new Subject<number>();
  readonly rendered3$ = new Subject<number>();
  readonly updateClick = new Subject();
  readonly content$ = this.updateClick.pipe(
    map(() => Math.random() * 1000),
    shareReplay(1)
  );

  constructor(
    private cdRef: ChangeDetectorRef
  ) {
  }

  reset() {
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.afterViewInit$.next();
  }

}
