import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { scan, startWith } from 'rxjs/operators';

@Component({
  selector: 'let-template-binding-subject-example',
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

    <ng-template #complete>
      <div>
        <mat-icon class="notification-icon complete-icon">thumb_up</mat-icon>
        <h2>Completed!</h2>
      </div>
    </ng-template>
    <ng-template #error>
      <div>
        <mat-icon class="notification-icon error-icon">thumb_down</mat-icon>
        <h2>Something went wrong...</h2>
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
        margin-left: 6rem;
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
      startWith(0)
    );
  }
}
