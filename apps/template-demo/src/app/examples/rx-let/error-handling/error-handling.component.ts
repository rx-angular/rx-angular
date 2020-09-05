import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, scan, share } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'let-error-handling',
  template: `
    <mat-card class="card">

      <mat-card-header>
        <h3>Error Handling <br/>
          <small>error template & rx-context class names</small>
        </h3>
      </mat-card-header>

      <mat-card-content>
        <div
          [ngClass]="{'let-error': e}"
          *rxLet="numbers$;
            let r;
            let e = $error;
            suspense: suspenseView
            "
        >
          <div *ngIf="e" class="error-message">
            {{e}}
          </div>
          <mat-form-field>
            <label>Age</label>
            <input
              type="text"
              [value]="r"
              (input)="numbersSubject$.next($event.target?.value)"
              matInput/>
          </mat-form-field>
          <br/>
          <button mat-raised-button>Send</button>
        </div>

        <ng-template #suspenseView>
          <form-ghost></form-ghost>
        </ng-template>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button [unpatch] (click)="numbersSubject$.next('0')">
          init
        </button>
        <button mat-button [unpatch] (click)="numbersSubject$.next('-1')">
          error
        </button>
        <button mat-button [unpatch] (click)="reset()">
          reset
        </button>
      </mat-card-actions>

    </mat-card>
  `,
  styles: [`
    mat-card-content {
      min-height: 10rem;
    }

    .card {
      margin: 2rem;
      width: 20rem;
    }

    .error-message {
      border: 1px solid red;
      background-color: rgba(211, 211, 211, 0.7);
      color: red;
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

  `],
  providers: [RxState]
})
export class ErrorHandlingComponent {
  numbersSubject$ = new Subject<string>();
  numbers$: Observable<number> = this.setup();

  constructor(private cdRef: ChangeDetectorRef) {
  }

  setup(): Observable<number> {
    return this.numbersSubject$.pipe(
      map(s => {
        const n = parseInt(s, 10);
        if (n === -1 || isNaN(n)) {
          throw new Error('useless information');
        }
        return n;
      }),
      scan((a, n) => n === 0 ? ++a : n),
      share()
    );
  }

  reset() {
    this.numbers$ = this.setup();
    this.cdRef.detectChanges();
  }

}
