import { Actions, ActionTransforms, RxActions, SubjectMap } from './types';
import { OnDestroy } from '@angular/core';
import { actionProxyHandler } from './proxy';
import { Subject } from 'rxjs';

/**
 * This class creates RxActions bound to Angular's DI life-cycles. This prevents memorie leaks and optionally makes the instance reusable across the app.
 * The main function here is called
 *
 * @example
 * const factory = new RxActionFactory();
 */
export class RxActionsFactory<T extends Actions> implements OnDestroy {
  private subjects: SubjectMap<T> = {} as SubjectMap<T>;

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
   * const actions = create<UIActions>();
   *
   * actions.search($event.target.value);
   * actions.search$ | async;
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
   * actions.search$ | async; // string Observable
   *
   */
  create<U extends ActionTransforms<T> = {}>(transforms?: U): RxActions<T, U> {
    return new Proxy(
      {} as RxActions<T, U>,
      actionProxyHandler(this.subjects, transforms)
    ) as RxActions<T, U>;
  }

  destroy() {
    Object.values(this.subjects).forEach((subject: Subject<any>) => subject.complete());
  }

  /**
   * internally used to clean up potential subscriptions to the subjects. (For Actions it is most probably a rare case but still important to care about)
   */
  ngOnDestroy() {
    this.destroy();
  }
}

/*
type UIActions = {
  search: string;
  check: number;
};

const uIActionsTransforms = {
  search: (v: string | boolean | number) => '',
};

const hendl = new RxActionFactory<UIActions>();

const z = hendl.create(uIActionsTransforms);

// wrong cases:
const wrongUIActionsTransforms = {
  search: (el: Event | number) => 3, // nope, needs to return string
};
// const gockel = new RxActionFactory<UIActions>(wrongUIActionsTransforms);
const gockel = new RxActionFactory<UIActions>();


const b = gockel.create();

b.search('1000'); // nope, needs to be number or event

// b.search(); // error
b.search(true);
b.search(''); // error
b.search(6);
// b.search({});  // error
b.search$.subscribe();
// b.toggle(); // error
// b.toggle(3); // error
// b.check(); // error
b.check(8);
b.check$.subscribe();
/**/
