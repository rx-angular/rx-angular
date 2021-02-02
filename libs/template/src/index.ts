// EXPERIMENTAL
export {
  RenderStrategy,
  RenderStrategyFactory,
  RenderStrategyFactoryConfig,
  RxNotification,
  StrategySelection,
  renderWithLatestStrategy,
  createRenderAware,
  RenderAware,
} from './lib/core/render-aware';
export { coalesceWith } from './lib/render-strategies/rxjs/operators/coalesceWith';
export { rxMaterialize } from './lib/core/utils/rx-materialize';
export { staticCoalesce } from './lib/render-strategies/static';

export { UnpatchEventsModule } from './lib/experimental/unpatch/events/unpatch-events.experimental.module';
export { UnpatchEventsDirective } from './lib/experimental/unpatch/events/unpatch-events.experimental.directive';

export { ViewportPrioModule } from './lib/experimental/viewport-prio/viewport-prio.module';
export { ViewportPrioDirective } from './lib/experimental/viewport-prio/viewport-prio.experimental.directive';

// @TODO clarify if we should exports this
export { getZoneUnPatchedApi, isNgZone, coalescingManager } from './lib/core';
export { isViewEngineIvy } from './lib/experimental/core/utils/view-engine-checks.experimental';

// STABLE
export {
  RxViewContext,
  RxTemplateObserver,
  RxNotificationKind,
} from './lib/core/model';

export {
  getStrategies,
  priorityTickMap,
  SchedulingPriority,
} from './lib/render-strategies';

export { PushPipe } from './lib/push/push.pipe';
export { PushModule } from './lib/push/push.module';

export { LetModule } from './lib/let/let.module';
export { LetDirective } from './lib/let/let.directive';
