import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'rxa-rx-let-vs-push',
  template: `
    <h1>RxLet vs Push</h1>
    <div style="margin-bottom: 16px">
      <button mat-raised-button color="primary" (click)="toggleLet()">
        Toggle let
      </button>
      <button
        mat-raised-button
        color="primary"
        style="margin-left: 8px"
        (click)="togglePush()"
      >
        Toggle push
      </button>
    </div>

    <div class="row w-100">
      <div class="col-sm-12 col-md-6" *ngIf="showPush">
        <button mat-raised-button color="primary" (click)="toggleLoadingPush()">
          Toggle loading for Push
        </button>
        <p *ngIf="pushLoading$ | push; else pushContent">Loading...</p>
        <ng-template #pushContent>
          <rxa-rendering-work [factor]="10"></rxa-rendering-work>
        </ng-template>
      </div>
      <div class="col-sm-12 col-md-6" *ngIf="showLet">
        <button mat-raised-button color="primary" (click)="toggleLoadingLet()">
          Toggle loading for Let
        </button>
        <ng-container
          *rxLet="letLoading$; let letLoading; suspense: suspenseTpl"
        >
          <rxa-rendering-work [factor]="10"></rxa-rendering-work>
        </ng-container>
        <ng-template #suspenseTpl> Loading... </ng-template>
      </div>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class RxLetVsPushComponent {
  showLet = false;
  showPush = false;
  pushLoading$ = new BehaviorSubject<boolean>(true);
  letLoading$ = new Subject<boolean>();
  toggleLet() {
    this.showLet = !this.showLet;
  }

  togglePush() {
    this.showPush = !this.showPush;
  }

  toggleLoadingLet() {
    this.letLoading$.next(false);
  }

  toggleLoadingPush() {
    this.pushLoading$.next(!this.pushLoading$.getValue());
  }
}
