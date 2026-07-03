import { JsonPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RxLet } from '@rx-angular/template/let';
import { RxUnpatch } from '@rx-angular/template/unpatch';
import { RxState } from '@rx-angular/state';
import { Observable, Subject, throwError } from 'rxjs';
import { concatMap, share } from 'rxjs/operators';
import { DocsLinkComponent } from '../../../shared/docs-link';

@Component({
  selector: 'rxa-http-errors',
  standalone: true,
  imports: [
    JsonPipe,
    RxLet,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatBadgeModule,
    RxUnpatch,
    DocsLinkComponent,
  ],
  template: `
    <header class="rxa-demo-header">
      <div>
        <h2>HTTP Errors</h2>
        <p class="rxa-demo-subtitle">
          Renders <code>*rxLet</code>'s default template as HTTP error responses
          flow through the bound observable.
        </p>
      </div>
      <rxa-docs-link
        docs="packages/template/reference/rx-let"
        source="apps/demos/src/app/features/template/rx-let"
      />
    </header>
    <mat-card class="card">
      <mat-card-content>
        <div *rxLet="httpResponse$; let r; let e = error">
          <h3 class="rxa-demo-section-title">Default Template</h3>
          R: {{ r | json }} E: {{ e | json }}
        </div>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button [unpatch] (click)="reset()">reset</button>
        <button mat-button [unpatch] (click)="offlineError()">offline</button>
        <button mat-button [unpatch] (click)="authError()">auth</button>
        <button mat-button [unpatch] (click)="accessError()">access</button>
        <button mat-button [unpatch] (click)="serverError()">server</button>
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
    `,
  ],
  providers: [RxState],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HttpErrorsComponent {
  private cdRef = inject(ChangeDetectorRef);

  error$ = new Subject<HttpErrorResponse>();
  httpResponse$: Observable<Error> = this.setup();

  setup(): Observable<HttpErrorResponse> {
    return this.error$.pipe(
      concatMap((e) => throwError(parseError(e))),
      share(),
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
