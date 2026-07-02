import { inject, Injectable, Injector } from '@angular/core';
import {
  Data,
  Params,
  Route,
  RouteConfigLoadEnd,
  Router,
  Routes,
  UrlTree,
} from '@angular/router';
import { filter, map, Observable, ReplaySubject, tap } from 'rxjs';
import { MatcherService } from './matcher.service';
import schedule from './schedule';

export type PreResolver = {
  route: RouteWithPreResolver;
  params: Params;
  injector: Injector;
};

export type RouteWithPreResolver = Route & {
  data: {
    preResolve: (route: { data: Data; params: Params }) => void;
  };
  _injector?: Injector;
};

@Injectable({ providedIn: 'root' })
export class PreResolverRegistry {
  readonly #injector = inject(Injector);

  readonly #matcher = inject(MatcherService);

  readonly #loaded$ = new ReplaySubject<RouteWithPreResolver>();
  readonly loadedPreResolvers$ = this.#loaded$.asObservable();
  readonly #preResolverRoutes = new Set<RouteWithPreResolver>();

  constructor(router: Router) {
    router.events
      .pipe(
        filter(
          (event): event is RouteConfigLoadEnd =>
            event instanceof RouteConfigLoadEnd,
        ),
        tap(({ route }) => {
          /**
           * The idleCallback is necessary because routes have loaded but not yet processed, the fields we
           * access to load the preResolvers and the required data like _loadRoutes are only present after
           * it's done processing.
           */
          schedule(() => {
            // Check if preResolver already loaded to prevent over execution due to scheduling
            if (!this.#preResolverRoutes.has(route as any)) {
              this.#registerPreResolverRoutes(route);
            }
          });
        }),
      )
      .subscribe();
  }

  #registerPreResolverRoutes(route: Route): void {
    if (this.#routeHasPreResolver(route)) {
      this.#preResolverRoutes.add(route);
      this.#loaded$.next(route);
    }

    // @TODO note about missing type...
    const children: Routes = route.children ?? (<any>route)['_loadedRoutes'];
    if (children?.length) {
      children.forEach((child) => {
        this.#registerPreResolverRoutes(child);
      });
    }
  }

  #routeHasPreResolver(route: Route): route is RouteWithPreResolver {
    return (
      route.data?.['preResolve'] &&
      typeof route.data['preResolve'] === 'function'
    );
  }

  matchingPreResolver(tree: UrlTree): Observable<PreResolver> {
    return this.loadedPreResolvers$.pipe(
      map((route: RouteWithPreResolver) => ({
        route,
        params: this.#matcher.matches(route, tree),
        injector: route['_injector'] ?? this.#injector,
      })),
      filter((preResolver): preResolver is PreResolver => {
        return preResolver.params !== null;
      }),
    );
  }
}
