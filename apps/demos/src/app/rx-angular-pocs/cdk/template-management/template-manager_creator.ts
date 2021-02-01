import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { RxBaseTemplateNames } from './model';
import { Observable, Subject } from 'rxjs';

export interface TemplateManager<
  C extends object,
  N = (RxBaseTemplateNames | string)
> {

  templateChanged$: Observable<N>

  getTemplateName(templateName: N, fallback: N): N;

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
  getEmbeddedView(name: N): false | EmbeddedViewRef<C>;

  /**
   * @description
   *
   * @param name
   */
  createEmbeddedView(name: N): EmbeddedViewRef<C>;

  /**
   * @description
   * Checks if `TemplateRef` instance is cached under the provided name.
   */

  hasTemplateRef(name: N): boolean;
  /**
   * @description
   * Checks if view instance is cached under the provided name.
   */
  hasViewCache(name: N): boolean;

  /**
   * @description
   * Creates and inserts view out of registered templates and caches it for the later
   * re-usage.
   *
   * @param name name of the cached view
   */
  displayView(name: N, fallback?: N): void;

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
export function createTemplateManager<
  C extends object,
  N = (RxBaseTemplateNames | string)
>(
  viewContainerRef: ViewContainerRef,
  initialViewContext: C
): TemplateManager<C, N> {
  const templateCache = new Map<N, TemplateRef<C>>();
  const viewCache = new Map<N, EmbeddedViewRef<C>>();
  const viewContext = { ...initialViewContext };
  let activeContentView: N;
  const templateChanged$ = new Subject<N>()

  return {
    hasTemplateRef,
    getTemplateName,
    hasViewCache,
    updateViewContext,
    addTemplateRef,
    getEmbeddedView,
    createEmbeddedView,
    displayView: displayContentView,
    destroy,
    templateChanged$
  };

  function hasViewCache(name: N): boolean {
    return viewCache.has(name);
  }

  function updateViewContext(viewContextSlice: Partial<C>) {
    Object.entries(viewContextSlice).forEach(([key, value]) => {
      viewContext[key] = value;
    });
  }

  function addTemplateRef(name: N, templateRef: TemplateRef<C>) {
    assertTemplate(name, templateRef);
    if (!templateCache.has(name)) {
      templateCache.set(name, templateRef);
    } else {
      // @Notice We have to think through how this would work. We also call viewCache.set(name, newView); in insertEmbeddedView
      throw new Error(
        'Updating an already existing Template is not supported at the moment.'
      );
    }
  }

  function getEmbeddedView(name: N): false | EmbeddedViewRef<C> {
    if (hasTemplateRef(name)) {
      if (hasViewCache(name)) {
        return viewCache.get(name);
      } else {
        return createEmbeddedView(name);
      }
    } else {
      return false
    }
  }

  function createEmbeddedView(name: N): EmbeddedViewRef<C> {
    const newView = viewContainerRef.createEmbeddedView(
      templateCache.get(name),
      { ...initialViewContext }
    );
    viewCache.set(name, newView);
    newView.detach();
    // viewContainerRef.detach();
    return newView;
  }

  function displayContextView(name: N) {
    // contextIndex = viewContainerRef.get(contentIndex)

    name = getTemplateName(name);
    if (activeContentView !== name) {
      if (templateCache.has(name)) {
        if (viewCache.has(name)) {
          viewContainerRef.insert(viewCache.get(name));
        } else {
          // Creates and inserts view to the view container
          const newView = viewContainerRef.createEmbeddedView(
            templateCache.get(name),
            viewContext
          );
          viewCache.set(name, newView);
        }
        // Detach currently inserted view from the container
        //   viewContainerRef.detach(contextIndex);
      } else {
        // @NOTICE this is here to cause errors and see in which situations we would throw.
        // In CDK it should work different.
        console.error(`A non-existing view was tried to insert ${name}`);
      }

      activeContentView = name;
    }
  }

  function displayContentView(name: N, fallback?: N) {
    name = getTemplateName(name, fallback);
    if (activeContentView !== name) {
      if (viewCache.has(activeContentView)) {
        viewContainerRef.remove(0);
        viewCache.delete(activeContentView);
      }
      if (templateCache.has(name)) {
        if (viewCache.has(name)) {
          viewContainerRef.insert(viewCache.get(name));
        } else {
          // Creates and inserts view to the view container
          const newView = viewContainerRef.createEmbeddedView(
            templateCache.get(name),
            viewContext
          );
          viewCache.set(name, newView);
          templateChanged$.next(name);
        }
      } else {
        // @NOTICE this is here to cause errors and see in which situations we would throw.
        // In CDK it should work different.
        // console.error(`A non-existing view was tried to insert ${name}`);
      }

      activeContentView = name;
    }
  }

  function destroy() {
    viewCache.forEach((view) => view.destroy());
    viewContainerRef.clear();
  }

  function getTemplateName(templateName: N, fallback?: N): N {
    return hasTemplateRef(templateName) ? templateName : fallback;
  }
  function hasTemplateRef(name: N): boolean {
    return templateCache.has(name);
  }
}

function assertTemplate<T>(
  property: any,
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
