// Below are constants for LView indices to help us look up LView members
// without having to remember the specific indices.
// Uglify will inline these when minifying so there shouldn't be a cost.
export const HOST = 0;
export const TVIEW = 1;
export const FLAGS = 2;
export const PARENT = 3;
export const NEXT = 4;
export const TRANSPLANTED_VIEWS_TO_REFRESH = 5;
export const T_HOST = 6;
export const CLEANUP = 7;
export const L_CONTAINER_NATIVE = 7;
export const CONTEXT = 8;
export const INJECTOR = 9;
export const RENDERER_FACTORY = 10;
export const RENDERER = 11;
export const SANITIZER = 12;
export const CHILD_HEAD = 13;
export const CHILD_TAIL = 14;
// FIXME(misko): Investigate if the three declarations aren't all same thing.
export const DECLARATION_VIEW = 15;
export const DECLARATION_COMPONENT_VIEW = 16;
export const DECLARATION_LCONTAINER = 17;
export const PREORDER_HOOK_FLAGS = 18;
export const QUERIES = 19;
/**
 * Size of LView's header. Necessary to adjust for it when setting slots.
 *
 * IMPORTANT: `HEADER_OFFSET` should only be referred to the in the `ɵɵ*` instructions to translate
 * instruction index into `LView` index. All other indexes should be in the `LView` index space and
 * there should be no need to refer to `HEADER_OFFSET` anywhere else.
 */
export const HEADER_OFFSET = 20;

export const enum TViewType {
  /**
   * Root `TView` is the used to bootstrap components into. It is used in conjunction with
   * `LView` which takes an existing DOM node not owned by Angular and wraps it in `TView`/`LView`
   * so that other components can be loaded into it.
   */
  Root = 0,

  /**
   * `TView` associated with a Component. This would be the `TView` directly associated with the
   * component view (as opposed an `Embedded` `TView` which would be a child of `Component` `TView`)
   */
  Component = 1,

  /**
   * `TView` associated with a template. Such as `*ngIf`, `<ng-template>` etc... A `Component`
   * can have zero or more `Embedede` `TView`s.
   */
  Embedded = 2,
}
