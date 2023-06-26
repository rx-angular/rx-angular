import { DestroyRef, inject } from '@angular/core';
import { RxEffects } from './effects.service';

export function injectRxEffects(): RxEffects {
  const rxEffects = new RxEffects();
  const destroyRef = inject(DestroyRef);

  destroyRef.onDestroy(() => rxEffects.ngOnDestroy());

  return rxEffects;
}
