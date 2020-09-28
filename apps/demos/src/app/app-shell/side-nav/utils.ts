import { AppShellNavItem } from '../app-shell.models';

export function generateRoutes(navigationItems: AppShellNavItem[], link: string = ''): AppShellNavItem[] {
  return navigationItems.reduce(
    (items, item) => {
      item.link = link ? link + '/' + item.link : item.link;
      if (item.children && item.children.length) {
        // @TODO handle case if link is any[]
        item.children = generateRoutes(item.children, item.link as any);
      }
      return items.concat([item]);
    }, []);
}
