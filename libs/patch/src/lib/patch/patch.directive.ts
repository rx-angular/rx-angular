import { ChangeDetectorRef, Directive, ElementRef, Input } from '@angular/core';
import { from, fromEvent, of } from 'rxjs';
import {
  filter,
  map,
  mergeMap,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { RxState } from '@ngx-rx/state';
import {
  getStrategies,
  nameToStrategy,
  StrategySelection
} from '@ngx-rx/rxjs-etc';
import { renderChange } from '@ngx-rx/render-changes';

// <p [patch]="['click]"></p>

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[patch]'
})
export class PatchDirective extends RxState<{
  events: string[];
  strategyName: string;
}> {
  strategies: StrategySelection<any>;

  @Input() set patch(events: string[]) {
    this.set({ events });
  }

  @Input() set patchStrategy(strategyName: string) {
    this.set({ strategyName });
  }

  events$ = this.select(
    map(s => s.events),
    filter(events => events.length > 0),
    switchMap(events =>
      from(events).pipe(
        mergeMap(event => fromEvent(this.elemRef.nativeElement, event))
      )
    )
  );

  strategy$ = this.select('strategyName').pipe(nameToStrategy(this.strategies));

  renderSideEffect$ = this.events$.pipe(
    withLatestFrom(this.strategy$),
    switchMap(([event, strategy]) =>
      of(event).pipe(tap(renderChange(strategy)))
    )
  );

  constructor(private cdRef: ChangeDetectorRef, private elemRef: ElementRef) {
    super();
    this.strategies = getStrategies({ cdRef });
    this.set({ strategyName: 'native' });
  }
}
