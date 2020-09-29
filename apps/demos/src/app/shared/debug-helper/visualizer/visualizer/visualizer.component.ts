import { Component, Input } from '@angular/core';
import { defer, isObservable, Observable, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, pluck, switchAll, switchMap } from 'rxjs/operators';
import { Hooks } from '../../hooks';

@Component({
  selector: 'rxa-visualizer',
  template: `
    <div class="indicators">
      <rxa-dirty-check [color]="checkColor" [radius]="radius"></rxa-dirty-check>
      <rxa-renders [color]="renderColor" [value$]="valuesO$"></rxa-renders>
    </div>
    <ng-content select="[visualizerHeader]">
    </ng-content>
    <div class="content">
      <ng-content>
      </ng-content>
    </div>
  `,
  styleUrls: ['./visualizer.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[style.width.px]': 'size'
  }
})
export class VisualizerComponent extends Hooks {

  renderColor = 'rgba(255,0,0,0.24)';
  checkColor = 'rgba(253,255,0,0.24)';

  @Input()
  size;

  @Input()
  radius = 10;

  changeO$ = new ReplaySubject<Observable<any>>(1);

  @Input()
  set value$(v$: Observable<any> | any) {
    if (isObservable(v$)) {
      this.changeO$.next(v$);
    } else {
      this.changeO$.next(of(v$));
    }
  };

  @Input()
  key = '';

  valuesO$ = defer(() => this.afterViewInit$.pipe(
    switchMap(() => this.changeO$.pipe(
      distinctUntilChanged(),
      switchAll(),
      pluck(this.key),
      distinctUntilChanged()
      )
    ))
  );

  constructor() {
    super();
  }

}
