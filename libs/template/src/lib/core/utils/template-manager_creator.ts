import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

export interface TemplateManager<ViewContext, Names = string> {
  updateViewContext(viewContextSlice: Partial<ViewContext>): void;

  addTemplateRef(name: Names, templateRef: TemplateRef<ViewContext>): void;

  hasTemplateRef(name: Names): boolean;

  displayView(name: Names): void;

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
export function createTemplateManager<ViewContext extends object>(
  viewContainerRef: ViewContainerRef,
  initialViewContext: ViewContext
): TemplateManager<ViewContext> {
  const templateCache = new Map<string, TemplateRef<ViewContext>>();
  const viewCache = new Map<string, EmbeddedViewRef<ViewContext>>();
  const viewContext = { ...initialViewContext };
  let activeView: string;
  return {
    /**
     * @NOTICE following properties are exposed because of testing reasons.
     * When moving this into the CDK we need to rethink that.
     */
    viewContainerRef,
    viewCache,
    templateCache,
    /**
     * Start public properties
     */
    hasTemplateRef(name: string): boolean {
      return this.templateCache.has(name);
    },
    /**
     * @description
     * mutates the inner viewContext to store the passed object
     *
     * @param viewContextSlice - the object holding the new state
     *
     */
    updateViewContext(viewContextSlice: Partial<ViewContext>) {
      Object.entries(viewContextSlice).forEach(([key, value]) => {
        viewContext[key] = value;
      });
    },
    /**
     * @description
     * Adds a template to the internal templateRefCache map
     *
     * @param name
     * @param templateRef
     */
    addTemplateRef(name: string, templateRef: TemplateRef<ViewContext>) {
      assertTemplate(name, templateRef);
      if (!templateCache.has(name)) {
        templateCache.set(name, templateRef);
      } else {
        // @Notice We have to think through how this would work. We also call viewCache.set(name, newView); in insertEmbeddedView
        throw new Error(
          'Updating an already existing Template is not supported at the moment.'
        );
      }
    },
    displayView(name: string) {
      if (activeView !== name) {
        if (templateCache.has(name)) {
          // Detach currently inserted view from dom and remove it from viewContainerRef.
          viewContainerRef.detach(0);

          if (viewCache.has(name)) {
            viewContainerRef.insert(viewCache.get(name), 0);
          } else {
            // creates and inserts view to the view container
            const newView = viewContainerRef.createEmbeddedView(
              templateCache.get(name),
              viewContext
            );
            viewCache.set(name, newView);
          }
        } else {
          // @NOTICE this is here to cause errors and see in which situations we would throw.
          // In CDK it should work different.
          throw new Error(`A non-existing view was tried to insert ${name}`);
        }
      }
      activeView = name;
    },
    /**
     * @description
     * Clears all cached views. This should be called if the instance that holds the template manager dies.
     */
    destroy() {
      viewCache.forEach((view) => view?.destroy());
      viewContainerRef.clear();
    },
  } as TemplateManager<ViewContext>;
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
