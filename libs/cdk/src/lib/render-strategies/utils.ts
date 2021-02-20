import { CustomStrategyCredentialsMap } from '../model';

export function mergeStrategies(
  ...strategiesArray: Array<CustomStrategyCredentialsMap<string>>
): CustomStrategyCredentialsMap<string> {
  return strategiesArray.reduce((c, a) => {
    // tslint:disable-next-line:variable-name
    const _a = Array.isArray(a)
      ? strategiesArray.reduce((_c, __a) => ({ ..._c, ...__a }), {})
      : a || {};
    return { ...c, ..._a };
  }, {});
}
