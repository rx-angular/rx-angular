import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

export interface TemplateManager<C extends object, N extends string = string> {

  /**
   * @description
   * Mutates the inner viewContext with the passed object slice.
   *
   * @param viewContextSlice - the object holding the new state
   */
  updateViewContext(viewContextSlice: Partial<C>): void;

  /**
   * @description
   * Adds a template to the internal templateRefCache map.
   *
   * @param name
   * @param templateRef
   */
  addTemplateRef(name: N, templateRef: TemplateRef<C>): void;

  /**
   * @description
   * Returns a template from the internal templateRefCache map.
   *
   * @param name
   */
  getEmbeddedView(name: string | number | Symbol): EmbeddedViewRef<C> | undefined;

  /**
   * @description
   * Checks if `TemplateRef` instance is cached under the provided name.
   */
  hasTemplateRef(name: N): boolean;

  /**
   * @description
   * Creates and inserts view out of registered templates and caches it for the later
   * re-usage.
   *
   * @param name name of the cached view
   */
  displayView(name: N, id?: string | number | Symbol): void;

  /**
   * @description
   * Clears all cached views. This should be called if the instance that holds the template manager dies.
   */
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
export function createTemplateManager<C extends object, N extends string = string>(
  viewContainerRef: ViewContainerRef,
  initialViewContext: C
): TemplateManager<C, N> {
  const templateCache = new Map<N, TemplateRef<C>>();
  const viewCache = new Map<string, EmbeddedViewRef<C>>();
  const viewContext = { ...initialViewContext };
  let activeView: string;

  return {
    hasTemplateRef(name: N): boolean {
      return templateCache.has(name);
    },

    updateViewContext(viewContextSlice: Partial<C>) {
      Object.entries(viewContextSlice).forEach(([key, value]) => {
        viewContext[key] = value;
      });
    },

    addTemplateRef(name: N, templateRef: TemplateRef<C>) {
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

    getEmbeddedView(vID: string): EmbeddedViewRef<C> {
      return viewCache.get(vID);
    },
    displayView(name: N, id: string | number | Symbol = '') {
      const vID = name + id;
      if (activeView !== vID) {

        if (templateCache.has(name)) {
          // Detach currently inserted view from the container
          viewContainerRef.detach();


          if (viewCache.has(vID)) {
            viewContainerRef.insert(viewCache.get(vID));
          } else {
            // Creates and inserts view to the view container
            const newView = viewContainerRef.createEmbeddedView(
              templateCache.get(name),
              viewContext
            );
            viewCache.set(vID, newView);
          }
        } else {
          // @NOTICE this is here to cause errors and see in which situations we would throw.
          // In CDK it should work different.
          console.error(`A non-existing view was tried to insert. Template name ${name} was used to create EmbeddedView ${vID}`);
        }

        activeView = vID;
      }
    },

    destroy() {
      viewCache.forEach((view) => view.destroy());
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
