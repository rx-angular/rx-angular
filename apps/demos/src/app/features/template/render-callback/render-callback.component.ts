import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { concat, defer, Subject } from 'rxjs';
import { map, scan, shareReplay, startWith, take, tap } from 'rxjs/operators';
import { DocsLinkComponent } from '../../../shared/docs-link';

@Component({
  selector: 'rxa-render-callback',
  standalone: true,
  imports: [MatButtonModule, RxPush, RxLet, RxUnpatch, DocsLinkComponent],
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>Render Callback</h2>
        <p class="rxa-demo-subtitle">
          Uses the <code>*rxLet</code> render callback to measure element height
          only after the view has actually rendered.
        </p>
      </div>
      <rxa-docs-link
        docs="packages/template/reference/rx-let"
        source="apps/demos/src/app/features/template/render-callback"
      />
    </header>

    <div class="rxa-demo-toolbar">
      <section class="rxa-demo-group">
        <span class="rxa-demo-label">Actions</span>
        <div class="rxa-demo-controls">
          <button
            mat-raised-button
            [unpatch]
            (click)="updateClick.next(undefined)"
          >
            Update content
          </button>
        </div>
      </section>
      <section class="rxa-demo-group">
        <span class="rxa-demo-label"
          >Height calculation using rendered$ Event</span
        >
        <div class="rxa-stat-row">
          <div class="rxa-stat">
            <span class="rxa-stat-label">After renderCallback</span>
            <span class="rxa-stat-value">{{
              (calculatedAfterRender$ | push) + 'px'
            }}</span>
          </div>
          <div class="rxa-stat">
            <span class="rxa-stat-label">After value changed</span>
            <span class="rxa-stat-value">{{
              (calculatedAfterValue$ | push) + 'px'
            }}</span>
          </div>
        </div>
      </section>
    </div>

    <div class="demo-card">
      <h3 class="rxa-demo-section-title">Value</h3>
      <div class="example-value p-4">
        <ng-container *rxLet="content$; let content; renderCallback: rendered$">
          <div #box class="example-box">
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
        outline: 1px dashed rgba(var(--rxa-brand-rgb), 0.4);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderCallbackComponent implements AfterViewInit {
  private cdRef = inject(ChangeDetectorRef);

  @ViewChild('box') box: ElementRef<HTMLElement>;

  readonly rendered$ = new Subject<number>();
  readonly updateClick = new Subject();
  readonly content$ = this.updateClick.pipe(
    startWith(false),
    scan((a) => !a, false),
    map((b) => (b ? sentence() : paragraph())),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly calculatedAfterRender$ = defer(() =>
    this.rendered$.pipe(
      map(() => this.box?.nativeElement.getBoundingClientRect().height ?? 0),
      tap((v) => console.log('height', v)),
    ),
  );

  readonly calculatedAfterValue$ = defer(() =>
    concat(
      this.rendered$.pipe(take(1)),
      this.content$.pipe(
        // Reads before the new content has rendered — the whole point of the
        // demo — so the view child may not exist yet; fall back to 0.
        map(() => this.box?.nativeElement.getBoundingClientRect().height ?? 0),
      ),
    ),
  );

  reset() {}

  ngAfterViewInit(): void {
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
