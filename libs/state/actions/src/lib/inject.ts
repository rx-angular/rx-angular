import {
  ChangeDetectorRef,
  ErrorHandler,
  ViewRef,
  inject,
} from '@angular/core';
import { RxActionFactory } from './actions.factory';

export function injectRxActionFactory<
  Actions extends object
>(): RxActionFactory<Actions> {
  const errorHandler = inject(ErrorHandler, { optional: true }) ?? undefined;
  const rxActionFactory = new RxActionFactory<Actions>(errorHandler);
  /**
   * @todo: Use DestroyRef instead when upgrading to Angular 16
   */
  const viewRef = inject(ChangeDetectorRef) as ViewRef;

  viewRef.onDestroy(() => rxActionFactory.ngOnDestroy());

  return rxActionFactory;
}
