import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';

import { Subject } from 'rxjs';
import { getStrategies } from '@rx-angular/template';
import { RxState } from '@rx-angular/state';

@Component({
  selector: 'demo-basics',
  template: `
    <button mat-raised-button [unpatch] (click)="reset.next()">Reset</button>
    <button mat-raised-button [unpatch] (click)="next.next()">Next</button>
    <button mat-raised-button [unpatch] (click)="error.next()">Error</button>
    <button mat-raised-button [unpatch] (click)="complete.next()">Complete</button>
    <renders></renders>
    <br />
    <ng-container *rxLet="value$; let value;
          let e = error;
          let c = complete;
          suspense: suspenseView;
          error: errorView;
          complete: completeView
        ">
      next: {{ value | json }}<br />
    </ng-container>

    <!--

    -->

    <ng-template #suspenseView>
      <ngx-skeleton-loader
        [count]="3"
        [appearance]="'circle'"
      ></ngx-skeleton-loader>
      <ngx-skeleton-loader [count]="3"></ngx-skeleton-loader>
      <ngx-skeleton-loader
        [count]="3"
        [appearance]="'circle'"
      ></ngx-skeleton-loader>
      <ngx-skeleton-loader [count]="3"></ngx-skeleton-loader>
    </ng-template>

    <ng-template #errorView>
      <mat-icon>delete</mat-icon>
    </ng-template>

    <ng-template #completeView>
      <mat-icon>check</mat-icon>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class NgIfHackComponent {
  reset = new Subject();
  next = new Subject();
  error = new Subject();
  complete = new Subject();

  strategy$ = new Subject();
  strategies = Object.keys(getStrategies({ cdRef: { context: {} } } as any));

  value$ = new Subject();

  constructor(private s: RxState<any>, cdRef: ChangeDetectorRef) {
    this.s.hold(this.reset, () => {
      this.value$ = new Subject();
      cdRef.detectChanges();
    });

    this.s.hold(this.next, () => {
      this.value$.next(Math.random() > 0.5);
    });

    this.s.hold(this.error, () => {
      this.value$.error(new Error('Boom!!!'));
    });

    this.s.hold(this.complete, () => {
      this.value$.complete();
    });
  }
}
