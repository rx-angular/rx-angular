export {
  RX_CONCURRENT_STRATEGIES,
  RxConcurrentStrategies,
} from './lib/concurrent-strategies';
export {
  provideRxRenderStrategies,
  RX_RENDER_STRATEGIES_CONFIG,
  RxRenderStrategiesConfig,
} from './lib/config';
export { ScheduleOnStrategyOptions } from './lib/model';
export { RxStrategies } from './lib/model';
export { RxStrategyNames } from './lib/model';
export { RxDefaultStrategyNames } from './lib/model';
export { RxConcurrentStrategyNames } from './lib/model';
export { RxNativeStrategyNames } from './lib/model';
export { RxCustomStrategyCredentials } from './lib/model';
export { RxStrategyCredentials } from './lib/model';
export { RxRenderBehavior } from './lib/model';
export { RxRenderWork } from './lib/model';
export {
  RX_NATIVE_STRATEGIES,
  RxNativeStrategies,
} from './lib/native-strategies';
export { onStrategy } from './lib/onStrategy';
export { strategyHandling } from './lib/strategy-handling';
export { RxStrategyProvider } from './lib/strategy-provider.service';
export {
  ɵprovideConcurrentSchedulerConfig as provideConcurrentSchedulerConfig,
  ɵwithInputPending as withExperimentalInputPending,
  ɵwithFramerate as withFramerate,
} from '@rx-angular/cdk/internals/scheduler';
