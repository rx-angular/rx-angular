import { renamingRule } from '../../utils/renaming-rule';

const renames: Record<string, string | [string, string]> = {
  ListRange: '@rx-angular/template/virtual-scrolling',
  RxVirtualForViewContext: '@rx-angular/template/virtual-scrolling',
  RxVirtualScrollElement: '@rx-angular/template/virtual-scrolling',
  RxVirtualScrollStrategy: '@rx-angular/template/virtual-scrolling',
  RxVirtualScrollViewport: '@rx-angular/template/virtual-scrolling',
  RxVirtualViewRepeater: '@rx-angular/template/virtual-scrolling',
  AutoSizeVirtualScrollStrategy: '@rx-angular/template/virtual-scrolling',
  DynamicSizeVirtualScrollStrategy: '@rx-angular/template/virtual-scrolling',
  FixedSizeVirtualScrollStrategy: '@rx-angular/template/virtual-scrolling',
  RxVirtualFor: '@rx-angular/template/virtual-scrolling',
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS: '@rx-angular/template/virtual-scrolling',
  RX_VIRTUAL_SCROLL_DEFAULT_OPTIONS_FACTORY:
    '@rx-angular/template/virtual-scrolling',
  RxVirtualScrollDefaultOptions: '@rx-angular/template/virtual-scrolling',
  RxVirtualScrollElementDirective: '@rx-angular/template/virtual-scrolling',
  RxVirtualScrollViewportComponent: '@rx-angular/template/virtual-scrolling',
  RxVirtualScrollWindowDirective: '@rx-angular/template/virtual-scrolling',
};

export default renamingRule(
  '@rx-angular/template/experimental/virtual-scrolling',
  renames,
);
