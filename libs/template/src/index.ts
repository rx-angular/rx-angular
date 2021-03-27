// EXPERIMENTAL
export { UnpatchEventsModule } from './lib/experimental/unpatch/events/unpatch-events.experimental.module';
export { UnpatchEventsDirective } from './lib/experimental/unpatch/events/unpatch-events.experimental.directive';

export { ViewportPrioModule } from './lib/experimental/viewport-prio/viewport-prio.module';
export { ViewportPrioDirective } from './lib/experimental/viewport-prio/viewport-prio.experimental.directive';

// STABLE
/**
 * @deprecated import it from @rx-angular/template/push
 */
export { PushPipe, PushModule} from '@rx-angular/template/push';

/**
 * @deprecated import it from @rx-angular/template/rx-let
 */
export { LetDirective, LetModule } from '@rx-angular/template/rx-let';
