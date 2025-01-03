import { ErrorHandler, Injectable, OnDestroy, Optional } from '@angular/core';
import { Subject } from 'rxjs';
import { actionProxyHandler } from './proxy';
import { Actions, ActionTransforms, EffectMap, RxActions } from './types';

type SubjectMap<T> = { [K in keyof T]: Subject<T[K]> };

/**
 * @deprecated - use rxActions instead
 *
 * This class creates RxActions bound to Angular's DI life-cycles. This prevents memory leaks and optionally makes the instance reusable across the app.
 * The function has to be used inside an injection context.
 * If the consumer gets destroyed also the actions get destroyed automatically.
 *
 * @example
 * @Component({
 *   standalone: true,
 *   template: `...`,
 * })
 * export class AnyComponent {
 *   ui = rxActions<{search: string, refresh: void}>();
 * }
 */
@Injectable()
export class RxActionFactory<T extends Partial<Actions>> implements OnDestroy {
  private subjects: SubjectMap<T>[] = [] as SubjectMap<T>[];

  constructor(@Optional() private readonly errorHandler?: ErrorHandler) {}

  /*
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
  create<U extends ActionTransforms<T> = object>(
    transforms?: U,
  ): RxActions<T, U> {
    const subjectMap: SubjectMap<T> = {} as SubjectMap<T>;
    const effectMap: EffectMap<T> = {} as EffectMap<T>;
    this.subjects.push(subjectMap);

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    function signals(): void {}

    return new Proxy(
      signals as any as RxActions<T, U>,
      actionProxyHandler({
        subjectMap,
        effectMap,
        transformsMap: transforms,
        errorHandler: this.errorHandler ?? null,
      }),
    ) as any as RxActions<T, U>;
  }

  destroy() {
    this.subjects.forEach((s) => {
      Object.values(s).forEach((subject: any) => subject.complete());
    });
  }

  /**
   * @internal
   * Internally used to clean up potential subscriptions to the subjects. (For Actions it is most probably a rare case but still important to care about)
   */
  ngOnDestroy() {
    this.destroy();
  }
}
