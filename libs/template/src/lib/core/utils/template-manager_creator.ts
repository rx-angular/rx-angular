import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

type RxTemplateName = 'rxNext' | 'rxComplete' | 'rxError' | 'rxSuspense';

export interface TemplateManager<T> {
  updateViewContext(viewContextSlice: T): void;
  addTemplateRef(name: RxTemplateName, templateRef: TemplateRef<T>): void;
  insertEmbeddedView(name: RxTemplateName): void;
  destroy(): void;
}

/**
 * TemplateManager
 *
 * @description
 * This function returns an object that holds the logic for managing templates of a `ViewContainerRef`.
 * It abstracts `EmbeddedView` creation, `insert` calls and `ViewContext` updates.
 * Internally it creates template references lazily by combining caching logic and the `ViewContainerRef#detach` method.
 * The `TemplateManager` lets you re-use templates and insert views on-demand, as well as update the view context
 * (e.g. when a new observable notification is sent).
 *
 * @param viewContainerRef reference to a top-level view container where passed templates will be attached
 * @param initialViewContext initial view context state
 */
export function createTemplateManager<T extends object>(
  viewContainerRef: ViewContainerRef,
  initialViewContext: T
): TemplateManager<T> {
  const templateCache = new Map<RxTemplateName, TemplateRef<T>>();
  const viewCache = new Map<RxTemplateName, EmbeddedViewRef<T>>();
  const viewContext = { ...initialViewContext };

  return {
    updateViewContext(viewContextSlice: Partial<T>) {
      Object.entries(viewContextSlice).forEach(([key, value]) => {
        viewContext[key] = value;
      });
    },
    addTemplateRef(name: RxTemplateName, templateRef: TemplateRef<T>) {
      assertTemplate(name, templateRef);
      templateCache.set(name, templateRef);
    },
    insertEmbeddedView(name: RxTemplateName) {
      if (templateCache.has(name)) {
        // detach currently inserted view
        viewContainerRef.detach();

        if (viewCache.has(name)) {
          viewContainerRef.insert(viewCache.get(name));
        } else {
          // creates and inserts view to the view container
          const newView = viewContainerRef.createEmbeddedView(
            templateCache.get(name),
            viewContext
          );
          viewCache.set(name, newView);
        }
      }
    },
    destroy() {
      viewCache.forEach((view) => view?.destroy());
      viewContainerRef.clear();
    },
  };
}

function assertTemplate<T>(
  property: string,
  templateRef: TemplateRef<T> | null
): templateRef is TemplateRef<T> {
  const isTemplateRefOrNull = !!(
    !templateRef || templateRef.createEmbeddedView
  );
  if (!isTemplateRefOrNull) {
    throw new Error(
      `${property} must be a TemplateRef, but received something else.`
    );
  }
  return isTemplateRefOrNull;
}
