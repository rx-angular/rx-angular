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
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RxStrategyProvider } from '@rx-angular/cdk/render-strategies';
import { connectable, NEVER, Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import {
  _RxVirtualView,
  _RxVirtualViewObserver,
  _RxVirtualViewPlaceholder,
  _RxVirtualViewTemplate,
} from './model';
import { RxaResizeObserver } from './resize-observer';
import { VirtualViewCache } from './virtual-view-cache';

declare const ngDevMode: boolean;

type BooleanInput = string | boolean | null | undefined;

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
export class RxVirtualView implements AfterContentInit, _RxVirtualView {
  template: _RxVirtualViewTemplate;
  placeholder?: _RxVirtualViewPlaceholder;

  #observer = inject(_RxVirtualViewObserver);
  #elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  #strategyProvider = inject<RxStrategyProvider>(RxStrategyProvider);
  #viewCache = inject(VirtualViewCache);
  #resizeObserver = inject(RxaResizeObserver);
  #destroyRef = inject(DestroyRef);

  cacheEnabled = input<boolean, BooleanInput>(true, {
    transform: booleanAttribute,
  });

  startWithPlaceholderAsap = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  keepLastKnownSize = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  useContentVisibility = input<boolean, BooleanInput>(false, {
    transform: booleanAttribute,
  });

  useContainment = input<boolean, BooleanInput>(true, {
    transform: booleanAttribute,
  });

  #placeholderVisible = signal(false);
  #templateVisible = false;
  #visible$ = connectable(
    this.#observer.register(this.#elementRef.nativeElement),
    {
      connector: () => new ReplaySubject<boolean>(1),
    },
  );

  size = signal({ width: 0, height: 0 });
  width = computed(() =>
    this.size().width ? `${this.size().width}px` : 'auto',
  );
  height = computed(() =>
    this.size().height ? `${this.size().height}px` : 'auto',
  );
  containment = computed(() => {
    if (!this.useContainment()) {
      return null;
    }
    return this.useContentVisibility() && this.#placeholderVisible()
      ? 'size layout paint'
      : 'content';
  });
  intrinsicWidth = computed(() => {
    if (!this.useContentVisibility()) {
      return null;
    }
    return this.width() === 'auto' ? 'auto' : `auto ${this.width()}`;
  });
  intrinsicHeight = computed(() => {
    if (!this.useContentVisibility()) {
      return null;
    }
    return this.height() === 'auto' ? 'auto' : `auto ${this.height()}`;
  });

  minHeight = computed(() => {
    return this.keepLastKnownSize() && this.#placeholderVisible()
      ? this.height()
      : null;
  });
  minWidth = computed(() => {
    return this.keepLastKnownSize() && this.#placeholderVisible()
      ? this.width()
      : null;
  });

  constructor() {
    const visibleSub = this.#visible$.connect();
    this.#destroyRef.onDestroy(() => visibleSub.unsubscribe());
  }

  ngAfterContentInit() {
    if (ngDevMode && !this.template) {
      throw new Error(
        'RxVirtualView expects you to provide a RxVirtualViewTemplate',
      );
    }
    if (this.startWithPlaceholderAsap()) {
      this.renderPlaceholder();
    }
    this.#visible$
      .pipe(
        distinctUntilChanged(),
        switchMap((visible) => {
          if (visible) {
            return this.#templateVisible
              ? NEVER
              : this.showTemplate$().pipe(
                  switchMap((view) => {
                    const resize$ = this.observeElementSize$();
                    view.detectChanges();
                    return resize$;
                  }),
                  tap(({ borderBoxSize }) => {
                    this.size.set({
                      width: borderBoxSize[0].inlineSize,
                      height: borderBoxSize[0].blockSize,
                    });
                  }),
                );
          }
          return this.#placeholderVisible() ? NEVER : this.showPlaceholder$();
        }),
        takeUntilDestroyed(this.#destroyRef),
        tap({
          unsubscribe: () => {
            this.#viewCache.clear(this);
          },
        }),
      )
      .subscribe();
  }

  registerTemplate(template: _RxVirtualViewTemplate) {
    this.template = template;
  }

  registerPlaceholder(placeholder: _RxVirtualViewPlaceholder) {
    this.placeholder = placeholder;
  }

  private showTemplate$(): Observable<EmbeddedViewRef<unknown>> {
    return this.#strategyProvider.schedule(
      () => {
        this.#templateVisible = true;
        this.#placeholderVisible.set(false);
        const placeHolder = this.template.viewContainerRef.detach();
        if (this.cacheEnabled() && placeHolder) {
          this.#viewCache.storePlaceholder(this, placeHolder);
        } else if (!this.cacheEnabled() && placeHolder) {
          placeHolder.destroy();
        }
        const tmpl =
          (this.#viewCache.getTemplate(this) as EmbeddedViewRef<unknown>) ??
          this.template.templateRef.createEmbeddedView({});
        this.template.viewContainerRef.insert(tmpl);
        placeHolder?.detectChanges();

        return tmpl;
      },
      { scope: this },
    );
  }

  private showPlaceholder$() {
    return this.#strategyProvider.schedule(() => this.renderPlaceholder(), {
      scope: this,
    });
  }

  private renderPlaceholder() {
    this.#placeholderVisible.set(true);
    this.#templateVisible = false;
    const template = this.template.viewContainerRef.detach();
    if (this.cacheEnabled() && template) {
      this.#viewCache.storeTemplate(this, template);
    } else if (!this.cacheEnabled() && template) {
      template.destroy();
    }
    template?.detectChanges();
    if (this.placeholder) {
      const placeholderRef =
        this.#viewCache.getPlaceholder(this) ??
        this.placeholder.templateRef.createEmbeddedView({});
      this.template.viewContainerRef.insert(placeholderRef);
      placeholderRef.detectChanges();
    }
  }

  private observeElementSize$() {
    return this.#resizeObserver.observeElement(this.#elementRef.nativeElement);
  }
}
