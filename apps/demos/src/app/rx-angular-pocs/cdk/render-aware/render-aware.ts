import { ChangeDetectorRef } from '@angular/core';
import { RxCustomStrategyCredentials, RxStrategyCredentials, strategyHandling } from '@rx-angular/cdk/render-strategies';
import { ConnectableObservable, EMPTY, isObservable, Observable, of, ReplaySubject, Subject } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  map,
  merge as mergeWith,
  mergeAll,
  publishReplay,
  switchAll,
} from 'rxjs/operators';

import { RxNotification, RxTemplateObserver } from '../utils/rxjs/Notification';
import { rxMaterialize } from '../utils/rxjs/operators/rx-materialize';

export interface RenderAware<U> {
  strategy$: Observable<RxStrategyCredentials>;
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: string | Observable<string>) => void;
  nextTemplateTrigger: (trigger$: Observable<RxNotification<U>>) => void;
  rendered$: Observable<RxNotification<U>>;
  subscribe: () => void;
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
  defaultStrategyName: string;
  strategies: RxCustomStrategyCredentials<string>;
  getCdRef: (k: RxNotification<U>) => ChangeDetectorRef;
  getContext: (k?: RxNotification<U>) => any;
}): RenderAware<U | undefined | null> {

  const strategyName$ = new ReplaySubject<Observable<string>>(1);
  const strategyHandling$ = strategyHandling(
    cfg.defaultStrategyName,
    cfg.strategies
  );
  const templateTriggerSubject = new Subject<Observable<RxNotification<U>>>();
  const templateTrigger$ = templateTriggerSubject.pipe(
    mergeAll()
  );

  const observablesFromTemplate$ = new ReplaySubject<Observable<U>>(1);
  const renderingEffect$ =
    observablesFromTemplate$.pipe(
      map(o => isObservable(o) ? o : of(o)),
      distinctUntilChanged(),
      switchAll(),
      distinctUntilChanged(),
      rxMaterialize(),
      mergeWith(templateTrigger$ || EMPTY),
      /*observeTemplateByNotificationKind(cfg.templateObserver),
      applyStrategy(strategy$, cfg.getContext, cfg.getCdRef),*/
      catchError(e => {
        console.error(e);
        return EMPTY;
      }),
      publishReplay()
    );

  return {
    strategy$: strategyHandling$.strategy$,
    nextPotentialObservable(value: Observable<U>): void {
      observablesFromTemplate$.next(value);
    },
    nextStrategy(nextConfig: Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    nextTemplateTrigger(trigger$: Observable<RxNotification<U>>) {
      templateTriggerSubject.next(trigger$);
    },
    subscribe: () => {
      return (renderingEffect$ as ConnectableObservable<any>).connect();
    },
    rendered$: renderingEffect$ as any
  };
}
