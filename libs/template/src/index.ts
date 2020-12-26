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
export {
  UnpatchEventsDirective,
  UnpatchEventsModule,
} from './lib/experimental/unpatch/events';
export {
  ViewportPrioModule,
  ViewportPrioDirective,
} from './lib/experimental/viewport-prio';
// @TODO clarify if we should exports this
export { getZoneUnPatchedApi, isNgZone, coalescingManager } from './lib/core';
export { isViewEngineIvy } from './lib/experimental/core/utils/view-engine-checks.experimental';

// STABLE
export { RxViewContext, RxTemplateObserver, RxNotificationKind } from './lib/core/model';

export {
  getStrategies,
  priorityTickMap,
  SchedulingPriority
} from './lib/render-strategies';

export { PushPipe, PushModule } from './lib/push';
export { LetDirective, LetModule } from './lib/let';

export { TemplateModule } from './lib/template.module';
