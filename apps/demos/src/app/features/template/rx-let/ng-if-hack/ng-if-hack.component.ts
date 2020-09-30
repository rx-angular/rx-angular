import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-demo-basics',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <button mat-raised-button [unpatch] (click)="valP.reset$.next()">Reset</button>
        <button mat-raised-button [unpatch] (click)="valP.next$.next()">Next</button>
        <button mat-raised-button [unpatch] (click)="valP.error$.next()">Error</button>
        <button mat-raised-button [unpatch] (click)="valP.complete$.next()">Complete</button>
      </div>
      <rxa-value-provider #valP="rxaValueProvider"></rxa-value-provider>

      <ng-container *rxLet="valP.incremental$; let value;
          let e = error;
          let c = complete;
          suspense: suspenseView;
          error: errorView;
          complete: completeView
        ">
        next: {{ value | json }}<br/>
      </ng-container>
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
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgIfHackComponent {

}
