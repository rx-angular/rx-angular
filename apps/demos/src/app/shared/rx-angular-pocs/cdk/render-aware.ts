import { Observable, ReplaySubject, Subscribable } from 'rxjs';
import { startWith, tap } from 'rxjs/operators';
import { rxMaterialize, RxNotification, RxTemplateObserver } from '@rx-angular/template';
import {
  applyStrategy,
  nameToStrategyCredentials,
  StrategyCredentials,
  StrategyCredentialsMap
} from '../render-stragegies';
import { ChangeDetectorRef } from '@angular/core';
import { ngInputFlatten } from '../../utils/ngInputFlatten';

export interface RenderAware<U> {
  nextPotentialObservable: (value: any) => void;
  nextStrategy: (config: string | Observable<string>) => void;
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

  const observablesFromTemplate$ = new ReplaySubject<Observable<U>>(1);
  const renderingEffect$ = observablesFromTemplate$.pipe(
    ngInputFlatten(),
    tap((value: any) => cfg.templateObserver.next(value)),
    rxMaterialize(),
    applyStrategy(strategy$, cfg.context, cfg.getCdRef)
  );

  return {
    nextPotentialObservable(value: Observable<U>): void {
      observablesFromTemplate$.next(value);
    },
    nextStrategy(nextConfig: Observable<string>): void {
      strategyName$.next(nextConfig);
    },
    rendered$: renderingEffect$ as any
  };
}
