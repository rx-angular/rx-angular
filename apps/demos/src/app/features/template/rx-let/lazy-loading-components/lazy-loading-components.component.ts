import { ChangeDetectionStrategy, Component, ComponentFactoryResolver } from '@angular/core';
import { defer, Subject } from 'rxjs';
import { delay, scan, switchMap } from 'rxjs/operators';

@Component({
  selector: 'rxa-lazy-loading-components',
  template: `
    <div>
      Lazy Loading Components
    </div>
    <button mat-raised-button (click)="toggle$.next()">Toggle</button>
    <ng-container [ngComponentOutlet]="c" *rxLet="component$; let c; suspense:suspenseView"></ng-container>
    <ng-template #suspenseView>
      <rxa-list-item-ghost></rxa-list-item-ghost>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyLoadingComponentsComponent {
  toggle$ = new Subject<boolean>();

  component$ = defer(() => this.toggle$.pipe(
    scan(b => !b, false),
    delay(1000),
    switchMap(b => b ? this.cA$() : this.cB$())
  ));

  cA$ = () => import('./lazy-component-a.component').then(c => c.component);
  cB$ = () => import('./lazy-component-b.component').then(c => c.component);

  constructor(private _componentFactoryResolver: ComponentFactoryResolver) {

  }

}


/*


* */
