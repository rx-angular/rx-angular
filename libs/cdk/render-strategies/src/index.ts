export type { RxConcurrentStrategies } from './lib/concurrent-strategies';
export { RX_CONCURRENT_STRATEGIES } from './lib/concurrent-strategies';
export type { RxRenderStrategiesConfig } from './lib/config';
export {
  provideRxRenderStrategies,
  RX_RENDER_STRATEGIES_CONFIG,
} from './lib/config';
export type { ScheduleOnStrategyOptions } from './lib/model';
export type { RxStrategies } from './lib/model';
export type { RxStrategyNames } from './lib/model';
export type { RxDefaultStrategyNames } from './lib/model';
export type { RxConcurrentStrategyNames } from './lib/model';
export type { RxNativeStrategyNames } from './lib/model';
export type { RxCustomStrategyCredentials } from './lib/model';
export type { RxStrategyCredentials } from './lib/model';
export type { RxRenderBehavior } from './lib/model';
export type { RxRenderWork } from './lib/model';
export type { RxNativeStrategies } from './lib/native-strategies';
export { RX_NATIVE_STRATEGIES } from './lib/native-strategies';
export { onStrategy } from './lib/onStrategy';
export { strategyHandling } from './lib/strategy-handling';
export { RxStrategyProvider } from './lib/strategy-provider.service';
export {
  ɵprovideConcurrentSchedulerConfig as provideConcurrentSchedulerConfig,
  ɵwithInputPending as withExperimentalInputPending,
  ɵwithFramerate as withFramerate,
} from '@rx-angular/cdk/internals/scheduler';
