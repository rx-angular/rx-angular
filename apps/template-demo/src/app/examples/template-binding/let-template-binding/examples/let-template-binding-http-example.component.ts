import { Component } from '@angular/core';
import { BehaviorSubject, interval, Subject, throwError } from 'rxjs';
import { fromPromise } from 'rxjs/internal-compatibility';
import {
  map,
  share,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators';

@Component({
  selector: 'let-template-binding-http-example',
  template: `
    <mat-card class="card">
      <mat-card-header>
        <h1>HTTP Request</h1>
      </mat-card-header>

      <mat-card-content>
        <div
          *rxLet="
            heroes$;
            let hero;
            strategy: visibleStrategy;
            complete: complete;
            error: error;
            suspense: suspense
          "
        >
          random Star Wars character fetched!
          <h2>{{ hero }}</h2>
        </div>
      </mat-card-content>

      <mat-card-actions>
        <button
          mat-button
          [unpatch]
          *ngIf="!(heroes$ | push)"
          (click)="startFetch()"
        >
          START
        </button>
        <button
          mat-button
          [unpatch]
          *ngIf="heroes$ | push"
          (click)="completeFetch()"
        >
          COMPLETE
        </button>
        <button
          mat-button
          [unpatch]
          *ngIf="heroes$ | push"
          (click)="errorFetch()"
        >
          ERROR
        </button>
      </mat-card-actions>
    </mat-card>

    <ng-template #complete>
      <div>
        <mat-icon class="complete-icon">thumb_up</mat-icon>
        <h2>Completed!</h2>
      </div>
    </ng-template>
    <ng-template #error>
      <div>
        <mat-icon class="error-icon">thumb_down</mat-icon>
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
      mat-card-content {
        min-height: 10rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      mat-icon {
        font-size: 5rem;
        height: initial;
        width: initial;
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
export class LetTemplateBindingHttpExampleComponent {
  visibleStrategy = 'local';
  start$ = new Subject();
  complete$ = new Subject();
  error$ = new BehaviorSubject<Error>(undefined);
  heroes$ = this.start$.pipe(
    switchMap(() => {
      return interval(1500).pipe(
        withLatestFrom(this.error$),
        switchMap(([_, error]) => {
          if (error) {
            return throwError(error);
          } else {
            return fromPromise(
              fetch(
                `https://swapi.dev/api/people/${
                  Math.floor(Math.random() * 50) + 1
                }`
              ).then((a) => a.json())
            );
          }
        }),
        map((hero) => hero.name || hero.detail || 'Not found')
      );
    }),
    share(),
    takeUntil(this.complete$)
  );

  startFetch() {
    this.start$.next();
    this.start$.complete();
  }

  completeFetch() {
    this.complete$.next();
    this.complete$.complete();
  }

  errorFetch() {
    this.error$.next(new Error('Fetch Error!'));
    this.error$.complete();
  }
}
