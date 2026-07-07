import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, share, tap } from 'rxjs/operators';
import { DirtyChecksModule } from '../../../shared/debug-helper/dirty-checks/index';
import { DocsLinkComponent } from '../../../shared/docs-link';

@Component({
  selector: 'rxa-push-basic-example',
  standalone: true,
  imports: [
    MatButtonModule,
    RxPush,
    RxUnpatch,
    DirtyChecksModule,
    DocsLinkComponent,
  ],
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>Push Pipe — Basic</h2>
        <p class="rxa-demo-subtitle">
          Renders the same source through three <code>| push</code> pipes and
          tracks how often the view is updated.
        </p>
      </div>
      <rxa-docs-link
        docs="packages/template/legacy/push-pipe"
        source="apps/demos/src/app/features/template/push"
      />
    </header>

    <div class="rxa-demo-toolbar">
      <section class="rxa-demo-group">
        <span class="rxa-demo-label">Actions</span>
        <div class="rxa-demo-controls">
          <button mat-raised-button unpatch (click)="updateClick.next()">
            Update
          </button>
        </div>
      </section>

      <section class="rxa-demo-group">
        <span class="rxa-demo-label">Dirty check</span>
        <rxa-dirty-check></rxa-dirty-check>
      </section>

      <section class="rxa-demo-group">
        <span class="rxa-demo-label">Renders</span>
        <div class="rxa-stat-row">
          <div class="rxa-stat">
            <span class="rxa-stat-label">Rendered</span>
            <span class="rxa-stat-value">{{ renderCallback$ | push }}</span>
          </div>
        </div>
      </section>
    </div>

    <div class="demo-card rxa-demo-columns">
      <div>
        <h3 class="rxa-demo-section-title">Value</h3>
        <div>
          {{
            value$ | push: { renderCallback: renderCallback, patchZone: true }
          }}
        </div>
      </div>
      <div>
        <h3 class="rxa-demo-section-title">Value</h3>
        <div>{{ value$ | push }}</div>
      </div>
      <div>
        <h3 class="rxa-demo-section-title">Value</h3>
        <div>{{ value$ | push }}</div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PushBasicComponent {
  readonly updateClick = new Subject<void>();
  private _numRendered = 0;
  readonly renderCallback = new Subject<void>();
  readonly renderCallback$ = this.renderCallback.pipe(
    tap(() => console.log('rendered')),
    map(() => this._numRendered++),
  );

  readonly value$ = this.updateClick.pipe(
    map(() => Math.ceil(Math.random() * 100)),
    distinctUntilChanged(),
    share(),
  );
}
