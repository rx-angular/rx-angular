import { Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'rxa-rx-let-vs-push',
  template: `
    <h1>Push vs RxLet</h1>
    <div class="row w-100">
      <div class="col-sm-12 col-md-6">
        <div style="margin-bottom: 16px">
          <button
            mat-raised-button
            color="primary"
            (click)="togglePushAutoTest()"
          >
            Run Auto test for Push pipe (Start performance profiler beforehand)
          </button>
        </div>
        <div style="margin-bottom: 16px">
          <button mat-raised-button color="secondary" (click)="togglePush()">
            Open Manual test for Push pipe
          </button>
        </div>
        <rxa-list-toggle-test-component
          *ngIf="showPushAutoTest"
          type="push"
          [auto]="true"
        ></rxa-list-toggle-test-component>
        <rxa-list-toggle-test-component
          *ngIf="showPush"
          type="push"
          [auto]="false"
        ></rxa-list-toggle-test-component>
      </div>

      <div class="col-sm-12 col-md-6">
        <div style="margin-bottom: 16px">
          <button
            mat-raised-button
            color="primary"
            (click)="toggleLetAutoTest()"
          >
            Run Auto test for Let directive (Start performance profiler
            beforehand)
          </button>
        </div>
        <div style="margin-bottom: 16px">
          <button mat-raised-button color="secondary" (click)="toggleLet()">
            Open Manual test for Let directive
          </button>
        </div>
        <rxa-list-toggle-test-component
          *ngIf="showLetAutoTest"
          type="let"
          [auto]="true"
        ></rxa-list-toggle-test-component>
        <rxa-list-toggle-test-component
          *ngIf="showLet"
          type="let"
          [auto]="false"
        ></rxa-list-toggle-test-component>
      </div>
    </div>
  `,
  changeDetection: environment.changeDetection,
})
export class RxLetVsPushComponent {
  showLetAutoTest = false;
  showLet = false;
  showPushAutoTest = false;
  showPush = false;
  letLoading$ = new Subject<boolean>();

  togglePush() {
    this.showPush = !this.showPush;
  }
  togglePushAutoTest() {
    this.showPushAutoTest = !this.showPushAutoTest;
  }

  toggleLet() {
    this.showLet = !this.showLet;
  }
  toggleLetAutoTest() {
    this.showLetAutoTest = !this.showLetAutoTest;
  }
}
