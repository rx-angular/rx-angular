import { Component, Input } from '@angular/core';
import { defer, isObservable, Observable, of, ReplaySubject } from 'rxjs';
import { pluck, switchAll, switchMap, tap } from 'rxjs/operators';
import { Hooks } from '../../hooks';

@Component({
  selector: 'rxa-visualizer',
  template: `
    <div class="indicators">
      <rxa-dirty-check [color]="componentColor"></rxa-dirty-check>
      <rxa-renders [color]="itemColor" [value$]="valuesO$"></rxa-renders>
    </div>
    <div class="content">
      <ng-content>
      </ng-content>
    </div>
  `,
  styleUrls: ['./visualizer.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[style.height.px]': 'size',
    '[style.width.px]': 'size'
  }
})
export class VisualizerComponent extends Hooks {

  componentColor = 'rgba(255,0,0,0.24)';
  itemColor = 'rgba(253,255,0,0.24)';

  @Input()
  size = 130;

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
      switchAll(),
      // tap((v) => console.log('key', this.key)),
      tap(v => console.log('value', v)),
      pluck(this.key),

      //  distinctUntilChanged()
      )
    ))
  );

  constructor() {
    super();
  }

}
