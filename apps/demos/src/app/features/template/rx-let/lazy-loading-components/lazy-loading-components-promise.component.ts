import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { from } from 'rxjs';

@Component({
  selector: 'rxa-lazy-loading-components-promise',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>Resolving over Promise</h3>
        <button mat-raised-button (click)="toggle();">Toggle</button>
      </div>
    <ng-template #suspenseView>
      <rxa-list-item-ghost></rxa-list-item-ghost>
    </ng-template>
    <ng-container [ngComponentOutlet]="c" *rxLet="componentPromise; let c; rxSuspense:suspenseView"></ng-container>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyLoadingComponentsPromiseComponent {
  _isComponentA = false;
  componentPromise;

  cA = () => import('./lazy-components/lazy-component-a.component').then(c => c.component);
  cB = () => import('./lazy-components/lazy-component-b.component').then(c => c.component);

  constructor(private cdRef: ChangeDetectorRef) {
  }

  toggle() {
    this._isComponentA = !this._isComponentA;
    this.componentPromise = from((this._isComponentA ? this.cA() : this.cB()));
  }

}
