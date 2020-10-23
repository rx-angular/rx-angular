import {
  concat,
  ConnectableObservable,
  isObservable,
  NEVER,
  Observable,
  of,
  OperatorFunction,
  ReplaySubject,
  Subscribable,
  Subscription,
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
  withLatestFrom,
} from 'rxjs/operators';
import { RxNotification, RxTemplateObserver } from '../model';
import { rxMaterialize } from '../utils/rx-materialize';
import { RenderStrategy } from './interfaces';

export interface RenderAware<U> extends Subscribable<U> {
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: RenderStrategy | Observable<RenderStrategy>) => void;
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
  templateObserver: RxTemplateObserver<U>;
}): RenderAware<U | undefined | null> {
  const strategyName$ = new ReplaySubject<
    RenderStrategy | Observable<RenderStrategy>
  >(1);
  let currentStrategy: RenderStrategy;
  const strategy$: Observable<RenderStrategy> = strategyName$.pipe(
    distinctUntilChanged(),
    switchMap((strategyOrObservable) =>
      isObservable(strategyOrObservable)
        ? strategyOrObservable
        : of(strategyOrObservable)
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
    nextStrategy(
      nextConfig: RenderStrategy | Observable<RenderStrategy>
    ): void {
      strategyName$.next(nextConfig);
    },
    rendered$: renderingEffect$,
    activeStrategy$: strategy$,
    subscribe(): Subscription {
      return new Subscription().add(
        (renderingEffect$ as ConnectableObservable<U>).connect()
      );
    },
  };
}

export function renderWithLatestStrategy<T>(
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
        concat(of(renderValue), NEVER).pipe(strategy.rxScheduleCD)
      ),
      startWith(suspenseNotification)
    );
  };
}
