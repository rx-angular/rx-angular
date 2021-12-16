import { Observable } from 'rxjs';
import {
  AnyFn,
  ExtractString,
  FirstParamOf,
  InstanceOrTypeOf,
  KeysOf,
} from '../../utils/src/lib/types';

export type Actions = Record<string, any>;

export type ActionDispatchFn<O> = (value: O) => void;
export type ActionDispatchers<T extends Actions> = {
  [K in ExtractString<T>]: ActionDispatchFn<T[K]>;
};

export type ActionObservables<T extends Actions> = {
  [K in ExtractString<T> as `${K}$`]: Observable<InstanceOrTypeOf<T[K]>>;
};

export type ActionAccess<T extends Record<string, unknown>> =
  ActionDispatchers<T> & ActionObservables<T>;

export type ActionTransformFn<O, I = O> = (value: I) => O;
export type ActionTransforms<T> = {
  [K in keyof T]?: ActionTransformFn<T[K], any>;
};

type SearchTransform = ActionTransformFn<string, number | string | boolean>;
//type SearchTransformInputType = FirstParamOf<SearchTransform>;
//type SearchTransformInputType2 = FirstParamOf<SearchTransform, boolean>;
//type SearchTransformInputType4 = FirstParamOf<'SearchTransform', boolean>;
//type SearchTransformOutputType = ReturnType<SearchTransform>;
type UIActionsTransforms = {
  search: SearchTransform;
};

//type UIDispatcherFromUIActionTransforms = DispatcherFromTransformsOf<UIActionsTransforms>;
type DispatcherFromTransformsOf<T extends ActionTransforms<Actions>> = {
  [K in KeysOf<T>]: ActionDispatchFn<FirstParamOf<T[K]>>;
};
type UIActions = {
  search: string;
  toggle: boolean;
};
//type KeysInUIActions = KeysOf<UIActions>;
//type KeysInUIActionTransforms = KeysOf<UIActionsTransforms>;
//type KeysNotInTransforms = KeysNotInTransformsOf<UIActions,UIActionsTransforms>;
type KeysNotInTransformsOf<
  T extends Actions,
  I extends ActionTransforms<Partial<T>>
> = Exclude<KeysOf<T>, KeysOf<I>>;

//type DispatcherFromUIActionsWithoutTransforms = DispatcherFromActionsWithoutTransformsOf<UIActions, UIActionsTransforms>;
export type DispatcherFromActionsWithoutTransformsOf<
  T extends Actions,
  I extends { [K in KeysOf<T>]?: AnyFn }
> = { [K in KeysNotInTransformsOf<T, I>]: ActionDispatchFn<T[K]> };

type UIActionActionDispatchers = ActionDispatchersOf<UIActions, UIActionsTransforms>;
type UIActionActionDispatchers2 = ActionDispatchersOf<UIActions, UIActionsTransforms>['search'];
type UIActionActionDispatchers3 = ActionDispatchersOf<UIActions, UIActionsTransforms>['toggle'];
export type ActionDispatchersOf<T extends Actions, I extends ActionTransforms<T>> = DispatcherFromActionsWithoutTransformsOf<T, I> & DispatcherFromTransformsOf<I>;

export function getActionsWithTransforms<T extends UIActions>(
  transforms?: ActionTransforms<T>
) {
  return {} as ActionObservables<T> &
    ActionDispatchersOf<T, ActionTransforms<T>>;
}
