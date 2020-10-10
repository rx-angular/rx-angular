import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Subject } from 'rxjs';
import { map, shareReplay, switchMap, take } from 'rxjs/operators';
import { CdConfigService } from '../../cd-config.service';

@Component({
  selector: 'rx-render-callback-05',
  template: `
    <h1>Render Callback example 05</h1>
    <h4>Multiple rendercallbacks</h4>
    <h4>RenderStrategy: {{strategyName$ | push: 'local'}}</h4>
    <button unpatch (click)="updateClick.next()">Update</button>
    <div class="example-results">
      <div class="example-result">
        <div class="example-box">
          <h4 class="mat-headline">Value</h4>
          {{ content$ | push: 'local': rendered$ }}
          <mat-divider></mat-divider>
          <h4 class="mat-headline">Callback Value</h4>
          {{ rendered$ | push: 'local' }}
        </div>
      </div>
      <div class="example-result">
        <div class="example-box">
          <h4 class="mat-headline">Value</h4>
          {{ content$ | push: 'local': rendered2$ }}
          <mat-divider></mat-divider>
          <h4 class="mat-headline">Callback Value</h4>
          {{ rendered2$ | push: 'local' }}
        </div>
      </div>
      <div class="example-result">
        <div class="example-box">
          <h4 class="mat-headline">Value</h4>
          {{ content$ | push: 'local': rendered3$ }}
          <mat-divider></mat-divider>
          <h4 class="mat-headline">Callback Value</h4>
          {{ rendered3$ | push: 'local' }}
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
export class RenderCallback05Component implements AfterViewInit {

  @ViewChild('box') box: ElementRef<HTMLElement>;

  private readonly afterViewInit$ = new Subject();

  readonly strategyName$ = this.cfgS.select(map(s => s.strategy));
  readonly rendered$ = new Subject<number>();
  readonly rendered2$ = new Subject<number>();
  readonly rendered3$ = new Subject<number>();
  readonly updateClick = new Subject();
  readonly content$ = this.updateClick.pipe(
    map(() => Math.random() * 1000),
    shareReplay(1)
  );

  constructor(
    private cfgS: CdConfigService,
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

function sentence(): string {
  return text(3, 12);
}


function paragraph(): string {
  return text(35, 102);
}

function text(min: number, max: number): string {
  return 'Lorem Ipsum '.repeat(Math.ceil(Math.max(min, Math.random() * max)));
}
