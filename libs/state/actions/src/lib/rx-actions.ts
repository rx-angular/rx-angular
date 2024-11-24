import {
  assertInInjectionContext,
  DestroyRef,
  ErrorHandler,
  inject,
} from '@angular/core';
import { actionProxyHandler } from './proxy';
import {
  Actions,
  ActionTransforms,
  EffectMap,
  RxActions,
  SubjectMap,
} from './types';

/**
 * Manage events in components and services in a single place
 *
 * @example
 *
 * interface UI {
 *  search: string,
 *  submit: void
 * };
 *
 * import { rxActions } from '@rx-angular/state/actions';
 *
 * @Component({...})
 * export class Component {
 *   ui = rxActions<{ name: string }>(({transforms}) => transforms({name: v => v}));
 *
 *   name$ = this.ui.name$; // Observable<string> - listens to name changes
 *   emitName = this.ui.name; // (name: string) => void - emits name change
 *   sub = this.ui.onName(o$ => o$.pipe(), console.log) // () => void - stops side effect
 *
 *   onInit() {
 *     const name$ = this.ui.name$; // Observable<string> - listens to name changes
 *     const emitName = this.ui.name; // (name: string) => void - emits name change
 *     const stop = this.ui.onName(o$ => o$.pipe(), console.log) // () => void - stops side effect
 *     stop();
 *   }
 *
 * }
 *
 */
export function rxActions<
  T extends Partial<Actions>,
  U extends ActionTransforms<T> = object,
>(setupFn?: (cfg: { transforms: (t: U) => void }) => void): RxActions<T, U> {
  // Assert rxAction usage
  assertInInjectionContext(rxActions);

  const subjectMap: SubjectMap<T> = {} as SubjectMap<T>;
  const effectMap: EffectMap<T> = {} as EffectMap<T>;
  const errorHandler = inject(ErrorHandler);
  let transformsMap = {} as U;

  /**
   * @internal
   * Internally used to clean up potential subscriptions to the subjects. (For Actions it is most probably a rare case but still important to care about)
   */
  inject(DestroyRef).onDestroy(() => {
    Object.values(subjectMap).forEach((subject: any) => subject.complete());
  });

  // run setup function if given
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  setupFn &&
    setupFn({
      transforms: (t: U) => (transformsMap = t),
    });

  // create actions
  function signals(): void {}
  return new Proxy(
    signals as any as RxActions<T, U>,
    actionProxyHandler({
      subjectMap,
      transformsMap,
      effectMap,
      errorHandler,
    }),
  ) as any as RxActions<T, U>;
}
