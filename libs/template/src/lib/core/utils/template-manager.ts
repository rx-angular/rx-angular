import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

type RxTemplateName = 'rxNext' | 'rxComplete' | 'rxError' | 'rxSuspense';

export class TemplateManager<T extends object> {
  private templateCache = new Map<RxTemplateName, TemplateRef<T>>();
  private viewCache = new Map<RxTemplateName, EmbeddedViewRef<T>>();

  constructor(
    private viewContext: T,
    private viewContainerRef: ViewContainerRef
  ) {}

  updateViewContext(viewContextSlice: Partial<T>): void {
    Object.entries(viewContextSlice).forEach(([key, value]) => {
      this.viewContext[key] = value;
    });
  }

  addTemplateRef(name: RxTemplateName, templateRef: TemplateRef<T>): void {
    assertTemplate(name, templateRef);
    this.templateCache.set(name, templateRef);
  }

  insertEmbeddedView(name: RxTemplateName) {
    if (this.templateCache.has(name)) {
      this.viewContainerRef.detach();
      if (this.viewCache.has(name)) {
        this.viewContainerRef.insert(this.viewCache.get(name));
      } else {
        const newView = this.viewContainerRef.createEmbeddedView(
          this.templateCache.get(name),
          this.viewContext
        );
        this.viewCache.set(name, newView);
      }
    }
  }

  destroy() {
    this.viewCache.forEach(embeddedView => embeddedView?.destroy());
    this.viewContainerRef.clear();
  }
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
