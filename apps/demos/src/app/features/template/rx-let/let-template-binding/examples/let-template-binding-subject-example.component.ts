import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RxLet } from '@rx-angular/template/let';
import { RxPush } from '@rx-angular/template/push';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';
import { ToStringPipe } from '../to-string.pipe';

@Component({
  selector: 'rxa-let-template-binding-subject-example',
  standalone: true,
  imports: [
    JsonPipe,
    RxLet,
    RxPush,
    RxUnpatch,
    ToStringPipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
  ],
  template: `
    <mat-card class="card">
      <mat-card-header>
        <h1>Subject</h1>
        <button class="btn-reset" mat-button (click)="reset()">
          <mat-icon>refresh</mat-icon>RESET
        </button>
      </mat-card-header>

      <mat-card-content>
        <div
          *rxLet="
            signals$;
            let count;
            strategy: visibleStrategy;
            complete: complete;
            error: error;
            suspense: suspense
          "
        >
          value emitted
          <h2>{{ count | json }}</h2>
        </div>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button [unpatch] (click)="signals$.complete()">
          COMPLETE
        </button>
        <button
          mat-button
          [matBadge]="signalsCount$ | push | toString"
          [matBadgeHidden]="(signalsCount$ | push) === 0"
          [unpatch]
          (click)="signals$.next(random())"
        >
          NEXT
        </button>
        <button mat-button [unpatch] (click)="signals$.error(errorStub)">
          ERROR
        </button>
      </mat-card-actions>
    </mat-card>

    <ng-template #complete let-value>
      <div>
        <mat-icon class="notification-icon complete-icon">thumb_up</mat-icon>
        <h2>Completed!</h2>
        <strong>Last valid value: {{ value }}</strong>
      </div>
    </ng-template>
    <ng-template #error let-value let-error="$error">
      <div>
        <mat-icon class="error-icon">thumb_down</mat-icon>
        <h2>{{ error }}</h2>
        <strong>Last valid value: {{ value }}</strong>
      </div>
    </ng-template>
    <ng-template #suspense>
      <mat-progress-spinner
        [diameter]="80"
        [color]="'primary'"
        [mode]="'indeterminate'"
      ></mat-progress-spinner>
    </ng-template>
  `,
  styles: [
    `
      h1 {
        margin: 0;
      }

      mat-card-content {
        min-height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .notification-icon {
        font-size: 5rem;
        height: initial;
        width: initial;
      }

      .btn-reset {
        margin-left: 2rem;
      }

      .card {
        margin: 2rem;
        text-align: center;
        width: 20rem;
      }

      .complete-icon {
        color: forestgreen;
      }

      .error-icon {
        color: darkred;
      }
    `,
  ],
})
export class LetTemplateBindingSubjectExampleComponent {
  errorStub = new Error('Template observable error!');
  visibleStrategy = 'local';
  signals$: Subject<number>;
  signalsCount$: Observable<number>;

  constructor() {
    this.reset();
  }

  random() {
    return Math.random();
  }

  reset() {
    this.signals$ = new Subject<any>();
    this.signalsCount$ = this.signals$.pipe(
      scan((acc) => acc + 1, 0),
      startWith(0),
    );
  }
}
