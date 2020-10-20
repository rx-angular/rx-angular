import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';
import { Subject } from 'rxjs';
import { delay, scan, shareReplay, switchMap } from 'rxjs/operators';

@Component({
  selector: 'rxa-lazy-loading-components-observable',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>Resolving over Observable</h3>
        <button mat-raised-button [unpatch] (click)="toggleSubject.next();">Toggle</button>
      </div>
      <ng-template #suspenseView>
        <rxa-list-item-ghost></rxa-list-item-ghost>
      </ng-template>
      <ng-container [ngComponentOutlet]="c" *rxLet="component$; let c; rxSuspense:suspenseView"></ng-container>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CdHelper]
})
export class LazyLoadingComponentsObservableComponent {
  toggleSubject = new Subject<boolean>();
  toggle$ = this.toggleSubject.pipe(
    scan(b => !b, false),
    delay(1000)
  );

  component$ = this.toggle$.pipe(
    switchMap(b => b ? this.cA() : this.cB()),
    shareReplay(1)
  );

  cA = () => import('./lazy-components/lazy-component-a.component').then(c => c.component);
  cB = () => import('./lazy-components/lazy-component-b.component').then(c => c.component);

}
