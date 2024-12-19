import {
  Directive,
  inject,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { _RxVirtualViewTemplate } from './model';
import { RxVirtualView } from './virtual-view.directive';

/**
 * The RxVirtualViewTemplate directive is a directive that allows you to create a template for the virtual view.
 *
 * It can be used on an element/component to create a template for the virtual view.
 *
 * It needs to be a sibling of the `rxVirtualView` directive.
 *
 * @example
 * ```html
 * <div rxVirtualViewObserver>
 *   <div rxVirtualView>
 *     <div *rxVirtualViewTemplate>Virtual View 1</div>
 *     <div *rxVirtualViewPlaceholder>Loading...</div>
 *   </div>
 * </div>
 * ```
 *
 * @developerPreview
 */
@Directive({ selector: '[rxVirtualViewTemplate]', standalone: true })
export class RxVirtualViewTemplate implements _RxVirtualViewTemplate {
  #virtualView = inject(RxVirtualView);
  viewContainerRef = inject(ViewContainerRef);
  constructor(public templateRef: TemplateRef<unknown>) {
    this.#virtualView.registerTemplate(this);
  }
}
