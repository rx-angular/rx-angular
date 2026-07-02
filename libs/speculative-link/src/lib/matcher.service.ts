import { inject, Injectable } from '@angular/core';
import {
  Params,
  PRIMARY_OUTLET,
  Route,
  Router,
  Routes,
  UrlMatchResult,
  UrlSegment,
  UrlSegmentGroup,
  UrlTree,
} from '@angular/router';
import { findPathDetails, PATTERN_ALIAS } from './util';

type UrlSegmentWithRoute = UrlSegment & { route: Route };

@Injectable({ providedIn: 'root' })
export class MatcherService {
  readonly #router = inject(Router);

  matches(route: Route, tree: UrlTree): Params | null {
    const routeTree = this.#getExtendedTree(route);
    const matchingSegments = matchingSegmentGroups(
      tree.root,
      routeTree.root,
      routeTree.root.segments,
    );

    if (matchingSegments) {
      return matchResultToParams(matchingSegments);
    }

    return null;
  }

  #getExtendedTree(route: Route) {
    const { url, matcherRoutes } = findPathDetails(this.#router.config, route);

    return extendTreeWithMatcherRoutes(
      this.#router.parseUrl(url),
      matcherRoutes,
    );
  }
}

export function matchResultToParams(
  matches: boolean | UrlMatchResult[],
): Params {
  if (typeof matches === 'boolean') return {};
  return Object.fromEntries(
    matches
      .flatMap(({ posParams }) => Object.entries(posParams || {}))
      .map(([key, value]) => [key, value.path]),
  );
}

export function matchingSegmentGroups(
  container: UrlSegmentGroup,
  containee: UrlSegmentGroup,
  containeePaths: UrlSegment[],
): boolean | UrlMatchResult[] {
  if (container.segments.length > containeePaths.length) {
    const current = container.segments.slice(0, containeePaths.length);
    return (
      !containee.hasChildren() &&
      matchesSegmentGroup(current, container, containeePaths)
    );
  }
  if (container.segments.length !== containeePaths.length) {
    const current = containeePaths.slice(0, container.segments.length);
    const matchResults = matchesSegmentGroup(
      container.segments,
      container,
      current,
    );
    if (!matchResults || !container.children[PRIMARY_OUTLET]) return false;
    const next = containeePaths.slice(container.segments.length);
    const matchedChildren = matchingSegmentGroups(
      container.children[PRIMARY_OUTLET],
      containee,
      next,
    ); //@TODO needs to concat results
    if (matchedChildren) {
      if (matchResults === true) {
        return matchedChildren;
      }
      if (matchedChildren === true) {
        return matchedChildren;
      }
      return matchResults.concat(matchedChildren);
    }
  }
  const matchResults = matchesSegmentGroup(
    container.segments,
    container,
    containeePaths,
  );
  if (!matchResults) return false;
  if (!containee.hasChildren()) return matchResults;

  const results: UrlMatchResult[] =
    typeof matchResults === 'boolean' ? [] : matchResults;
  let result = false;
  for (const c in containee.children) {
    if (!container.children[c]) break;
    const matchedChildren = matchingSegmentGroups(
      container.children[c]!,
      containee.children[c]!,
      containee.children[c]!.segments,
    );
    if (typeof matchedChildren !== 'boolean') {
      results.push(...matchedChildren);
    } else if (matchedChildren) {
      result = matchedChildren;
    }
  }
  if (results.length > 0) {
    return results;
  }
  return result;
}

function matchesSegmentGroup(
  registered: UrlSegment[],
  registeredGroup: UrlSegmentGroup,
  current: (UrlSegment | UrlSegmentWithRoute)[],
): boolean | UrlMatchResult[] {
  if (registered.length !== current.length) return false;

  return registered.reduce<true | UrlMatchResult[] | false>(
    (accumulator, registeredItem, index) => {
      if (accumulator === false) return false; // Early termination

      const currentItem = current[index]!;

      if (registeredItem.path === currentItem.path) return accumulator;

      if (
        currentItem.path.startsWith(':') ||
        registeredItem.path.startsWith(':')
      ) {
        const urlMatch: UrlMatchResult = {
          consumed: [registeredItem],
          posParams: { [currentItem.path.replace(':', '')]: registeredItem },
        };
        if (typeof accumulator === 'boolean') {
          return [urlMatch];
        }
        accumulator.push(urlMatch);
        return accumulator;
      }

      if (currentItem.path !== PATTERN_ALIAS) return false;

      const urlMatch: UrlMatchResult | null = (<UrlSegmentWithRoute>(
        currentItem
      ))['route'].matcher!(
        [registeredItem],
        registeredGroup,
        (<UrlSegmentWithRoute>currentItem)['route'],
      );

      if (!urlMatch) return false;

      return accumulator === true ? [urlMatch] : [...accumulator, urlMatch];
    },
    true,
  );
}

export function extendTreeWithMatcherRoutes(
  tree: UrlTree,
  matcherRoutes: Routes,
) {
  if (!matcherRoutes.length) return tree;

  extendUrlSegmentGroup(tree.root, matcherRoutes);

  return tree;
}

function extendUrlSegmentGroup(
  group: UrlSegmentGroup,
  matcherRoutes: Routes,
  currentMatcher = 0,
) {
  for (const segment of group.segments) {
    if (segment.path === PATTERN_ALIAS) {
      (<UrlSegment & { route: Route | undefined }>segment)['route'] =
        matcherRoutes[currentMatcher];
      currentMatcher++;
    }
  }
  if (group.hasChildren()) {
    Object.values(group.children).forEach((child) =>
      extendUrlSegmentGroup(child, matcherRoutes, currentMatcher),
    );
  }
}
