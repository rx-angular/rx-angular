import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DOCUMENT, inject, InjectionToken, PLATFORM_ID } from '@angular/core';

export const PLATFORM = new InjectionToken('PLATFORM', {
  providedIn: 'platform',
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    const document = inject(DOCUMENT);

    const isServer = isPlatformServer(platformId);
    const isBrowser = isPlatformBrowser(platformId);
    const isServerRenderer = isBrowser && !!document.getElementById('ng-state');

    return { isServer, isBrowser, isServerRenderer };
  },
});

// https://ngxtension.dev/utilities/signals/effect-once-if/
import {
  CreateEffectOptions,
  effect,
  EffectCleanupRegisterFn,
  EffectRef,
  runInInjectionContext,
  untracked,
} from '@angular/core';
import { assertInjector } from './assert-injector';

export function effectOnceIf<T = any>(
  condition: () => T,
  execution: (
    valueFromCondition: NonNullable<T>,
    onCleanup: EffectCleanupRegisterFn,
  ) => void,
  options?: Omit<CreateEffectOptions, 'manualCleanup'>,
): EffectRef {
  const assertedInjector = assertInjector(effectOnceIf, options?.injector);
  return runInInjectionContext(assertedInjector, () => {
    const effectRef = effect((onCleanup) => {
      const hasCondition = condition();
      if (hasCondition) {
        untracked(() => execution(hasCondition, onCleanup));
        effectRef.destroy();
      }
    }, options);
    return effectRef;
  });
}

export type EffectOnceIfConditionFn<T> = Parameters<typeof effectOnceIf<T>>[0];
export type EffectOnceIfExecutionFn<T> = Parameters<typeof effectOnceIf<T>>[1];
export type EffectOnceIfOptions<T> = Parameters<typeof effectOnceIf<T>>[2];
