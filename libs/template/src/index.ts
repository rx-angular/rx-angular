export {
  getStrategies,
  priorityTickMap,
  SchedulingPriority,
} from './lib/render-strategies';
export { getZoneUnPatchedApi, isNgZone } from './lib/core';
export { PushPipe, PushModule } from './lib/push';
export { LetDirective, LetModule } from './lib/let';
// EXPERIMENTAL
export {
  UnpatchEventsDirective,
  UnpatchEventsModule,
} from './lib/experimental/unpatch/events';
export {
  ViewportPrioModule,
  ViewportPrioDirective,
} from './lib/experimental/viewport-prio';
export { TemplateModule } from './lib/template.module';
