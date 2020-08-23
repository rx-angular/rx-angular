export {
  getStrategies,
  priorityTickMap,
  SchedulingPriority,
} from './lib/render-strategies';
// EXPERIMENTAL
export {
  UnpatchEventsDirective,
  UnpatchEventsModule,
} from './lib/experimental/unpatch/events';
export {
  ViewportPrioModule,
  ViewportPrioDirective,
} from './lib/experimental/viewport-prio';
// @TODO clarify if we should exports this
export { getZoneUnPatchedApi, isNgZone } from './lib/core';
export { isViewEngineIvy } from './lib/experimental/core/utils/view-engine-checks';

export { PushPipe, PushModule } from './lib/push';
export { LetDirective, LetModule } from './lib/let';

export { TemplateModule } from './lib/template.module';
