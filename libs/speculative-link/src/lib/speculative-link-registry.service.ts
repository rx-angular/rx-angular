import { inject, Injectable } from '@angular/core';
import {
  Params,
  PRIMARY_OUTLET,
  Route,
  Router,
  Routes,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import type { SpeculativeLink } from '../index';
import { findPathDetails, PathDetails, PATTERN_ALIAS } from './util';

@Injectable({ providedIn: 'root' })
export class SpeculativeLinkRegistry {
  readonly #router = inject(Router);

  readonly registeredElements = new WeakMap<Element, SpeculativeLink>();
  readonly intersectingElements = new Set<SpeculativeLink>();

  shouldPrefetch(route: Route) {
    if (this.intersectingElements.size === 0) return false; // Do not check if in prefetch trees if is empty
    const { url, matcherRoutes } = findPathDetails(this.#router.config, route);
    const tree = this.#router.parseUrl(url);
    (<TreeWithRoutes>tree)['matchers'] = matcherRoutes;
    for (const link of this.intersectingElements) {
      const urlTree = link.urlTree();
      if (urlTree && containsTree(tree, urlTree)) {
        return true;
      }
    }
    return false;
  }
}

function containsQueryParams(container: Params, containee: Params): boolean {
  // TODO: This does not handle array params correctly.
  return (
    Object.keys(containee).length <= Object.keys(container).length &&
    Object.keys(containee).every((key) => containee[key] === container[key])
  );
}

function containsTree(containee: UrlTree, container: UrlTree): boolean {
  return (
    containsQueryParams(container.queryParams, containee.queryParams) &&
    containsSegmentGroup(
      container.root,
      containee.root,
      containee.root.segments,
      (<TreeWithRoutes>containee)['matchers'],
    )
  );
}

type TreeWithRoutes = UrlTree & { matchers: Routes };

function containsSegmentGroup(
  container: UrlSegmentGroup,
  containee: UrlSegmentGroup,
  containeePaths: UrlSegment[],
  matchers: PathDetails['matcherRoutes'],
): boolean {
  if (container.segments.length > containeePaths.length) {
    const current = container.segments.slice(0, containeePaths.length);
    if (!equalPath(current, containeePaths, matchers)) return false;
    return !containee.hasChildren();
  } else if (container.segments.length === containeePaths.length) {
    if (!equalPath(container.segments, containeePaths, matchers)) return false;
    if (!containee.hasChildren()) return true;

    for (const c in containee.children) {
      if (!container.children[c]) break;
      if (
        containsSegmentGroup(
          container.children[c]!,
          containee.children[c]!,
          containee.children[c]!.segments,
          matchers,
        )
      )
        return true;
    }
    return false;
  } else {
    const current = containeePaths.slice(0, container.segments.length);
    const next = containeePaths.slice(container.segments.length);
    if (!equalPath(container.segments, current, matchers)) return false;
    if (!container.children[PRIMARY_OUTLET]) return false;
    return containsSegmentGroup(
      container.children[PRIMARY_OUTLET],
      containee,
      next,
      matchers,
    );
  }
}

function equalPath(
  as: UrlSegment[],
  bs: UrlSegment[],
  matchers: PathDetails['matcherRoutes'],
): boolean {
  if (as.length !== bs.length) return false;
  return as.every(
    (a, i) =>
      a.path === bs[i]!.path ||
      a.path.startsWith(':') ||
      bs[i]!.path.startsWith(':') ||
      matchesMatcher(a, bs, i, matchers),
  );
}

function matchesMatcher(
  a: UrlSegment,
  bs: UrlSegment[],
  i: number,
  matchers?: PathDetails['matcherRoutes'],
): boolean {
  if (
    matchers &&
    matchers.length &&
    matchers[0]!.matcher &&
    bs[i]!.path === PATTERN_ALIAS
  ) {
    // @TODO: This does not remove the matcher so it does not work properly if route contains multiple URL matchers
    return !!matchers[0]!.matcher([a], [] as any, matchers[0]!);
  }
  return false;
}
