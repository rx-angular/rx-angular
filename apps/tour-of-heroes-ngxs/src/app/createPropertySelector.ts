import { createSelector } from '@ngxs/store';

type StateClass<T = any> = new (...args: any[]) => T;

type Selector<TModel> = StateClass<any> | ((...arg: any) => TModel);

export type PropertySelectors<TModel> = {
  [P in keyof TModel]: (model: TModel) => TModel[P];
};

export function createPropertySelector<TModel>(
  state: Selector<TModel>
): PropertySelectors<TModel> {
  const cache: Partial<PropertySelectors<TModel>> = {};
  return new Proxy(
    {},
    {
      get(target: any, prop: string) {
        const selector =
          cache[prop] || createSelector([state], (s: TModel) => s[prop]);
        cache[prop] = selector;
        return selector;
      }
    }
  );
}
