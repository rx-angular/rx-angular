import { StrategyCredentialsMap } from './model';
import { getIdleCallbackStrategyCredentialsMap } from './idle-callback';
import { getPostTaskStrategyCredentialsMap } from './post-task';
import { getReactStrategyCredentialsMap } from './react';
import { getDetachStrategyCredentialsMap } from './detach/strategy-map';

export function getCustomStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    ...getIdleCallbackStrategyCredentialsMap(),
    ...getPostTaskStrategyCredentialsMap(),
    ...getReactStrategyCredentialsMap(),
    ...getDetachStrategyCredentialsMap()
  };
}
