import { PRIMARY_OUTLET, Route } from '@angular/router';

export function findPath(config: Route[], route: Route): string {
  const reverseMap = bfsReverseMap(config, route);

  return constructPath(route, reverseMap);
}

function bfsReverseMap(config: Route[], route: Route): Map<Route, Route> {
  const reverseMap = new Map<Route, Route>();
  const visited = new Set<Route>();
  const queue: Route[] = [];

  for (let i = 0; i < config.length; i++) {
    queue.push(config[i]);
  }

  let index = 0;
  while (index < queue.length) {
    const el = queue[index++];
    if (!el) continue;

    visited.add(el);
    if (el === route) return reverseMap;

    const children = el.children || [];
    const current = (el as any)._loadedRoutes || [];

    for (let i = 0; i < current.length; i++) {
      const child = current[i];
      if (child && child.children) {
        addAllChildren(child, children);
      }
    }

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      if (!visited.has(child)) {
        reverseMap.set(child, el);
        queue.push(child);
      }
    }
  }

  return reverseMap;
}

function addAllChildren(route: Route, children: Route[]): void {
  if (!route.children) return;
  for (let i = 0; i < route.children.length; i++) {
    const child = route.children[i];
    children.push(child);
    addAllChildren(child, children);
  }
}

function constructPath(route: Route, reverseMap: Map<Route, Route>): string {
  let path = '';
  let current: Route | undefined = route;

  do {
    if (isPrimaryRoute(current)) {
      path = `/${current.path}${path}`;
    } else {
      path = `/(${current.outlet}:${current.path}${path})`;
    }
  } while ((current = reverseMap.get(current!)));

  return path.replace(/\/+/g, '/');
}

function isPrimaryRoute(route: Route): boolean {
  return route.outlet === PRIMARY_OUTLET || !route.outlet;
}
