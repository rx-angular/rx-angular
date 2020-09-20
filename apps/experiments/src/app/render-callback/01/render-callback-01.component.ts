import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { merge, Subject, throwError } from 'rxjs';
import { map, scan, shareReplay, startWith, switchMap, switchMapTo, takeUntil } from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
  selector: 'rx-render-callback-overview',
  template: `
    <h1>Render Callback example</h1>
    <h3>Height calculation with strategy: {{strategyName$ | push:'local'}}</h3>
    <button unpatch (click)="reset()">Reset</button>
    <button unpatch (click)="updateClick.next()">Update content</button>
    <button unpatch (click)="errorClick.next()">Error</button>
    <button unpatch (click)="completeClick.next()">Complete</button>
    <div class="example-results">
      <div class="example-result" style="height: 170px; overflow-y: scroll">
        <h4>render callback output</h4>
        <span>rendered$:</span>
        <rx-notification [notification]="rendered$">
        </rx-notification>
      </div>
      <div class="example-result">
        <h4>After value changed</h4>
        <span>calculated size: <strong>{{ (calculatedAfterValue$ | push) + 'px' }}</strong></span>
      </div>
      <div class="example-result">
        <h4>After renderCallback</h4>
        <span>calculated size: <strong>{{ (calculatedAfterRender$ | push) + 'px' }}</strong></span>
      </div>
    </div>
    <ng-template let-content
                 [rxLetStrategy]="strategyName$"
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
      width: 100%;
      justify-content: space-between;
      margin-bottom: 3rem;
    }

    .example-result {
      width: 30%;
    }

    .example-box {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 300px;
      outline: 1px solid red;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenderCallback01Component implements AfterViewInit {

  @ViewChild('box') box: ElementRef<HTMLElement>;

  private readonly afterViewInit$ = new Subject();

  readonly strategyName$ = this.cfgS.select(map(s => s.strategy));
  readonly rendered$ = new Subject<number>();
  readonly updateClick = new Subject();
  readonly errorClick = new Subject();
  readonly completeClick = new Subject();
  content$;

  readonly calculatedAfterRender$ = this.afterViewInit$.pipe(
    switchMap(() => this.rendered$),
    map(() => this.box.nativeElement.getBoundingClientRect().height)
  );

  // afterViewInit$ is needed, otherwise the ViewChild would not be ready
  readonly calculatedAfterValue$ = this.afterViewInit$.pipe(
    switchMap(() => this.content$),
    map(() => this.box.nativeElement.getBoundingClientRect().height)
  );

  constructor(private cfgS: CdConfigService,
              private cdRef: ChangeDetectorRef
  ) {

  }

  reset() {
    this.content$ = merge(
      this.updateClick,
      this.errorClick.pipe(switchMapTo(throwError(new Error('Boom!'))))
    ).pipe(
      scan(a => !a, false),
      map(b => b ? sentence() : paragraph()),
      takeUntil(this.completeClick),
      shareReplay(1)
    );
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(): void {
    this.reset();
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
