import { CustomStrategyCredentialsMap } from '../model';

export function mergeStrategies<T extends string>(
  ...strategiesArray: Array<CustomStrategyCredentialsMap<T>>
): CustomStrategyCredentialsMap<T> {
  return strategiesArray.reduce((c, a) => {
    // tslint:disable-next-line:variable-name
    const _a = Array.isArray(a)
      ? strategiesArray.reduce((_c, __a) => ({ ..._c, ...__a }), {})
      : a || {};
    return { ...c, ..._a };
  }, {} as any);
}
