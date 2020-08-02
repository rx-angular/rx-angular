import {
  EMPTY,
  NextObserver,
  Observable,
  of,
  ReplaySubject,
  Subscribable,
  Subscription,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { finalizeWithScheduledCD } from './finalizeWithScheduledCD';
import { RenderStrategy, StrategySelection } from './interfaces';
import { nameToStrategy } from './nameToStrategy';

export interface RenderAware<U> extends Subscribable<U> {
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: string | Observable<string>) => void;
  activeStrategy$: Observable<RenderStrategy>;
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
  resetObserver: NextObserver<void>;
  updateObserver: NextObserver<U>;
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
    nameToStrategy(cfg.strategies),
    tap((s) => (currentStrategy = s))
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
        cfg.resetObserver.next();
        if (observable$ === undefined) {
          return of(undefined);
        }
      }
      firstTemplateObservableChange = false;
      return observable$;
    }),
    // forward only observable values
    filter((o$) => o$ !== undefined),
    switchMap((o$) =>
      o$.pipe(
        distinctUntilChanged(),
        tap(cfg.updateObserver),
        currentStrategy.rxScheduleCD,
        finalizeWithScheduledCD(currentStrategy, cfg.updateObserver)
      )
    ),
    catchError((e) => {
      console.error(e);
      return EMPTY;
    })
  );

  return {
    nextPotentialObservable(value: any): void {
      observablesFromTemplate$.next(value);
    },
    nextStrategy(nextConfig: string | Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    activeStrategy$: strategy$,
    subscribe(): Subscription {
      return new Subscription()
        .add(strategy$.subscribe())
        .add(renderingEffect$.subscribe());
    },
  };
}
