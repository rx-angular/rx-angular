import { DOCUMENT, isPlatformServer } from '@angular/common';
import {
  computed,
  DestroyRef,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  NgZone,
  PLATFORM_ID,
  runInInjectionContext,
} from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { Router, RouterPreloader } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import {
  PreResolver,
  PreResolverRegistry,
} from './pre-resolver-registry.service';
import schedule from './schedule';
import { SpeculativeLinkObserver } from './speculative-link-observer.service';

/**
 *
 * Inspired by the [Speculation Rules API]{@link https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API}
 *
 * @whatItDoes When the link is observed in the viewport it will preload its route and execute its preResolvers.
 *
 */

@Directive({
  standalone: true,
  selector: '[speculativeLink]',
})
export class SpeculativeLink {
  readonly ref = input.required<string>({ alias: 'speculativeLink' });

  readonly #router = inject(Router);
  readonly #ngZone = inject(NgZone);
  readonly #document = inject(DOCUMENT);
  readonly #platformId = inject(PLATFORM_ID);
  readonly #loader = inject(RouterPreloader);
  public readonly element: HTMLElement = inject(ElementRef).nativeElement;

  readonly #observer = inject(SpeculativeLinkObserver);
  readonly #preResolverRegistry = inject(PreResolverRegistry);

  constructor(destroyRef: DestroyRef) {
    toObservable(this.urlTree)
      .pipe(
        tap(() => this.#preResolvers.clear()),
        filter(Boolean),
        switchMap((urlTree) => {
          return this.#preResolverRegistry.matchingPreResolver(urlTree);
        }),
        tap((preResolver) => this.#addPreResolver(preResolver)),
        takeUntilDestroyed(),
      )
      .subscribe();

    destroyRef.onDestroy(() => {
      this.#observer.unregister(this);
    });

    effect(() => {
      const tree = this.urlTree();

      if (!tree) {
        this.#observer.unregister(this);
        return;
      }

      this.#observer.register(this);
    });
  }

  readonly #preResolvers = new Set<PreResolver>();

  onEnterViewport() {
    this.#loader.preload().subscribe(() => void 0);

    this.#preResolvers.forEach((preResolver) => {
      this.#executePreResolver(preResolver);
    });
  }

  onExitViewport(): void {
    return;
  }

  urlTree = computed(() => {
    if (isPlatformServer(this.#platformId)) {
      return null;
    }
    const href = this.ref();
    if (href === null) {
      return null;
    }
    if (!href.includes('http')) {
      return this.#router.parseUrl(href);
    }
    const url = new URL(href);
    if (this.#document.location.hostname !== url.hostname) {
      return null;
    }
    return this.#router.parseUrl(url.pathname);
  });

  #addPreResolver(preResolver: PreResolver): void {
    this.#preResolvers.add(preResolver);
    this.#executePreResolver(preResolver);
  }

  #executePreResolver(preResolver: PreResolver): void {
    schedule(() => {
      runInInjectionContext(preResolver.injector, () => {
        this.#ngZone.run(() => {
          preResolver.route.data.preResolve({
            data: preResolver.route.data,
            params: preResolver.params,
          });
        });
      });
    });
  }
}
