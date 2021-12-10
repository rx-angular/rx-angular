import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[rxaAppShellSideNavItem]',
  host: {
    class:
      'app-shell-sidenav-item',
  },
})
export class AppShellSideNavItemDirective {
  @Input('rxaAppShellSideNavItemLevel') level = 0;

  @HostBinding('class.app-shell-sidenav-item-level-1') get level1() { return this.level === 1};
  @HostBinding('class.app-shell-sidenav-item-level-2') get level2() { return this.level === 2};
  @HostBinding('class.app-shell-sidenav-item-level-3') get level3() { return this.level === 3};

  constructor() {}
}
