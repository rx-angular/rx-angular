import { inject } from '@angular/core';
import { INTERNAL_RX_FOR_RECONCILER_TOKEN } from './for.config';

export function injectReconciler() {
  return inject(INTERNAL_RX_FOR_RECONCILER_TOKEN);
}
