import { StrategyCredentialsMap } from './model';
import { getIdleCallbackStrategyCredentialsMap } from './idle-callback';
import { getPostTaskStrategyCredentialsMap } from './post-task';
import { getReactStrategyCredentialsMap } from './react';
import { getChunkStrategyCredentialsMap } from './render-queue/strategy-map';
import { getDetachStrategyCredentialsMap } from './detach/strategy-map';
import { getTestStrategyCredentialsMap } from '../../../features/concepts/coalescing/strategies/strategy-map';

export function getCustomStrategyCredentialsMap(): StrategyCredentialsMap {
  return {
    ...getIdleCallbackStrategyCredentialsMap(),
    ...getPostTaskStrategyCredentialsMap(),
    ...getReactStrategyCredentialsMap(),
    ...getChunkStrategyCredentialsMap(),
    ...getDetachStrategyCredentialsMap(),
    ...getTestStrategyCredentialsMap()
  };
}
