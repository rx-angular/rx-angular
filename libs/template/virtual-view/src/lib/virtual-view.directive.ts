import {
  AfterContentInit,
  booleanAttribute,
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  EmbeddedViewRef,
  inject,
  INJECTOR,
  input,
  isSignal,
  OnDestroy,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { PLATFORM } from '@rx-angular/cdk/ssr';
import { finalize, NEVER, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import {
  _RxVirtualView,
  _RxVirtualViewContent,
  _RxVirtualViewObserver,
  _RxVirtualViewPlaceholder,
} from './model';
import { effectOnceIf } from './util';
import { VIRTUAL_VIEW_CONFIG_TOKEN } from './virtual-view.config';
import { VirtualViewCache } from './virtual-view-cache';

/**
 * The RxVirtualView directive is a directive that allows you to create virtual views.
 *
 * It can be used on an element/component to create a virtual view.
 *
 * It works by using 3 directives:
 * - `rxVirtualViewContent`: The content to render when the virtual view is visible.
 * - `rxVirtualViewPlaceholder`: The placeholder to render when the virtual view is not visible.
 * - `rxVirtualViewObserver`: The directive that observes the virtual view and emits a boolean value indicating whether the virtual view is visible.
 *
 * The `rxVirtualViewObserver` directive is mandatory for the `rxVirtualView` directive to work.
 * And it needs to be a sibling of the `rxVirtualView` directive.
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
@Directive({
  selector: '[rxVirtualView]',
  host: {
    '[style.--rx-vw-h]': 'height()',
    '[style.--rx-vw-w]': 'width()',
    '[style.min-height]': 'minHeight()',
    '[style.min-width]': 'minWidth()',
    '[style.contain]': 'containment()',
    '[style.contain-intrinsic-width]': 'intrinsicWidth()',
    '[style.contain-intrinsic-height]': 'intrinsicHeight()',
    '[style.content-visibility]': 'useContentVisibility() ? "auto" : null',
  },
  exportAs: 'rxVirtualView',
  providers: [{ provide: _RxVirtualView, useExisting: RxVirtualView }],
})
export class RxVirtualView
  implements AfterContentInit, _RxVirtualView, OnDestroy
{
  readonly #observer = inject(_RxVirtualViewObserver, { optional: true });
  readonly #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  readonly #strategyProvider = inject<RxStrategyProvider>(RxStrategyProvider);
  readonly #viewCache = inject(VirtualViewCache, { optional: true });
  readonly #destroyRef = inject(DestroyRef);
  readonly #config = inject(VIRTUAL_VIEW_CONFIG_TOKEN);
  readonly #platform = inject(PLATFORM);
  readonly #injector = inject(INJECTOR);

  readonly #enabled = computed(() =>
    isSignal(this.#config.enabled)
      ? this.#config.enabled()
      : this.#config.enabled,
  );

  #content = signal<_RxVirtualViewContent | null>(null);
  #placeholder = signal<_RxVirtualViewPlaceholder | null>(null);

  /**
   * Useful when we want to cache the templates and placeholders to optimize view rendering.
   *
   * Enabled by default.
   */
  readonly cacheEnabled = input(this.#config.cacheEnabled, {
    transform: booleanAttribute,
  });

  /**
   * Whether to start with the placeholder asap or not.
   *
   * If `true`, the placeholder will be rendered immediately, without waiting for the content to be visible.
   * This is useful when you want to render the placeholder immediately, but you don't want to wait for the content to be visible.
   *
   * This is to counter concurrent rendering, and to avoid flickering.
   */
  readonly startWithPlaceholderAsap = input(
    this.#config.startWithPlaceholderAsap,
    { transform: booleanAttribute },
  );

  /**
   * This will keep the last known size of the host element while the content is visible.
   */
  readonly keepLastKnownSize = input(this.#config.keepLastKnownSize, {
    transform: booleanAttribute,
  });

  /**
   * Whether to use content visibility or not.
   *
   * It will add the `content-visibility` CSS class to the host element, together with
   * `contain-intrinsic-width` and `contain-intrinsic-height` CSS properties.
   */
  readonly useContentVisibility = input(this.#config.useContentVisibility, {
    transform: booleanAttribute,
  });

  /**
   * Whether to use containment or not.
   *
   * It will add `contain` css property with:
   * - `size layout paint`: if `useContentVisibility` is `true` && placeholder is visible
   * - `content`: if `useContentVisibility` is `false` || content is visible
   */
  readonly useContainment = input(this.#config.useContainment, {
    transform: booleanAttribute,
  });

  /**
   * The strategy to use for rendering the placeholder.
   */
  readonly placeholderStrategy = input<RxStrategyNames<string>>(
    this.#config.placeholderStrategy,
  );

  /**
   * The strategy to use for rendering the content.
   */
  readonly contentStrategy = input<RxStrategyNames<string>>(
    this.#config.contentStrategy,
  );

  /**
   * A function extracting width & height from a ResizeObserverEntry
   */
  readonly extractSize =
    input<(entry: ResizeObserverEntry) => { width: number; height: number }>(
      defaultExtractSize,
    );

  /**
   * ResizeObserverOptions
   */
  readonly resizeObserverOptions = input<ResizeObserverOptions>();

  /**
   * Emits when the visibility state of the virtual view changes.
   *
   * This output fires whenever the virtual view transitions between showing content and showing placeholder.
   * The emitted value is an object containing the current visibility state of both the content and placeholder.
   *
   * @example
   * ```html
   * <div rxVirtualViewObserver>
   *   <div rxVirtualView (visibilityChanged)="onVisibilityChanged($event)">
   *     <div *rxVirtualViewContent>Virtual View Content</div>
   *     <div *rxVirtualViewPlaceholder>Loading...</div>
   *   </div>
   * </div>
   * ```
   *
   * ```typescript
   * onVisibilityChanged(event: { content: boolean; placeholder: boolean }) {
   *   console.log('Content visible:', event.content);
   *   console.log('Placeholder visible:', event.placeholder);
   * }
   * ```
   */
  readonly visibilityChanged = output<{
    content: boolean;
    placeholder: boolean;
  }>();

  /**
   * Returns the current visibility state of the content and placeholder.
   *
   * This getter provides synchronous access to the visibility state, which can be useful
   * when you need to check the current state imperatively or from the template.
   *
   * @returns An object containing:
   * - `content`: `true` if the content is currently visible, `false` otherwise
   * - `placeholder`: `true` if the placeholder is currently visible, `false` otherwise
   *
   * @example
   * ```html
   * <!-- Access visibility state in template using exportAs -->
   * <div rxVirtualViewObserver>
   *   <div rxVirtualView #virtualView="rxVirtualView">
   *     <div *rxVirtualViewContent>Virtual View Content</div>
   *     <div *rxVirtualViewPlaceholder>Loading...</div>
   *   </div>
   *
   *   <!-- Display visibility state -->
   *   <div>
   *     Content visible: {{ virtualView.visibility.content }}
   *     Placeholder visible: {{ virtualView.visibility.placeholder }}
   *   </div>
   * </div>
   * ```
   */
  get visibility() {
    return {
      content: this.#contentIsShown,
      placeholder: !this.#contentIsShown,
    };
  }

  readonly #placeholderVisible = signal(false);

  #contentIsShown = false;

  /**
   * The `_RxVirtualViewContent` directive whose template is currently embedded
   * in the view container. Used to detect runtime content-template swaps (e.g.
   * an `@switch` / `@if` case change inside `rxVirtualView` that replaces the
   * active `*rxVirtualViewContent` while the host element stays mounted) so the
   * new template is rendered instead of leaving the card blank.
   */
  #renderedContent: _RxVirtualViewContent | null = null;

  readonly #visible$ = new ReplaySubject<boolean>(1);

  readonly size = signal({ width: 0, height: 0 });

  readonly width = computed(() =>
    this.#enabled() && this.size().width ? `${this.size().width}px` : null,
  );

  readonly height = computed(() =>
    this.#enabled() && this.size().height ? `${this.size().height}px` : null,
  );

  readonly containment = computed(() => {
    if (!this.useContainment() || !this.#enabled()) {
      return null;
    }
    return this.useContentVisibility() && this.#placeholderVisible()
      ? 'size layout paint'
      : 'content';
  });

  readonly intrinsicWidth = computed(() => {
    if (!this.useContentVisibility() || !this.#enabled()) {
      return null;
    }
    return this.width() === 'auto' ? 'auto' : `auto ${this.width()}`;
  });
  readonly intrinsicHeight = computed(() => {
    if (!this.useContentVisibility() || !this.#enabled()) {
      return null;
    }
    return this.height() === 'auto' ? 'auto' : `auto ${this.height()}`;
  });

  readonly minHeight = computed(() => {
    return this.keepLastKnownSize() &&
      this.#placeholderVisible() &&
      this.#enabled()
      ? this.height()
      : null;
  });
  readonly minWidth = computed(() => {
    return this.keepLastKnownSize() &&
      this.#placeholderVisible() &&
      this.#enabled()
      ? this.width()
      : null;
  });

  constructor() {
    effectOnceIf(
      () => this.#enabled(),
      () => {
        if (this.#platform.isBrowser && !this.#observer) {
          throw new Error(
            'RxVirtualView expects you to provide a RxVirtualViewObserver',
          );
        }
      },
    );
  }

  ngAfterContentInit() {
    if (this.#enabled()) {
      if (!this.#content()) {
        throw new Error(
          'RxVirtualView expects you to provide a RxVirtualViewContent',
        );
      }
      if (this.startWithPlaceholderAsap()) {
        this.renderPlaceholder();
      }
    }

    // when enabled:
    // - register visibility listener
    // - hide things that are not visible anymore
    if (this.#enabled()) {
      this.#registerRenderingBasedOnVisibility();
    } else if (this.#config.enableAfterHydration) {
      // Disabled now (server / pre-hydration). Once the view becomes enabled
      // (e.g. after hydration) switch to visibility-based rendering.
      effectOnceIf(
        () => this.#enabled(),
        () => this.#registerRenderingBasedOnVisibility(),
        { injector: this.#injector },
      );
    }

    // Keep the embedded content in sync with the active *rxVirtualViewContent
    // directive. A single effect covers every case where #content() changes:
    //  - the disabled/SSR initial render (show content as soon as available),
    //  - deferred content that starts inside an inactive @if/@switch branch,
    //  - runtime content-template swaps (e.g. an @switch case change) while the
    //    host element stays mounted, in both the disabled and enabled states.
    this.#registerContentSync();
  }

  /**
   * Reactively renders the active content directive whenever it changes.
   *
   * While disabled the current content is always shown. While enabled the
   * visibility pipeline owns the initial show/hide (and size handling), so this
   * only re-renders a *swap* that happens while content is already shown —
   * otherwise it would fight the placeholder/visibility logic.
   * @private
   */
  #registerContentSync() {
    effect(
      () => {
        const content = this.#content();
        if (!content || content === this.#renderedContent) {
          return;
        }
        const shouldShow = this.#enabled() ? this.#contentIsShown : true;
        if (shouldShow) {
          this.#renderContent(content);
        }
      },
      { injector: this.#injector },
    );
  }

  /**
   * Creates the embedded view for the given content directive and marks it as
   * the currently rendered content. Used for the disabled render and for
   * runtime content-template swaps.
   * @private
   */
  #renderContent(content: _RxVirtualViewContent) {
    this.#contentIsShown = true;
    this.#placeholderVisible.set(false);
    this.#renderedContent = content;
    const view = content.viewContainerRef.createEmbeddedView(
      content.templateRef,
    );
    view.detectChanges();
    this.visibilityChanged.emit({ content: true, placeholder: false });
  }

  #registerRenderingBasedOnVisibility() {
    this.#observer
      ?.observeElementVisibility(this.#elementRef.nativeElement)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((visible) => this.#visible$.next(visible));

    this.#visible$
      .pipe(
        distinctUntilChanged(),
        switchMap((visible) => {
          if (visible) {
            return this.#contentIsShown
              ? NEVER
              : this.showContent$().pipe(
                  switchMap((view) => {
                    const resize$ = this.#observer!.observeElementSize(
                      this.#elementRef.nativeElement,
                      this.resizeObserverOptions(),
                    );
                    view.detectChanges();
                    return resize$;
                  }),
                  map(this.extractSize()),
                  tap(({ width, height }) => this.size.set({ width, height })),
                );
          }
          return this.#placeholderVisible() ? NEVER : this.showPlaceholder$();
        }),
        finalize(() => {
          this.#viewCache!.clear(this);
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.#content.set(null);
    this.#placeholder.set(null);
    this.#renderedContent = null;
    this.#viewCache?.clear(this);
  }

  registerContent(content: _RxVirtualViewContent) {
    this.#content.set(content);
  }

  registerPlaceholder(placeholder: _RxVirtualViewPlaceholder) {
    this.#placeholder.set(placeholder);
  }

  /**
   * Shows the content using the configured rendering strategy (by default: normal).
   * @private
   */
  private showContent$(): Observable<EmbeddedViewRef<unknown>> {
    return this.#strategyProvider.schedule(
      () => {
        this.#contentIsShown = true;
        this.#renderedContent = this.#content();
        this.#placeholderVisible.set(false);
        const placeHolder = this.#content()!.viewContainerRef.detach();
        if (this.cacheEnabled() && placeHolder) {
          this.#viewCache!.storePlaceholder(this, placeHolder);
        } else if (!this.cacheEnabled() && placeHolder) {
          placeHolder.destroy();
        }
        const contentTpl =
          (this.#viewCache!.getContent(this) as EmbeddedViewRef<unknown>) ??
          this.#content()!.templateRef.createEmbeddedView({});
        this.#content()!.viewContainerRef.insert(contentTpl);
        placeHolder?.detectChanges();
        this.visibilityChanged.emit({ content: true, placeholder: false });
        return contentTpl;
      },
      { scope: this, strategy: this.contentStrategy() },
    );
  }

  /**
   * Shows the placeholder using the configured rendering strategy (by default: low).
   * @private
   */
  private showPlaceholder$() {
    return this.#strategyProvider.schedule(() => this.renderPlaceholder(), {
      scope: this,
      strategy: this.placeholderStrategy(),
    });
  }

  /**
   * Renders a placeholder within the view container, and hides the content.
   *
   * If we already have a content and cache enabled, we store the content in
   * the cache, so we can reuse it later.
   *
   * When we want to render the placeholder, we try to get it from the cache,
   * and if it is not available, we create a new one.
   *
   * Then insert the placeholder into the view container and trigger a CD.
   */
  private renderPlaceholder() {
    this.#placeholderVisible.set(true);
    this.#contentIsShown = false;

    const content = this.#content()!.viewContainerRef.detach();

    if (content) {
      if (this.cacheEnabled()) {
        this.#viewCache!.storeContent(this, content);
      } else {
        content.destroy();
      }

      content?.detectChanges();
    }

    if (this.#placeholder()) {
      const placeholderRef =
        this.#viewCache!.getPlaceholder(this) ??
        this.#placeholder()!.templateRef.createEmbeddedView({});

      this.#content()!.viewContainerRef.insert(placeholderRef);
      placeholderRef.detectChanges();
    }

    this.visibilityChanged.emit({ content: false, placeholder: true });
  }
}

const defaultExtractSize = (entry: ResizeObserverEntry) => ({
  width: entry.borderBoxSize[0].inlineSize,
  height: entry.borderBoxSize[0].blockSize,
});
