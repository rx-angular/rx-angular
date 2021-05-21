// EXPERIMENTAL
// TODO(artur): we're keeping it here until we get a migration script.
export {
  UnpatchModule as UnpatchEventsModule,
  UnpatchDirective,
} from '@rx-angular/template/unpatch';

export { ViewportPrioModule } from './lib/experimental/viewport-prio/viewport-prio.module';
export { ViewportPrioDirective } from './lib/experimental/viewport-prio/viewport-prio.experimental.directive';

// STABLE
// @deprecated import from template/unpatch
// TODO(artur): we're keeping it here until we get a migration script.
export { LetModule, LetDirective } from '@rx-angular/template/let';

export { PushModule, PushPipe } from '@rx-angular/template/push';
