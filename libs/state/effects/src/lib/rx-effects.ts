import {
  assertInInjectionContext,
  DestroyRef,
  ErrorHandler,
  inject,
} from '@angular/core';
import { from, Subscription } from 'rxjs';
import { SideEffectFnOrObserver, SideEffectObservable } from './types';

type RxEffects<T> = {
  register: RegisterFn<T>;
  onDestroy: (fn: Fn) => Fn;
};
type RegisterFn<T> = (
  observable: SideEffectObservable<T>,
  sideEffectOrObserver?: SideEffectFnOrObserver<T>
) => () => void;
type Fn = () => void;

export type RxEffectsSetupFn<T> = (
  cfg: Pick<RxEffects<T>, 'register' | 'onDestroy'>
) => void;

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
export function rxEffects<T>(setupFn?: RxEffectsSetupFn<T>): RxEffects<T> {
  assertInInjectionContext(rxEffects);
  const errorHandler = inject(ErrorHandler, { optional: true });
  const destroyRef = inject(DestroyRef);
  const runningEffects: Subscription[] = [];
  destroyRef.onDestroy(() => runningEffects.forEach((ef) => ef.unsubscribe()));

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
  function register(
    obs$: SideEffectObservable<T>,
    sideEffect?: SideEffectFnOrObserver<T>
  ): () => void {
    const observer =
      typeof sideEffect === 'object'
        ? {
            ...sideEffect,
            // preserve original logic
            error: (e: unknown) => {
              sideEffect?.error(e);
              errorHandler.handleError(e);
            },
          }
        : {
            next: sideEffect,
            error: (e: unknown) => errorHandler.handleError(e),
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

  setupFn?.(effects);

  return effects;
}
