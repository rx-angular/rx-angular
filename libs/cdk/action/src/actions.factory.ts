import { RxActions, Actions, ActionTransforms, SubjectMap } from './types';
import { actionProxyHandler } from './proxy';

/**
 * This function, similar to the RxActionFactory class, creates RxActions. In comparison to the class those actions are not bound to Angular' DI.
 * It returns a pair of functions `create` and `destroy` which you can use to create and destroy the actions.
 */
export function rxActionCreator<T extends Actions>() {
  const subjects = {} as SubjectMap<T>;
  return {
    create,
    destroy: (): void => {
      for (let subjectsKey in subjects) {
        subjects[subjectsKey].complete();
      }
    },
  };

  function create<U extends ActionTransforms<T>>(
    transforms: U
  ): RxActions<T, U> {
    return new Proxy(
      {} as RxActions<T, U>,
      actionProxyHandler(subjects, transforms)
    ) as RxActions<T, U>;
  }
}

type UIActions = {
  search: string;
  check: number;
};

const g = rxActionCreator<UIActions>().create({
  search: (v: number) => 'string',
});
g.search(4);
