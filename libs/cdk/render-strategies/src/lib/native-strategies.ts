import { NgZone } from '@angular/core';
import { coalesceWith } from '@rx-angular/cdk/coalescing';
import { getZoneUnPatchedApi } from '@rx-angular/cdk/internals/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import {
  RxCustomStrategyCredentials,
  RxNativeStrategyNames,
  RxStrategyCredentials,
} from './model';

const animationFrameTick = () =>
  new Observable<number>((subscriber) => {
    // use the unpatched API no avoid zone interference
    const id = getZoneUnPatchedApi('requestAnimationFrame')(() => {
      subscriber.next(0);
      subscriber.complete();
    });
    return () => {
      // use the unpatched API no avoid zone interference
      getZoneUnPatchedApi('cancelAnimationFrame')(id);
    };
  });

const localCredentials: RxStrategyCredentials = {
  name: 'local',
  work: (cdRef, _, notification) => {
    cdRef.detectChanges();
  },
  behavior:
    ({ work, scope, ngZone }) =>
    (o$) =>
      o$.pipe(
        coalesceWith(animationFrameTick(), scope as Record<string, unknown>),
        tap(() => (ngZone ? ngZone.run(() => work()) : work()))
      ),
};

const noopCredentials: RxStrategyCredentials = {
  name: 'noop',
  work: () => void 0,
  behavior: () => (o$) => o$,
};

const nativeCredentials: RxStrategyCredentials = {
  name: 'native',
  work: (cdRef) => cdRef.markForCheck(),
  behavior:
    ({ work, ngZone }) =>
    (o$) =>
      o$.pipe(
        tap(() =>
          ngZone && !NgZone.isInAngularZone()
            ? ngZone.run(() => work())
            : work()
        )
      ),
};

export type RxNativeStrategies =
  RxCustomStrategyCredentials<RxNativeStrategyNames>;
export const RX_NATIVE_STRATEGIES: RxNativeStrategies = {
  native: nativeCredentials,
  noop: noopCredentials,
  local: localCredentials,
};
