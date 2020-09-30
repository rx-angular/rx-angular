import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RxState } from '../../../../../../../../libs/state/src/lib';
import { from, isObservable, merge, Observable, of, Subject } from 'rxjs';
import { concatAll, concatMap, distinctUntilChanged, map, scan, switchAll, switchMap } from 'rxjs/operators';
import { ngInputAll } from '../../../utils/ngInputAll';
import { animationFrameTick } from '../../../../../../../../libs/template/src/lib/render-strategies/rxjs/scheduling';

interface ProvidedValues {
  random: number
}

@Component({
  selector: 'rxa-value-provider',
  exportAs: 'rxaValueProvider',
  template: `
    <ng-content></ng-content>`,
  host: {
    style: 'display: contents'
  },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValueProviderComponent extends RxState<ProvidedValues> {
  private outerChanges = new Subject<Observable<any>>();

  change$ = new Subject<Event>();
  schedule$ = new Subject<Event>();

  float$ = this.select('random');
  int$ = this.select(map(s => toInt(s.random, this.min, this.max)));
  incremental$ = this.select(scan(inc => ++inc, 0));
  boolean$ = this.select(map(s => toBoolean(s.random, this.truthy)));

  float: number;
  int: number;
  boolean: boolean;

  @Input()
  truthy = 0.5;

  @Input()
  min = 0;

  @Input()
  max = 10;

  @Input()
  set changes$(o$: Observable<any>) {
    this.outerChanges.next(o$);
  }

  updateStatic = (float: number): void => {
    this.float = float;
    this.int = toInt(float, this.min, this.max);
    this.boolean = toBoolean(float,this.truthy);
  }

  constructor() {
    super();
    const outerChanges$ = merge(
      this.outerChanges.pipe(ngInputAll()),
      this.schedule$.pipe(
        switchMap((_) => from(new Array(10).fill(0).map(v => animationFrameTick()))),
        concatAll()
      )
    );
    this.connect('random', merge(this.change$, outerChanges$)
      .pipe(map(toRandom))
    );
    this.hold(this.float$, this.updateStatic);
  }

}

function toInt(float: number, min = 0, max = 10): number {
  // tslint:disable-next-line:no-bitwise
  return ~~(min + float * (max - min));
}

function toRandom(): number {
  return Math.random();
}

function toBoolean(float: number, truthy: number): boolean {
  return float < truthy;
}


