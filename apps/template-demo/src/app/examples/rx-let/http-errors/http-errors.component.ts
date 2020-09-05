import { ChangeDetectorRef, Component } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { concatMap, share, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'http-errors',
  template: `
    <mat-card class="card">
      <mat-card-header>
        <h1>HTTP Errors</h1>
      </mat-card-header>

      <mat-card-content>
        <div *rxLet="httpResponse$;
            let r;
            let e = $error;
            ">
          <h2>Default Template</h2>
          R: {{ r | json }}
          E: {{ e | json }}
        </div>

      </mat-card-content>

      <mat-card-actions>
        <button mat-button [unpatch] (click)="reset()">
          reset
        </button>
        <button mat-button [unpatch] (click)="offlineError()">
          offline
        </button>
        <button mat-button [unpatch] (click)="authError()">
          auth
        </button>
        <button mat-button [unpatch] (click)="accessError()">
          access
        </button>
        <button mat-button [unpatch] (click)="serverError()">
          server
        </button>
      </mat-card-actions>
    </mat-card>



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
    `
  ],
  providers: [RxState]
})
export class HttpErrorsComponent {
  error$ = new Subject<HttpErrorResponse>();
  httpResponse$: Observable<Error> = this.setup();

  constructor(private cdRef: ChangeDetectorRef) {
  }

  setup(): Observable<HttpErrorResponse> {
    return this.error$.pipe(
      concatMap(e => throwError(parseError(e))),
      share()
    );
  }

  reset() {
    this.httpResponse$ = this.setup();
    this.cdRef.detectChanges();
  }

  offlineError() {
    this.error$.next(new HttpErrorResponse({ status: 0 }));
  }

  authError() {
    this.error$.next(new HttpErrorResponse({ status: 401 }));
  }

  accessError() {
    this.error$.next(new HttpErrorResponse({ status: 403 }));
  }

  serverError() {
    this.error$.next(new HttpErrorResponse({ status: 501 }));
  }

}

function parseError(e: HttpErrorResponse): string {
  if (e.status === 0) {
    return 'Offline Error!';
  }
  if (e.status === 401) {
    return 'Auth Error!';
  }
  if (e.status === 403) {
    return 'Access Error!';
  }
  if (e.status === 501) {
    return 'Server Error!';
  }
  return 'Unknown Error';
}
