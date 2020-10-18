import { ChangeDetectionStrategy, Component, ComponentFactoryResolver } from '@angular/core';
import { defer, Subject } from 'rxjs';
import { delay, scan, shareReplay, switchMap } from 'rxjs/operators';
import { RxEffects } from '../../../../shared/rx-effects.service';
import { CdHelper } from '../../../../shared/utils/cd-helper';

@Component({
  selector: 'rxa-lazy-loading-components',
  template: `
    <rxa-visualizer>
      <div visualizerHeader>
        <h2>Lazy Loading Components</h2>
        <mat-button-toggle-group name="visibleExamples"
                                 aria-label="Visible Examples"
                                 [value]="displayStates.all"
                                 #group="matButtonToggleGroup">
          <mat-button-toggle [value]="displayStates.await">Async Await</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.observable">Observable</mat-button-toggle>
          <mat-button-toggle [value]="displayStates.all">All</mat-button-toggle>
        </mat-button-toggle-group>
        <br/>
        <button mat-raised-button (click)="toggleSubject.next();">Toggle</button>
      </div>
      <div class="w-100 row">
        <div class="col" *ngIf="group.value === displayStates.await || group.value === displayStates.all">
          <h3>Resolving over async/await</h3>
          <ng-template #suspenseAwaitView>
            <rxa-list-item-ghost></rxa-list-item-ghost>
          </ng-template>
          <ng-container *ngIf="componentAwait; else: suspenseAwaitView" [ngComponentOutlet]="componentAwait"></ng-container>
        </div>
        <div class="col" *ngIf="group.value === displayStates.observable || group.value === displayStates.all">
          <h3>Resolving over Observable</h3>
          <ng-template #suspenseView>
            <rxa-list-item-ghost></rxa-list-item-ghost>
          </ng-template>
          <ng-container [ngComponentOutlet]="c" *rxLet="component$; let c; rxSuspense:suspenseView"></ng-container>
        </div>
      </div>
    </rxa-visualizer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CdHelper]
})
export class LazyLoadingComponentsComponent extends RxEffects {
  displayStates = {
    await: 0,
    observable: 1,
    all: 2
  };
  toggleSubject = new Subject<boolean>();
  toggle$ = this.toggleSubject.pipe(
    scan(b => !b, false),
    delay(1000)
  );

  componentAwait;

  component$ = this.toggle$.pipe(
      switchMap(b => b ? this.cA() : this.cB()),
      shareReplay(1)
    );

  cA = () => import('./lazy-component-a.component').then(c => c.component);
  cB = () => import('./lazy-component-b.component').then(c => c.component);

  constructor(
    private cdHelper: CdHelper
  ) {
    super();
    this.hold(this.toggle$, (b) => this.awaiting(b));
  }

  async awaiting(b: boolean) {
    this.componentAwait = await (b ? this.cA() : this.cB());
    this.cdHelper.cdRef_detectChanges();
  }

}
