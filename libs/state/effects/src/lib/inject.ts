import { DestroyRef, ErrorHandler, inject } from '@angular/core';
import { RxEffects } from './effects.service';

export function injectRxEffects(): RxEffects {
  const errorHandler = inject(ErrorHandler);
  const rxEffects = new RxEffects(errorHandler);
  const destroyRef = inject(DestroyRef);

  destroyRef.onDestroy(() => rxEffects.ngOnDestroy());

  return rxEffects;
}
