import { NestedTreeControl } from '@angular/cdk/tree';
import { ChangeDetectionStrategy, Component, Input, Output, } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { AppShellNavItem } from '../app-shell.models';

interface SideNavState {
  navItems: AppShellNavItem[];
}

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class AppShellSideNavComponent {
  readonly navItemDataSource = new MatTreeNestedDataSource<AppShellNavItem>();
  readonly treeControl = new NestedTreeControl<AppShellNavItem>(
    (node) => node.children,
  );

  @Input() set navItems(navItems: AppShellNavItem[]) {
    this.navItemDataSource._data.next(navItems || []);
  }

  @Output() readonly navItemSelected = new Subject<AppShellNavItem>();

  readonly viewState$ = this.state.select();

  constructor(private state: RxState<SideNavState>) {}

  hasChild = (_: number, node: AppShellNavItem) =>
    !!node.children && node.children.length > 0;

  trackNavItem(i: number, navItem: AppShellNavItem): string | any[] {
    return navItem.link;
  }
}
