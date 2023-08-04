import { InjectionToken } from '@angular/core';

export interface RxVirtualScrollDefaultOptions {
  /* determines how many templates can be cached and re-used on rendering, defaults to 20 */
  templateCacheSize?: number;
  /* determines how many views will be rendered in scroll direction, defaults to 15 */
  runwayItems?: number;
  /* determines how many views will be rendered in the opposite scroll direction, defaults to 5 */
  runwayItemsOpposite?: number;
  /* default item size to be used for scroll strategies. Used as tombstone size for the autosized strategy */
  itemSize?: number;
}
/** Injection token to be used to override the default options. */
export const RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS =
  new InjectionToken<RxVirtualScrollDefaultOptions>(
    'rx-virtual-scrolling-default-options',
    {
      providedIn: 'root',
      factory: RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS_FACTORY,
    }
  );

/** @internal */
export function RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS_FACTORY(): RxVirtualScrollDefaultOptions {
  return {
    runwayItems: DEFAULT_RUNWAY_ITEMS,
    runwayItemsOpposite: DEFAULT_RUNWAY_ITEMS_OPPOSITE,
    templateCacheSize: DEFAULT_TEMPLATE_CACHE_SIZE,
    itemSize: DEFAULT_ITEM_SIZE,
  };
}

/** @internal */
export const DEFAULT_TEMPLATE_CACHE_SIZE = 20;
/** @internal */
export const DEFAULT_ITEM_SIZE = 50;
/** @internal */
export const DEFAULT_RUNWAY_ITEMS = 10;
/** @internal */
export const DEFAULT_RUNWAY_ITEMS_OPPOSITE = 2;
