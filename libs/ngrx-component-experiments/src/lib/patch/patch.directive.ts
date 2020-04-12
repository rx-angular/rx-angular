import { ChangeDetectorRef, Directive, ElementRef, Input, NgZone } from '@angular/core';
import { from, fromEvent, of, ReplaySubject } from 'rxjs';
import { filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { RxState } from '@ngx-rx/ngx-rx-state';
import { getStrategies, StrategySelection } from '../core';
import { nameToStrategy } from '../core/cd-aware/nameToStrategy';
import { renderChanges } from '../core/rxjs/operators';

// <p [patch]="['click]"></p>

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[patch]'
})
export class PatchDirective extends RxState<{ events: string[], strategyName: string }> {

  strategies: StrategySelection<any>;

  @Input() set patch(events: string[]) {
    this.setState({ events });
  }

  @Input() set strategy(strategyName: string) {
    this.setState({ strategyName });
  }

  events$ = this.select(
    map(s => s.events),
    filter(events => events.length > 0),
    switchMap(
      events => from(events)
        .pipe(
          mergeMap(event => fromEvent(this.elemRef.nativeElement, event))
        )
    )
  );

  strategy$ = this.select('strategyName').pipe(
    nameToStrategy(this.strategies)
  );


  renderSideEffect$ = this.events$
    .pipe(
      withLatestFrom(this.strategy$),
      switchMap(([event, strategy]) => of(event).pipe(
        tap(renderChanges(strategy))
        )
      )
    );


  constructor(private cdRef: ChangeDetectorRef,
              ngZone: NgZone,
              private elemRef: ElementRef) {
    super();
    this.strategies = getStrategies({
      ngZone, cdRef,
      component: (this.cdRef as any).context
    });
    this.setState({strategyName: 'idle'})
  }

}
