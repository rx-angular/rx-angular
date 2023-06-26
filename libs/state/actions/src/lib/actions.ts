import { Actions, ActionTransforms, RxActions, SubjectMap } from './types';
import { DestroyRef, ErrorHandler, inject } from '@angular/core';
import { actionProxyHandler } from './proxy';

/**
 * Returns a object based off of the provided typing with a separate setter `[prop](value: T[K]): void` and observable stream `[prop]$: Observable<T[K]>`;
 *
 * { search: string } => { search$: Observable<string>, search: (value: string) => void;}
 *
 * @example
 *
 * interface UIActions {
 *  search: string,
 *  submit: void
 * };
 *
 * const actions = new RxActionFactory<UIActions>().create();
 *
 * actions.search($event.target.value);
 * actions.search$.subscribe();
 *
 * As it is well typed the following things would not work:
 * actions.submit('not void'); // not void
 * actions.search(); // requires an argument
 * actions.search(42); // not a string
 * actions.search$.error(new Error('traraaa')); // not possible by typings as well as in code
 * actions.search = "string"; // not a setter. the proxy will throw an error pointing out that you have to call it
 *
 * @param transforms - A map of transform functions to apply on transformations to actions before emitting them.
 * This is very useful to clean up bloated templates and components. e.g. `[input]="$event?.target?.value"` => `[input]="$event"`
 *
 * @example
 * function coerceSearchActionParams(e: Event | string | number): string {
 *   if(e?.target?.value !== undefined) {
 *      return e?.target?.value + ''
 *   }
 *   return e + '';
 * }
 * const actions = getActions<search: string, submit: void>({search: coerceSearchActionParams, submit: (v: any) => void 0;});
 *
 * actions.search($event);
 * actions.search('string');
 * actions.search(42);
 * actions.submit('not void'); // does not error anymore
 * actions.search$.subscribe(); // string Observable
 *
 */
export function actions<
  T extends Partial<Actions>,
  U extends ActionTransforms<T> = {}
>(transforms?: U): RxActions<T, U> {
  /**
   * @internal
   */
  const subjectMaps: SubjectMap<T>[] = [] as SubjectMap<T>[];
  /**
   * @internal
   */
  const errorHandler = inject(ErrorHandler);

  /**
   * @internal
   * Internally used to clean up potential subscriptions to the subjects. (For Actions it is most probably a rare case but still important to care about)
   */
  inject(DestroyRef).onDestroy(() => {
    subjectMaps.forEach((s) => {
      Object.values(s).forEach((subject: any) => subject.complete());
    });
  });

  const subjectMap: SubjectMap<T> = {} as SubjectMap<T>;
  subjectMaps.push(subjectMap);

  function signals(): void {}

  return new Proxy(
    signals as any as RxActions<T, U>,
    actionProxyHandler({
      subjects: subjectMaps as any,
      transforms,
      errorHandler,
    })
  ) as any as RxActions<T, U>;
}
