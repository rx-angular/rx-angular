import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-ngif-hack',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <button mat-raised-button (click)="valP.reset()">Reset</button>
        <button mat-raised-button [unpatch] (click)="valP.next()">Next</button>
        <button mat-raised-button [unpatch] (click)="valP.error()">Error</button>
        <button mat-raised-button [unpatch] (click)="valP.complete()">Complete</button>
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
        <mat-icon color="warn">delete</mat-icon>
      </ng-template>

      <ng-template #completeView>
        <mat-icon color="primary">check</mat-icon>
      </ng-template>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgIfHackComponent {

}
