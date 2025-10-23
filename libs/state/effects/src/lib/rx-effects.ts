import {
  assertInInjectionContext,
  DestroyRef,
  ErrorHandler,
  inject,
  Injector,
  runInInjectionContext,
} from '@angular/core';
import { from, Subscription } from 'rxjs';
import { SideEffectFnOrObserver, SideEffectObservable } from './types';

interface RxEffects {
  register<T>(
    observable: SideEffectObservable<T>,
    sideEffectOrObserver?: SideEffectFnOrObserver<T>,
  ): Fn;
  onDestroy: (fn: Fn) => Fn;
}

type Fn = () => void;

export type RxEffectsSetupFn = (
  cfg: Pick<RxEffects, 'register' | 'onDestroy'>,
) => void;

export type RxEffectsOptions = {
  injector?: Injector;
};

function getInjectorFromOptions<
  SetupFn extends Function,
  Options extends { injector?: Injector },
>(setupFnOrOptions?: SetupFn | Options, options?: Options) {
  if (options?.injector) {
    return options.injector;
  }
  if (setupFnOrOptions && typeof setupFnOrOptions !== 'function') {
    return setupFnOrOptions.injector;
  }
  return undefined;
}

/**
 * @description
 * Functional way to setup observable based side effects with RxEffects.
 * It's a creation function for RxEffects that destroys itself when the provided
 * `DestroyRef` is destroyed.
 *
 * @example
 * ```ts
 * import { rxEffects } from '@rx-angular/state/effects';
 *
 * \@Component({})
 * export class FooComponent {
 *  const readonly util = inject(Util);
 *  readonly effects = rxEffects(({ register }) => {
 *    register(this.util.windowResize$, () => {
 *      console.log('window was resized');
 *    })
 *  });
 *
 *  ngOnInit() {
 *    this.effects.register(this.util.rotationChanged$, () => {
 *      console.log('viewport rotation changed');
 *    });
 *  }
 * }
 * ```
 *
 * @param {RxEffectsSetupFn} setupFn
 * @returns RxEffects
 *
 * @docsCategory RxEffects
 * @docsPage RxEffects
 *
 */
export function rxEffects(): RxEffects;
export function rxEffects(setupFn: RxEffectsSetupFn): RxEffects;
export function rxEffects(options: RxEffectsOptions): RxEffects;
export function rxEffects(
  setupFn: RxEffectsSetupFn,
  options: RxEffectsOptions,
): RxEffects;
export function rxEffects(
  setupFnOrOptions?: RxEffectsSetupFn | RxEffectsOptions,
  options?: RxEffectsOptions,
): RxEffects {
  const injectorFromOptions = getInjectorFromOptions(setupFnOrOptions, options);
  if (!injectorFromOptions) {
    assertInInjectionContext(rxEffects);
  }

  const injector = injectorFromOptions ?? inject(Injector);

  return runInInjectionContext(injector, () => {
    const errorHandler = inject(ErrorHandler, { optional: true });
    const destroyRef = inject(DestroyRef);
    const runningEffects: Subscription[] = [];
    destroyRef.onDestroy(() =>
      runningEffects.forEach((ef) => ef.unsubscribe()),
    );

    /**
     * Subscribe to observables and trigger side effect.
     *
     * @example
     *
     * /@Component({
     *   template: `<button name="save" (click)="save()">Save</button>`
     * })
     * class ListComponent {
     *   private ef = rxEffects(({register}) => {
     *      register(timer(0, this.backupInterval), console.log));
     *   }
     * }
     *
     * @param {SideEffectObservable} obs$ Source observable input
     * @param {SideEffectFnOrObserver} sideEffect Observer object
     *
     * @return {Function} - unregisterFn
     */
    function register<T>(
      obs$: SideEffectObservable<T>,
      sideEffect?: SideEffectFnOrObserver<T>,
    ): () => void {
      const observer =
        typeof sideEffect === 'object'
          ? {
              ...sideEffect,
              // preserve original logic
              error: (e: unknown) => {
                sideEffect.error?.(e);
                errorHandler?.handleError(e);
              },
            }
          : {
              next: sideEffect,
              error: (e: unknown) => errorHandler?.handleError(e),
            };
      const sub = from(obs$).subscribe(observer);
      runningEffects.push(sub);
      return () => sub.unsubscribe();
    }

    /**
     * Register custom cleanup logic.
     *
     * @example
     *
     * /@Component({
     *   template: `<button name="save" (click)="save()">Save</button>`
     * })
     * class ListComponent {
     *   private ef = rxEffects(({onDestroy}) => {
     *      onDestroy(() => console.log('done'));
     *   }
     * }
     *
     * @param {Fn} callback onDestroy callback
     *
     * @return {Fn} unregisterFn
     */
    function onDestroy(callback: Fn): Fn {
      return destroyRef.onDestroy(callback);
    }

    const effects = {
      register,
      onDestroy,
    };
    if (setupFnOrOptions && typeof setupFnOrOptions === 'function') {
      setupFnOrOptions(effects);
    }

    return effects;
  });
}
