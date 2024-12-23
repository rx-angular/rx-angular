import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { _RxVirtualViewContent } from './model';
import { RxVirtualView } from './virtual-view.directive';

/**
 * The RxVirtualViewTemplate directive is a directive that allows you to create a content template for the virtual view.
 *
 * It can be used on an element/component to create a content template for the virtual view.
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
@Directive({ selector: '[rxVirtualViewContent]', standalone: true })
export class RxVirtualViewContent implements _RxVirtualViewContent {
  #virtualView = inject(RxVirtualView);
  viewContainerRef = inject(ViewContainerRef);
  constructor(public templateRef: TemplateRef<unknown>) {
    this.#virtualView.registerContent(this);
  }
}
