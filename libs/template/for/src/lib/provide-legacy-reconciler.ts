import { inject, IterableDiffers, NgIterable, Provider } from '@angular/core';
import {
  createListTemplateManager,
  RxDefaultListViewContext,
} from '@rx-angular/cdk/template';
import { INTERNAL_RX_FOR_RECONCILER_TOKEN } from './for.config';
import { ReconcileFactoryOptions } from './reconcile-factory';

export const LEGACY_RXFOR_RECONCILIATION_FACTORY = () => {
  const iterableDiffers = inject(IterableDiffers);
  return <T, U extends NgIterable<T> = NgIterable<T>>(
    options: ReconcileFactoryOptions<T, U>,
  ) => {
    const {
      values$,
      strategy$,
      viewContainerRef,
      template,
      strategyProvider,
      errorHandler,
      createViewContext,
      updateViewContext,
      cdRef,
      trackBy,
      parent,
      patchZone,
    } = options;
    const listManager = createListTemplateManager<
      T,
      RxDefaultListViewContext<T>
    >({
      iterableDiffers: iterableDiffers,
      renderSettings: {
        cdRef: cdRef,
        strategies: strategyProvider.strategies as any, // TODO: move strategyProvider
        defaultStrategyName: strategyProvider.primaryStrategy,
        parent,
        patchZone,
        errorHandler,
      },
      templateSettings: {
        viewContainerRef,
        templateRef: template,
        createViewContext,
        updateViewContext,
      },
      trackBy,
    });
    listManager.nextStrategy(strategy$);

    return listManager.render(values$);
  };
};

export function provideLegacyRxForReconciliation(): Provider {
  return {
    provide: INTERNAL_RX_FOR_RECONCILER_TOKEN,
    useFactory: LEGACY_RXFOR_RECONCILIATION_FACTORY,
  };
}
