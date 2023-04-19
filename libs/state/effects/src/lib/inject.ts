import {
  ChangeDetectorRef,
  ErrorHandler,
  ViewRef,
  inject,
} from '@angular/core';
import { RxEffects } from './effects.service';

export function injectRxEffects(): RxEffects {
  const errorHandler = inject(ErrorHandler);
  const rxEffects = new RxEffects(errorHandler);
  /**
   * @todo: Use DestroyRef instead when upgrading to Angular 16
   */
  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => rxEffects.ngOnDestroy());

  return rxEffects;
}
