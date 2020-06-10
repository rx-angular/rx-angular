import {
  BehaviorSubject,
  EMPTY,
  isObservable,
  NextObserver,
  Observable,
  of,
  Subject,
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
import { nameToStrategy } from './nameToStrategy';
import { RenderStrategy, StrategySelection } from './interfaces';

export interface RenderAware<U> extends Subscribable<U> {
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: string | Observable<string>) => void;
}

/**
 * RenderAware
 *
 * @description
 * This abstract class holds all the shared logic for the push pipe and the let directive
 * responsible for change detection
 * If you extend this class you need to implement how the update of the rendered value happens.
 * Also custom behaviour is something you need to implement in the extending class
 */
export function createRenderAware<U>(cfg: {
  strategies: StrategySelection<U>;
  resetObserver: NextObserver<void>;
  updateObserver: NextObserver<U>;
  defaultStrategy: string;
}): RenderAware<U | undefined | null> {
  let strategy: RenderStrategy<U>;
  const strategyName$ = new BehaviorSubject<string | Observable<string>>(
    cfg.defaultStrategy
  );
  const updateStrategyEffect$: Observable<RenderStrategy<
    U
  >> = strategyName$.pipe(
    distinctUntilChanged(),
    switchMap((stringOrObservable) =>
      typeof stringOrObservable === 'string'
        ? of(stringOrObservable)
        : stringOrObservable
    ),
    nameToStrategy(cfg.strategies),
    tap((s) => (strategy = s))
  );

  const observablesFromTemplate$ = new Subject<Observable<U>>();
  const valuesFromTemplate$ = observablesFromTemplate$.pipe(
    distinctUntilChanged()
  );
  const renderingEffect$ = valuesFromTemplate$.pipe(
    // handle null | undefined assignment and new Observable reset
    tap((observable$) => {
      if (observable$ === null) {
        cfg.updateObserver.next(observable$ as any);
      } else {
        cfg.resetObserver.next();
      }
      strategy.renderStatic();
    }),
    // forward only observable values
    filter((o$) => isObservable(o$)),
    switchMap((observable$) => (observable$ == null ? EMPTY : observable$)),
    tap(() => strategy.renderStatic()),
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
    subscribe(): Subscription {
      return new Subscription()
        .add(updateStrategyEffect$.subscribe())
        .add(renderingEffect$.subscribe());
    },
  } as RenderAware<U | undefined | null>;
}
