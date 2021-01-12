import { Type, ɵdetectChanges as detectChanges } from '@angular/core';
import { merge, OperatorFunction } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { switchMap, withLatestFrom } from 'rxjs/operators';
import { StrategyCredentials } from '../render-strategies/model/strategy-credentials';
import { onStrategy } from '../render-strategies/utils/strategy-helper';
import { CONTEXT, HEADER_OFFSET, L_CONTAINER_NATIVE, T_HOST, TVIEW } from '../utils/view-constants';

export function getTNode(cdRef: any, native: any /*Comment*/) {
  const lView = cdRef._cdRefInjectingView;
  const tView = lView[TVIEW];
  let i = HEADER_OFFSET;
  let lContainer;
  while (!lContainer && i <= tView['bindingStartIndex']) {
    const candidate = lView[i];
    if (candidate && candidate[L_CONTAINER_NATIVE] === native) {
      lContainer = candidate;
    }
    i++;
  }
  return lContainer[T_HOST];
}

export function extractProjectionParentViewSet(cdRef: any, tNode: any): Set<Type<any>> {
  const injectingLView = (cdRef as any)._cdRefInjectingView;
  const injectingTView = injectingLView[1];
  const components = new Set<number>(injectingTView['components']);
  const parentElements = new Set<Type<any>>();
  let parent = tNode['parent'];
  while (parent != null && components.size > 0) {
    const idx = parent['index'];
    if (components.has(idx)) {
      components.clear();
      parentElements.add(injectingLView[idx][CONTEXT]);
    }
    parent = parent['parent'];
  }
  return parentElements;
}

export function extractProjectionViews(cdRef: any, tNode: any): Type<any>[] {
  return Array.from(extractProjectionParentViewSet(cdRef, tNode));
}

export function renderProjectionParents(
  cdRef: any,
  tNode: any,
  strategy$: Observable<StrategyCredentials>)
  : OperatorFunction<any, any> {

  return o$ => o$.pipe(
    withLatestFrom(strategy$),
    switchMap(([_, strategy]) => {
      const parentElements = extractProjectionParentViewSet(cdRef, tNode);
      const behaviors = [];
      for (const el of parentElements.values()) {
        behaviors.push(
          onStrategy(
            el,
            strategy,
            (value, work, options) => {
              detectChanges(el);
            },
            { scope: el }
          )
        )
      }
      behaviors.push(
        onStrategy(
          null,
          strategy,
          (value, work, options) => work(cdRef, options.scope),
          { scope: (cdRef as any).context || cdRef }
        )
      );

      return merge(...behaviors);
    })
  )
}
