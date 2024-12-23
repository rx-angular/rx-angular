import { TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * @internal
 */
export interface _RxVirtualViewTemplate {
  viewContainerRef: ViewContainerRef;
  templateRef: TemplateRef<unknown>;
}

/**
 * @internal
 */
export interface _RxVirtualViewPlaceholder {
  templateRef: TemplateRef<unknown>;
}

/**
 * @internal
 */
export abstract class _RxVirtualViewObserver {
  abstract observeElementVisibility(
    virtualView: HTMLElement,
  ): Observable<boolean>;
  abstract observeElementSize(
    element: Element,
    options?: ResizeObserverOptions,
  ): Observable<ResizeObserverEntry>;
}

/**
 * @internal
 */
export abstract class _RxVirtualView {
  abstract registerTemplate(template: _RxVirtualViewTemplate): void;
  abstract registerPlaceholder(placeholder: _RxVirtualViewPlaceholder): void;
}
