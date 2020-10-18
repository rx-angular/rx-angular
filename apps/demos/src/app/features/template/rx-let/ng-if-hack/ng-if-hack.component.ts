import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rxa-ngif-hack',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <rxa-value-provider [buttons]="true" #valP="rxaValueProvider"></rxa-value-provider>
      </div>

      {{ valP.boolean$ | push | json }}
      <!--
       <ng-container *ngIf="valP.boolean$ | push as value">
         next: {{ value | json }}<br/>
       </ng-container>

             <ng-container *rxLet="valP.boolean$; let value;
                 let e = rxError;
                 let c = rxComplete;
                 rxSuspense: suspenseView;
                 rxError: errorView;
                 rxComplete: completeView
               ">
               next: {{ value | json }}<br/>
             </ng-container>
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
