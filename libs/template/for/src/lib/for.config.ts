import { InjectionToken } from '@angular/core';
import { LEGACY_RXFOR_RECONCILIATION_FACTORY } from './provide-legacy-reconciler';
import { RxReconcileFactory } from './reconcile-factory';

/** @internal */
export const INTERNAL_RX_FOR_RECONCILER_TOKEN =
  new InjectionToken<RxReconcileFactory>('rx-for-reconciler', {
    providedIn: 'root',
    factory: LEGACY_RXFOR_RECONCILIATION_FACTORY,
  });
