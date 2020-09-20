import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'rx-render-callback-overview',
  template: `
    <h1>Render Callback example</h1>
    <h3>Height calculation</h3>
    <button unpatch (click)="click.next()">Update content</button>
    <div class="example-results">
      <div class="example-result">
        <h4>After renderCallback</h4>
        <span>calculated size: <strong>{{ (calculatedAfterRender$ | push) + 'px' }}</strong></span>
      </div>
      <div class="example-result">
        <h4>After value changed</h4>
        <span>calculated size: <strong>{{ (calculatedAfterValue$ | push) + 'px' }}</strong></span>
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
  styles: [`
    .example-results {
      display: flex;
      max-width: 400px;
      justify-content: space-between;
      margin-bottom: 3rem;
    }
    .example-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 500px;
      outline: 1px solid red;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderCallback01Component implements AfterViewInit {

  @ViewChild('box') box: ElementRef<HTMLElement>;

  private readonly afterViewInit$ = new Subject();

  readonly rendered$ = new Subject<number>();
  readonly click = new Subject();
  readonly content$ = this.click.pipe(
    startWith(null),
    map(() => Math.ceil(Math.max(35, Math.random() * 250))),
    map(wordCount => 'Lorem Ipsum '.repeat(wordCount)),
    shareReplay(1)
  );

  readonly calculatedAfterRender$ = this.rendered$.pipe(
    map(() => this.box.nativeElement.getBoundingClientRect().height)
  );

  // afterViewInit$ is needed, otherwise the ViewChild would not be ready
  readonly calculatedAfterValue$ = this.afterViewInit$.pipe(
    switchMap(() => this.content$),
    map(() => this.box.nativeElement.getBoundingClientRect().height)
  );

  constructor() {}

  ngAfterViewInit(): void {
    this.afterViewInit$.next();
  }

}
