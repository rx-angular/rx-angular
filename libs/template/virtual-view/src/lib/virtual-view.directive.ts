import {
  AfterContentInit,
  booleanAttribute,
  computed,
  DestroyRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  inject,
  input,
  OnDestroy,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  RxStrategyNames,
  RxStrategyProvider,
} from '@rx-angular/cdk/render-strategies';
import { NEVER, Observable, ReplaySubject } from 'rxjs';
import {
  distinctUntilChanged,
  finalize,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  _RxVirtualView,
  _RxVirtualViewObserver,
  _RxVirtualViewPlaceholder,
  _RxVirtualViewTemplate,
} from './model';
import { VIRTUAL_VIEW_CONFIG_TOKEN } from './virtual-view.config';
import { VirtualViewCache } from './virtual-view-cache';

/**
 * The RxVirtualView directive is a directive that allows you to create virtual views.
 *
 * It can be used on an element/component to create a virtual view.
 *
 * It works by using 3 directives:
 * - `rxVirtualViewTemplate`: The template to render when the virtual view is visible.
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
 *     <div *rxVirtualViewTemplate>Virtual View 1</div>
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

  #template: _RxVirtualViewTemplate;
  #placeholder?: _RxVirtualViewPlaceholder;

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
   * If `true`, the placeholder will be rendered immediately, without waiting for the template to be visible.
   * This is useful when you want to render the placeholder immediately, but you don't want to wait for the template to be visible.
   *
   * This is to counter concurrent rendering, and to avoid flickering.
   */
  readonly startWithPlaceholderAsap = input(
    this.#config.startWithPlaceholderAsap,
    {
      transform: booleanAttribute,
    },
  );

  /**
   * This will keep the last known size of the host element while the template is visible.
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
   * - `content`: if `useContentVisibility` is `false` || template is visible
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
   * The strategy to use for rendering the template.
   */
  readonly templateStrategy = input<RxStrategyNames<string>>(
    this.#config.templateStrategy,
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

  readonly #placeholderVisible = signal(false);

  #templateIsShown = false;

  readonly #visible$ = new ReplaySubject<boolean>(1);

  readonly size = signal({ width: 0, height: 0 });

  readonly width = computed(() =>
    this.size().width ? `${this.size().width}px` : 'auto',
  );

  readonly height = computed(() =>
    this.size().height ? `${this.size().height}px` : 'auto',
  );

  readonly containment = computed(() => {
    if (!this.useContainment()) {
      return null;
    }
    return this.useContentVisibility() && this.#placeholderVisible()
      ? 'size layout paint'
      : 'content';
  });

  readonly intrinsicWidth = computed(() => {
    if (!this.useContentVisibility()) {
      return null;
    }
    return this.width() === 'auto' ? 'auto' : `auto ${this.width()}`;
  });
  readonly intrinsicHeight = computed(() => {
    if (!this.useContentVisibility()) {
      return null;
    }
    return this.height() === 'auto' ? 'auto' : `auto ${this.height()}`;
  });

  readonly minHeight = computed(() => {
    return this.keepLastKnownSize() && this.#placeholderVisible()
      ? this.height()
      : null;
  });
  readonly minWidth = computed(() => {
    return this.keepLastKnownSize() && this.#placeholderVisible()
      ? this.width()
      : null;
  });

  constructor() {
    if (!this.#observer) {
      throw new Error(
        'RxVirtualView expects you to provide a RxVirtualViewObserver',
      );
    }
  }

  ngAfterContentInit() {
    if (!this.#template) {
      throw new Error(
        'RxVirtualView expects you to provide a RxVirtualViewTemplate',
      );
    }
    if (this.startWithPlaceholderAsap()) {
      this.renderPlaceholder();
    }
    this.#observer
      .observeElementVisibility(this.#elementRef.nativeElement)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((visible) => this.#visible$.next(visible));
    this.#visible$
      .pipe(
        distinctUntilChanged(),
        switchMap((visible) => {
          if (visible) {
            return this.#templateIsShown
              ? NEVER
              : this.showTemplate$().pipe(
                  switchMap((view) => {
                    const resize$ = this.#observer.observeElementSize(
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
          this.#viewCache.clear(this);
        }),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }

  ngOnDestroy() {
    // WE DON'T NEED THAT... but enea insists!
    this.#template = null;
    this.#placeholder = null;
  }

  registerTemplate(template: _RxVirtualViewTemplate) {
    this.#template = template;
  }

  registerPlaceholder(placeholder: _RxVirtualViewPlaceholder) {
    this.#placeholder = placeholder;
  }

  /**
   * Shows the template using the configured rendering strategy (by default: normal).
   * @private
   */
  private showTemplate$(): Observable<EmbeddedViewRef<unknown>> {
    return this.#strategyProvider.schedule(
      () => {
        this.#templateIsShown = true;
        this.#placeholderVisible.set(false);
        const placeHolder = this.#template.viewContainerRef.detach();
        if (this.cacheEnabled() && placeHolder) {
          this.#viewCache.storePlaceholder(this, placeHolder);
        } else if (!this.cacheEnabled() && placeHolder) {
          placeHolder.destroy();
        }
        const tmpl =
          (this.#viewCache.getTemplate(this) as EmbeddedViewRef<unknown>) ??
          this.#template.templateRef.createEmbeddedView({});
        this.#template.viewContainerRef.insert(tmpl);
        placeHolder?.detectChanges();

        return tmpl;
      },
      { scope: this, strategy: this.templateStrategy() },
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
   * Renders a placeholder within the view container, and hides the template.
   *
   * If we already have a template and cache enabled, we store the template in
   * the cache, so we can reuse it later.
   *
   * When we want to render the placeholder, we try to get it from the cache,
   * and if it is not available, we create a new one.
   *
   * Then insert the placeholder into the view container and trigger a CD.
   */
  private renderPlaceholder() {
    this.#placeholderVisible.set(true);
    this.#templateIsShown = false;

    const template = this.#template.viewContainerRef.detach();

    if (template) {
      if (this.cacheEnabled()) {
        this.#viewCache.storeTemplate(this, template);
      } else {
        template.destroy();
      }

      template?.detectChanges();
    }

    if (this.#placeholder) {
      const placeholderRef =
        this.#viewCache.getPlaceholder(this) ??
        this.#placeholder.templateRef.createEmbeddedView({});

      this.#template.viewContainerRef.insert(placeholderRef);
      placeholderRef.detectChanges();
    }
  }
}

const defaultExtractSize = (entry: ResizeObserverEntry) => ({
  width: entry.borderBoxSize[0].inlineSize,
  height: entry.borderBoxSize[0].blockSize,
});
