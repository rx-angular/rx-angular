import { Component, Input } from '@angular/core';
import { defer, isObservable, Observable, of, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, pluck, switchAll, switchMap, tap } from 'rxjs/operators';
import { Hooks } from '../../hooks';

@Component({
  selector: 'rxa-visualizer',
  template: `
    <div class="d-flex">
      <rxa-dirty-check style="margin-right: 1rem"></rxa-dirty-check>
      <rxa-renders [value$]="valuesO$"></rxa-renders>
    </div>
    <ng-content select="[visualizerHeader]">
    </ng-content>
    <div class="w-100 h-100 d-flex align-items-center justify-content-center flex-grow-1">
      <ng-content>
      </ng-content>
    </div>
  `,
  styles: [`
    :host {
      outline: 1px solid green;
    }
  `],
  host: {
    '[style.width.px]': 'size',
    class: 'd-flex flex-column w-100 m-1 p-1'
  }
})
export class VisualizerComponent extends Hooks {
  @Input()
  size;

  @Input()
  radius = 40;

  changeO$ = new ReplaySubject<Observable<any>>(1);

  @Input()
  set value$(v$: Observable<any> | any) {
    if (isObservable(v$)) {
      this.changeO$.next(v$);
    } else {
      this.changeO$.next(of(v$));
    }
  };

  @Input() key;

  valuesO$ = defer(() => this.afterViewInit$.pipe(
    switchMap(() => this.changeO$.pipe(
      distinctUntilChanged(),
      switchMap(o$ => !!this.key ? o$.pipe(pluck(this.key)) : o$),
      distinctUntilChanged(),
      tap(v => console.log('value', v))
      )
    ))
  );

  constructor() {
    super();
  }

}
