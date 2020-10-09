import {
  ConnectableObservable,
  Observable,
  of,
  OperatorFunction,
  ReplaySubject,
  Subscribable,
  Subscription
} from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  publish,
  shareReplay,
  startWith,
  switchMap,
  tap,
  withLatestFrom
} from 'rxjs/operators';
import { RxNotification, RxTemplateObserver } from '../model';
import { rxMaterialize } from '../utils/rx-materialize';
import { RenderStrategy, StrategySelection } from './interfaces';

export interface RenderAware<U> extends Subscribable<U> {
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: string | Observable<string>) => void;
  activeStrategy$: Observable<RenderStrategy>;
  rendered$: Observable<RxNotification<U>>;
}

/**
 * RenderAware
 *
 * @description
 * This function returns an object that holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
export function createRenderAware<U>(cfg: {
  strategies: StrategySelection;
  templateObserver: RxTemplateObserver<U>;
}): RenderAware<U | undefined | null> {
  const strategyName$ = new ReplaySubject<string | Observable<string>>(1);
  let currentStrategy: RenderStrategy;
  const strategy$: Observable<RenderStrategy> = strategyName$.pipe(
    distinctUntilChanged(),
    switchMap((stringOrObservable) =>
      typeof stringOrObservable === 'string'
      ? of(stringOrObservable)
      : stringOrObservable
    ),
    map((strategy: string): RenderStrategy => {
        const s = cfg.strategies[strategy];
        if (!!s) {
          return s;
        }
        throw new Error(`Strategy ${ strategy } does not exist.`);
      }
    ),
    tap((s) => (currentStrategy = s)),
    // do not repeat the steps before for each subscriber
    shareReplay({ bufferSize: 1, refCount: true })
  );

  const observablesFromTemplate$ = new ReplaySubject<Observable<U>>(1);
  const valuesFromTemplate$ = observablesFromTemplate$.pipe(
    distinctUntilChanged()
  );
  let firstTemplateObservableChange = true;

  const renderingEffect$ = valuesFromTemplate$.pipe(
    // handle null | undefined assignment and new Observable reset
    map((observable$) => {
      if (observable$ === null) {
        return of(null);
      }
      if (!firstTemplateObservableChange) {
        cfg.templateObserver.suspense();
        if (observable$ === undefined) {
          return of(undefined);
        }
      }
      firstTemplateObservableChange = false;
      return observable$;
    }),
    // forward only observable values
    filter((o$) => o$ !== undefined),
    distinctUntilChanged(),
    switchMap((o$) =>
      o$
        // Added behavior will get applied to the observable in `renderWithLatestStrategy`
        .pipe(
          // Forward only distinct values
          distinctUntilChanged(),
          // Update completion, error and next
          tap(cfg.templateObserver),
          renderWithLatestStrategy(strategy$)
        )
    ),
    publish()
  );

  return {
    nextPotentialObservable(value: any): void {
      observablesFromTemplate$.next(value);
    },
    nextStrategy(nextConfig: string | Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    rendered$: renderingEffect$,
    activeStrategy$: strategy$,
    subscribe(): Subscription {
      return new Subscription().add((renderingEffect$ as ConnectableObservable<U>).connect());
    },
  };
}


function renderWithLatestStrategy<T>(
  strategyChanges$: Observable<RenderStrategy>
): OperatorFunction<T, RxNotification<T>> {
  const suspenseNotification: RxNotification<T> = {
    kind: 'rxSuspense',
    value: undefined,
    hasValue: false,
    error: undefined,
  };
  return (o$) => {
    return o$.pipe(
      rxMaterialize(),
      withLatestFrom(strategyChanges$),
      // always use latest strategy on value change
      switchMap(([renderValue, strategy]) =>
        of(renderValue).pipe(strategy.rxScheduleCD)
      ),
      startWith(suspenseNotification),
    );
  };
}
