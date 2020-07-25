import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

type RxTemplateName = 'rxNext' | 'rxComplete' | 'rxError' | 'rxSuspense';

export interface TemplateManager<T> {
  updateViewContext(viewContextSlice: Partial<T>): void;
  addTemplateRef(name: RxTemplateName, templateRef: TemplateRef<T>);
  insertEmbeddedView(name: RxTemplateName): void;
  destroy(): void;
}

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
        viewContainerRef.detach();
        if (viewCache.has(name)) {
          viewContainerRef.insert(viewCache.get(name));
        } else {
          const newView = viewContainerRef.createEmbeddedView(
            templateCache.get(name),
            viewContext
          );
          viewCache.set(name, newView);
        }
      }
    },
    destroy() {
      viewCache.forEach(embeddedView => embeddedView?.destroy());
      viewContainerRef.clear();
    }
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
