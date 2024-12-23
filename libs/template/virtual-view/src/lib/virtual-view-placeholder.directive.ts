import { Directive, inject, TemplateRef } from '@angular/core';
import { _RxVirtualView, _RxVirtualViewPlaceholder } from './model';

/**
 * The RxVirtualViewPlaceholder directive is a directive that allows you to create a placeholder for the virtual view.
 *
 * It can be used on an element/component to create a placeholder for the virtual view.
 *
 * It needs to be a sibling of the `rxVirtualView` directive.
 *
 * @example
 * ```html
 * <div rxVirtualViewObserver>
 *   <div rxVirtualView>
 *     <div *rxVirtualViewContent>Virtual View 1</div>
 *     <div *rxVirtualViewPlaceholder>Loading...</div>
 *   </div>
 * </div>
 * ```
 *
 * @developerPreview
 */
@Directive({ selector: '[rxVirtualViewPlaceholder]', standalone: true })
export class RxVirtualViewPlaceholder implements _RxVirtualViewPlaceholder {
  #virtualView = inject(_RxVirtualView);
  constructor(public templateRef: TemplateRef<unknown>) {
    this.#virtualView.registerPlaceholder(this);
  }
}
