import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RxState } from '@rx-angular/state';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { Observable, Subject } from 'rxjs';
import { map, scan, share } from 'rxjs/operators';
import { DocsLinkComponent } from '../../../shared/docs-link';
import { FormGhostComponent } from '../../../shared/ghost-elements/form-ghost/form-ghost.component';

@Component({
  selector: 'rxa-let-error-handling',
  standalone: true,
  imports: [
    RxLet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    FormGhostComponent,
    RxUnpatch,
    DocsLinkComponent,
  ],
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>Error Handling</h2>
        <p class="rxa-demo-subtitle">
          Shows <code>*rxLet</code>'s error template and rx-context class names
          when the source observable throws.
        </p>
      </div>
      <rxa-docs-link
        docs="packages/template/reference/rx-let"
        source="apps/demos/src/app/features/template/rx-let"
      />
    </header>
    <mat-card class="card">
      <mat-card-content>
        <div
          [class.let-error]="e"
          *rxLet="numbers$; let r; let e = error; suspense: suspenseView"
        >
          @if (e) {
            <div class="error-message">
              {{ e }}
            </div>
          }
          <mat-form-field>
            <label>Age</label>
            <input
              type="text"
              [value]="r"
              (input)="numbersSubject$.next($event.target?.value)"
              matInput
            />
          </mat-form-field>
          <br />
          <button mat-raised-button color="primary">Send</button>
        </div>

        <ng-template #suspenseView>
          <rxa-form-ghost></rxa-form-ghost>
        </ng-template>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button [unpatch] (click)="numbersSubject$.next('0')">
          init
        </button>
        <button mat-button [unpatch] (click)="numbersSubject$.next('-1')">
          error
        </button>
        <button mat-button [unpatch] (click)="reset()">reset</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
      mat-card-content {
        min-height: 10rem;
      }

      .card {
        margin: 2rem;
        width: 20rem;
      }

      .error-message {
        border: 1px solid var(--rxa-danger);
        border-radius: var(--rxa-radius-sm);
        background-color: var(--rxa-danger-bg);
        color: var(--rxa-danger);
        position: absolute;
        top: 100%;
        left: 50%;
        text-align: center;
        z-index: 10;
        padding: 10px;
        margin: -25% -25%;
        display: block;
        line-height: 45px;
      }

      .let-error {
        position: relative;
      }

      .let-error input {
        transform: scale(1) rotate(2deg) !important;
      }

      .let-error input {
        transform: scale(1) rotate(4deg) !important;
      }

      .let-error mat-form-field {
        color: red;
        border-color: red;
        transform: scale(1) rotate(-2deg) !important;
      }

      .let-error .mat-button-base {
        transform: scale(1) rotate(5deg) !important;
      }
    `,
  ],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorHandlingComponent {
  private cdRef = inject(ChangeDetectorRef);

  numbersSubject$ = new Subject<string>();
  numbers$: Observable<number> = this.setup();

  setup(): Observable<number> {
    return this.numbersSubject$.pipe(
      map((s) => {
        const n = parseInt(s, 10);
        if (n === -1 || isNaN(n)) {
          throw new Error('useless information');
        }
        return n;
      }),
      scan((a, n) => (n === 0 ? ++a : n)),
      share(),
    );
  }

  reset() {
    this.numbers$ = this.setup();
    this.cdRef.detectChanges();
  }
}
