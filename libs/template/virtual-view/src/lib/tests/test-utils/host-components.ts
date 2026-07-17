/**
 * Reusable standalone host components for the Virtual View test suite.
 *
 * These hosts import the four public directives directly from the package
 * source (`RxVirtualView`, `RxVirtualViewObserver`, `RxVirtualViewContent`,
 * `RxVirtualViewPlaceholder`) and exercise the control-flow (`@if` / `@for` /
 * `@switch`), size-reservation, configuration, and no-observer (SSR) scenarios
 * described in the design. They generalize the inline host used by
 * `virtual-view.directive.spec.ts` so that multiple specs can share them.
 */

import { Component, input, signal } from '@angular/core';
import { RxVirtualView } from '../../virtual-view.directive';
import { RxVirtualViewContent } from '../../virtual-view-content.directive';
import { RxVirtualViewObserver } from '../../virtual-view-observer.directive';
import { RxVirtualViewPlaceholder } from '../../virtual-view-placeholder.directive';

/* -------------------------------------------------------------------------- */
/*  Scenario model                                                            */
/* -------------------------------------------------------------------------- */

/**
 * The kind of a control-flow scenario item. Mirrors the user's repro, where
 * each item selects a distinct `@switch`/`@case` content + placeholder pair.
 */
export type ItemKind = 'a' | 'b' | 'c';

/**
 * A single control-flow scenario item.
 *
 * - `kind` selects the `@switch`/`@case` content+placeholder pair.
 * - `label` is rendered inside the content.
 * - `size` (optional) is the per-item reserved size used by CLS scenarios and
 *   exposed to the placeholder via the `--rx-vw-h` / `--rx-vw-w` custom props.
 */
export interface CfItem {
  id: number;
  kind: ItemKind;
  label: string;
  size?: { width: number; height: number };
}

/**
 * Default `extractSize` implementation mirroring the library's internal
 * `defaultExtractSize` (reads `borderBoxSize[0]`). Used as the default value of
 * {@link SizeHost.extractSize} so the directive keeps working when the input is
 * not overridden.
 */
export function defaultExtractSize(entry: ResizeObserverEntry): {
  width: number;
  height: number;
} {
  return {
    width: entry.borderBoxSize[0].inlineSize,
    height: entry.borderBoxSize[0].blockSize,
  };
}

/* -------------------------------------------------------------------------- */
/*  SimpleHost                                                                */
/* -------------------------------------------------------------------------- */

/**
 * A single `rxVirtualView` under an `rxVirtualViewObserver [root]="null"`, with
 * a content div and an optional placeholder div.
 *
 * The config-relevant directive inputs (`useContentVisibility`,
 * `useContainment`, `cacheEnabled`, `keepLastKnownSize`,
 * `startWithPlaceholderAsap`) are exposed as component inputs and bound in the
 * template so specs can drive input-over-config precedence. They default to
 * `undefined` (unset); specs set them explicitly via `setInput`. The
 * `withPlaceholder` toggle controls whether the placeholder is rendered.
 */
@Component({
  selector: 'rx-simple-host',
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      <div
        rxVirtualView
        #vv="rxVirtualView"
        class="widget"
        [useContentVisibility]="useContentVisibility()"
        [useContainment]="useContainment()"
        [cacheEnabled]="cacheEnabled()"
        [keepLastKnownSize]="keepLastKnownSize()"
        [startWithPlaceholderAsap]="startWithPlaceholderAsap()"
      >
        <div *rxVirtualViewContent class="template">ze-template</div>
        @if (withPlaceholder()) {
          <div *rxVirtualViewPlaceholder class="placeholder">
            ze-placeholder
          </div>
        }
      </div>
    </div>
  `,
})
export class SimpleHost {
  readonly withPlaceholder = input(true);
  readonly useContentVisibility = input<boolean | undefined>(undefined);
  readonly useContainment = input<boolean | undefined>(undefined);
  readonly cacheEnabled = input<boolean | undefined>(undefined);
  readonly keepLastKnownSize = input<boolean | undefined>(undefined);
  readonly startWithPlaceholderAsap = input<boolean | undefined>(undefined);
}

/* -------------------------------------------------------------------------- */
/*  IfHost                                                                    */
/* -------------------------------------------------------------------------- */

/**
 * An `rxVirtualView` rendered inside an `@if (show())` block within an
 * observer. Toggling `show` activates / deactivates the virtual view so specs
 * can assert deferred setup and control-flow activation.
 */
@Component({
  selector: 'rx-if-host',
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      @if (show()) {
        <div rxVirtualView #vv="rxVirtualView" class="widget">
          <div *rxVirtualViewContent class="template">ze-template</div>
          <div *rxVirtualViewPlaceholder class="placeholder">
            ze-placeholder
          </div>
        </div>
      }
    </div>
  `,
})
export class IfHost {
  readonly show = signal(true);
}

/* -------------------------------------------------------------------------- */
/*  ForHost                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * An `@for` of `rxVirtualView` elements, each with its own content (rendering
 * `item.label`) and placeholder whose reserved min-height is driven by the
 * `--rx-vw-h` custom property (mirroring the repro). `items` is a signal so
 * specs can add / remove items and assert per-element visibility and cache
 * clearing.
 */
@Component({
  selector: 'rx-for-host',
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      @for (item of items(); track item.id) {
        <div
          rxVirtualView
          #vv="rxVirtualView"
          class="widget"
          [attr.data-id]="item.id"
        >
          <div *rxVirtualViewContent class="template">{{ item.label }}</div>
          <div
            *rxVirtualViewPlaceholder
            class="placeholder"
            style="min-height: var(--rx-vw-h, 107px)"
          ></div>
        </div>
      }
    </div>
  `,
})
export class ForHost {
  readonly items = signal<CfItem[]>([
    { id: 1, kind: 'a', label: 'item-a' },
    { id: 2, kind: 'b', label: 'item-b' },
    { id: 3, kind: 'c', label: 'item-c' },
  ]);
}

/* -------------------------------------------------------------------------- */
/*  SwitchHost                                                                */
/* -------------------------------------------------------------------------- */

/**
 * A single `rxVirtualView` whose content + placeholder pair is selected by an
 * `@switch (kind())` with `@case ('a')`, `@case ('b')`, and `@default` (kind
 * `'c'`). Mirrors the user's repro where distinct item kinds render distinct
 * content. Switching `kind` re-selects the active branch so specs can assert
 * case selection and deferred registration behind inactive branches.
 */
@Component({
  selector: 'rx-switch-host',
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      <div rxVirtualView #vv="rxVirtualView" class="widget">
        @switch (kind()) {
          @case ('a') {
            <div *rxVirtualViewContent class="template">content-a</div>
            <div *rxVirtualViewPlaceholder class="placeholder">
              placeholder-a
            </div>
          }
          @case ('b') {
            <div *rxVirtualViewContent class="template">content-b</div>
            <div *rxVirtualViewPlaceholder class="placeholder">
              placeholder-b
            </div>
          }
          @default {
            <div *rxVirtualViewContent class="template">content-c</div>
            <div *rxVirtualViewPlaceholder class="placeholder">
              placeholder-c
            </div>
          }
        }
      </div>
    </div>
  `,
})
export class SwitchHost {
  readonly kind = input<ItemKind>('a');
}

/* -------------------------------------------------------------------------- */
/*  ForSwitchHost                                                             */
/* -------------------------------------------------------------------------- */

/**
 * An `@for` of `rxVirtualView` elements, each selecting its content +
 * placeholder pair via an `@switch (item.kind)`. Combines the `@for` and
 * `@switch` scenarios to mirror the full repro layout (list of items with kinds
 * a/b/c, per-item placeholder min-height via `--rx-vw-h`).
 */
@Component({
  selector: 'rx-for-switch-host',
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      @for (item of items(); track item.id) {
        <div
          rxVirtualView
          #vv="rxVirtualView"
          class="widget"
          [attr.data-id]="item.id"
        >
          @switch (item.kind) {
            @case ('a') {
              <div *rxVirtualViewContent class="template">
                a-{{ item.label }}
              </div>
              <div
                *rxVirtualViewPlaceholder
                class="placeholder"
                style="min-height: var(--rx-vw-h, 107px)"
              ></div>
            }
            @case ('b') {
              <div *rxVirtualViewContent class="template">
                b-{{ item.label }}
              </div>
              <div
                *rxVirtualViewPlaceholder
                class="placeholder"
                style="min-height: var(--rx-vw-h, 107px)"
              ></div>
            }
            @default {
              <div *rxVirtualViewContent class="template">
                c-{{ item.label }}
              </div>
              <div
                *rxVirtualViewPlaceholder
                class="placeholder"
                style="min-height: var(--rx-vw-h, 107px)"
              ></div>
            }
          }
        </div>
      }
    </div>
  `,
})
export class ForSwitchHost {
  readonly items = signal<CfItem[]>([
    { id: 1, kind: 'a', label: 'item-a' },
    { id: 2, kind: 'b', label: 'item-b' },
    { id: 3, kind: 'c', label: 'item-c' },
  ]);
}

/* -------------------------------------------------------------------------- */
/*  SizeHost                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A single `rxVirtualView` whose reserved size is driven through the
 * `ResizeObserver` (via `emitResize`). Exposes an `extractSize` input bound to
 * `[extractSize]` so specs can validate the default extractor as well as a
 * custom variant. `keepLastKnownSize` and `useContentVisibility` are also
 * exposed for CLS scenarios.
 */
@Component({
  selector: 'rx-size-host',
  standalone: true,
  imports: [
    RxVirtualViewObserver,
    RxVirtualView,
    RxVirtualViewContent,
    RxVirtualViewPlaceholder,
  ],
  template: `
    <div class="container" rxVirtualViewObserver [root]="null">
      <div
        rxVirtualView
        #vv="rxVirtualView"
        class="widget"
        [extractSize]="extractSize()"
        [keepLastKnownSize]="keepLastKnownSize()"
        [useContentVisibility]="useContentVisibility()"
      >
        <div *rxVirtualViewContent class="template">ze-template</div>
        <div *rxVirtualViewPlaceholder class="placeholder">ze-placeholder</div>
      </div>
    </div>
  `,
})
export class SizeHost {
  readonly extractSize =
    input<(entry: ResizeObserverEntry) => { width: number; height: number }>(
      defaultExtractSize,
    );
  readonly keepLastKnownSize = input<boolean | undefined>(undefined);
  readonly useContentVisibility = input<boolean | undefined>(undefined);
}

/* -------------------------------------------------------------------------- */
/*  NoObserverHost                                                            */
/* -------------------------------------------------------------------------- */

/**
 * An `rxVirtualView` with NO `rxVirtualViewObserver` ancestor, used to test the
 * SSR-style / `enabled: false` path where the directive must render its content
 * synchronously and must not throw about a missing observer.
 */
@Component({
  selector: 'rx-no-observer-host',
  standalone: true,
  imports: [RxVirtualView, RxVirtualViewContent, RxVirtualViewPlaceholder],
  template: `
    <div rxVirtualView #vv="rxVirtualView" class="widget-no-observer">
      <div *rxVirtualViewContent class="template">ze-template</div>
      <div *rxVirtualViewPlaceholder class="placeholder">ze-placeholder</div>
    </div>
  `,
})
export class NoObserverHost {}
