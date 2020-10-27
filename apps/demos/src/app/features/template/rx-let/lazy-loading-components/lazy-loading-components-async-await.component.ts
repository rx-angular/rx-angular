import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { CdHelper } from '../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-lazy-loading-components-async-await',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h3>Resolving over async/await</h3>
        <button mat-raised-button (click)="toggle();">Toggle</button>
      </div>
      <ng-template #suspenseView>
        <rxa-list-item-ghost></rxa-list-item-ghost>
      </ng-template>
      <ng-container [ngComponentOutlet]="componentAwait" *ngIf="componentAwait; else: suspenseView"></ng-container>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CdHelper]
})
export class LazyLoadingComponentsAsyncAwaitComponent {
  _shouldLoadA = false;
  componentAwait;

  cA = () => import('./lazy-components/lazy-component-a.component').then(c => c.component);
  cB = () => import('./lazy-components/lazy-component-b.component').then(c => c.component);

  constructor(private cdRef: ChangeDetectorRef) {
  }

  toggle() {
    this._shouldLoadA = !this._shouldLoadA;
    this.awaiting(this._shouldLoadA);
  }

  async awaiting(b: boolean) {
    this.componentAwait = await (b ? this.cA() : this.cB());
    this.cdRef.detectChanges();
  }

}
