import {
  ActionDispatchersOf,
  ActionObservables,
  Actions,
  ActionTransforms,
} from './types';

export function getActionsWithTransforms<T extends Actions>(
  transforms?: ActionTransforms<T>
) {
  return {} as ActionObservables<T> &
    ActionDispatchersOf<T, ActionTransforms<T>>;
}

type UIActions = {
  search: string;
  toggle: boolean;
};

const uIActionsTransforms = {
  search: (v: string | boolean | number) => '',
};
const actions2 = getActionsWithTransforms<UIActions>(uIActionsTransforms);
// actions2.search(); // error
actions2.search(true);
actions2.search('');
actions2.search(6);
// actions2.search({});  // error
actions2.search$.subscribe();
// actions2.toggle(); // error
// actions2.toggle(3); // error
actions2.toggle(true);
actions2.toggle$.subscribe();

