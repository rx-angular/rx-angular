import {
  DestroyRef,
  assertInInjectionContext,
  inject,
  ErrorHandler,
} from '@angular/core';
import { RxEffects } from './effects.service';

export type RxEffectsSetupFn = (
  rxEffect: Pick<RxEffects, 'register' | 'registerOnDestroy'>
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
 *  private readonly util = inject(Util);
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
 *
 *
 * @docsCategory RxEffects
 * @docsPage RxEffects
 *
 */
export function rxEffects(setupFn?: RxEffectsSetupFn): RxEffects {
  assertInInjectionContext(rxEffects);
  const errorHandler = inject(ErrorHandler, { optional: true });
  const effects = new RxEffects(errorHandler);
  const destroyRef = inject(DestroyRef);

  destroyRef.onDestroy(() => effects.ngOnDestroy());

  setupFn?.({
    register: effects.register.bind(effects),
    registerOnDestroy: effects.registerOnDestroy.bind(effects),
  });

  return effects;
}
