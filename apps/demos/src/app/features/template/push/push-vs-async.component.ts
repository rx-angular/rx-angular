import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, map, share } from 'rxjs/operators';
import { ValueProviderComponent } from '../../../shared/debug-helper/value-provider/value-provider/value-provider.component';
import { VisualizerModule } from '../../../shared/debug-helper/visualizer/visualizer.module';
import { DocsLinkComponent } from '../../../shared/docs-link';
import { RecursiveModule } from '../../../shared/template-structures/recursive/recursive.module';

@Component({
  selector: 'rxa-push-basic-example',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    VisualizerModule,
    ValueProviderComponent,
    RecursiveModule,
    DocsLinkComponent,
  ],
  template: `
    <rxa-visualizer>
      <ng-container visualizerHeader>
        <header class="rxa-demo-header">
          <div>
            <h2>Push vs Async Pipe</h2>
            <p class="rxa-demo-subtitle">
              Compares <code>| push</code> and Angular's <code>| async</code>
              side by side across a recursive, deeply nested view.
            </p>
          </div>
          <rxa-docs-link
            docs="packages/template/legacy/push-pipe"
            source="apps/demos/src/app/features/template/push"
          />
        </header>

        <div class="rxa-demo-toolbar">
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Nesting Level</span>
            <mat-form-field>
              <mat-label>Nesting Level</mat-label>
              <input matInput type="number" [(ngModel)]="depth" />
            </mat-form-field>
          </section>
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Min Value</span>
            <mat-form-field>
              <mat-label>Min Value</mat-label>
              <input matInput type="number" [(ngModel)]="min" />
            </mat-form-field>
          </section>
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Max Value</span>
            <mat-form-field>
              <mat-label>Max Value</mat-label>
              <input matInput type="number" [(ngModel)]="max" />
            </mat-form-field>
          </section>
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Visible Examples</span>
            <mat-button-toggle-group
              name="visibleExamples"
              aria-label="Visible Examples"
              [value]="displayStates.all"
              #group="matButtonToggleGroup"
            >
              <mat-button-toggle [value]="displayStates.push"
                >Push</mat-button-toggle
              >
              <mat-button-toggle [value]="displayStates.async"
                >Async</mat-button-toggle
              >
              <mat-button-toggle [value]="displayStates.all"
                >All</mat-button-toggle
              >
            </mat-button-toggle-group>
          </section>
          <section class="rxa-demo-group">
            <span class="rxa-demo-label">Actions</span>
            <div class="rxa-demo-controls">
              <button mat-raised-button (click)="isVisible.set(!isVisible())">
                Toggle visibility to reset
              </button>
            </div>
          </section>
        </div>
      </ng-container>
      @if (isVisible()) {
        <div class="rxa-demo-columns w-100">
          @if (visible(group, displayStates.push)) {
            <div class="demo-card">
              <h3 class="rxa-demo-section-title">Push</h3>
              <rxa-value-provider
                [min]="min"
                [max]="max"
                [changes$]="btnBothClick$"
                #staticVal="rxaValueProvider"
              ></rxa-value-provider>
              <div class="mb-1">
                <button mat-mini-fab (click)="staticVal.next()">
                  <mat-icon>add</mat-icon>
                </button>
              </div>
              <rxa-recursive-observable-work-push
                [depth]="depth"
                [value$]="staticVal.int$"
              ></rxa-recursive-observable-work-push>
            </div>
          }
          @if (visible(group, displayStates.async)) {
            <div class="demo-card">
              <h3 class="rxa-demo-section-title">Async</h3>
              <rxa-value-provider
                [min]="min"
                [max]="max"
                [changes$]="btnBothClick$"
                #observableVal="rxaValueProvider"
              ></rxa-value-provider>
              <div class="mb-1">
                <button mat-mini-fab (click)="observableVal.next()">
                  <mat-icon>add</mat-icon>
                </button>
              </div>
              <rxa-recursive-observable-work-async
                [depth]="depth"
                [value$]="observableVal.int$"
              ></rxa-recursive-observable-work-async>
            </div>
          }
        </div>
      }
    </rxa-visualizer>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PushVsAsyncComponent {
  private _depth = 5;
  set depth(depth: number) {
    this._depth = depth >= 1 ? depth : 1;
  }
  get depth(): number {
    return this._depth;
  }

  min = 0;
  max = 5;

  readonly updateClick = new Subject<void>();

  displayStates = {
    none: 0,
    all: 1,
    push: 2,
    async: 3,
  };

  btnBothClick$ = new ReplaySubject<any>(1);
  readonly value$ = this.updateClick.pipe(
    map(() => Math.ceil(Math.random() * 100)),
    distinctUntilChanged(),
    share(),
  );

  readonly isVisible = signal(true);

  selected(group, choice) {
    return group.value === choice;
  }

  visible(group, choice) {
    return group.value === choice || group.value === this.displayStates.all;
  }
}
