import { EMPTY, isObservable, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, map, merge, mergeAll, startWith, switchAll } from 'rxjs/operators';
import { rxMaterialize, RxNotification, RxTemplateObserver } from '@rx-angular/template';
import {
  applyStrategy,
  nameToStrategyCredentials,
  observeTemplateByNotificationKind,
  StrategyCredentials,
  StrategyCredentialsMap
} from '../render-stragegies';
import { ChangeDetectorRef } from '@angular/core';
import { ngInputFlatten } from '../../utils/ngInputFlatten';

export interface RenderAware<U> {
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: string | Observable<string>) => void;
  nextTemplateTrigger: (trigger$: Observable<RxNotification<U>>) => void;
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
  context: any;
  defaultStrategyName: string;
  strategies: StrategyCredentialsMap;
  getCdRef: (k: RxNotification<U>) => ChangeDetectorRef;
}): RenderAware<U | undefined | null> {

  const strategyName$ = new ReplaySubject<Observable<string>>(1);
  const strategy$: Observable<StrategyCredentials> = strategyName$.pipe(
    ngInputFlatten(),
    startWith(cfg.defaultStrategyName),
    nameToStrategyCredentials(cfg.strategies, cfg.defaultStrategyName)
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
      merge(templateTrigger$ || EMPTY),
      observeTemplateByNotificationKind(cfg.templateObserver),
      applyStrategy(strategy$, cfg.context, cfg.getCdRef),
      catchError(e => {
        console.log(e);
        return EMPTY;
      })
    );

  return {
    nextPotentialObservable(value: Observable<U>): void {
      observablesFromTemplate$.next(value);
    },
    nextStrategy(nextConfig: Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    nextTemplateTrigger(trigger$: Observable<RxNotification<U>>) {
      templateTriggerSubject.next(trigger$);
    },
    rendered$: renderingEffect$ as any
  };
}
