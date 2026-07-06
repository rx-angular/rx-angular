import {
  NestedTreeControl,
  CdkTree,
  CdkTreeNodeDef,
  CdkNestedTreeNode,
  CdkTreeNodeToggle,
  CdkTreeNodeOutlet,
} from '@angular/cdk/tree';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import {
  NavigationEnd,
  Router,
  RouterLinkActive,
  RouterLink,
} from '@angular/router';
import { RxState } from '@rx-angular/state';
import { filter, startWith, Subject } from 'rxjs';
import { AppShellNavItem } from '../app-shell.models';
import { generateRoutes } from './utils';
import { MatButton } from '@angular/material/button';
import { AppShellSideNavItemDirective } from './side-nav-item.directive';
import { MatIcon } from '@angular/material/icon';

interface SideNavState {
  navItems: AppShellNavItem[];
}

@Component({
  selector: 'rxa-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
  imports: [
    CdkTree,
    CdkTreeNodeDef,
    CdkNestedTreeNode,
    MatButton,
    RouterLinkActive,
    AppShellSideNavItemDirective,
    RouterLink,
    MatIcon,
    CdkTreeNodeToggle,
    CdkTreeNodeOutlet,
  ],
})
export class AppShellSideNavComponent {
  private readonly router = inject(Router);

  readonly navItemDataSource = new MatTreeNestedDataSource<AppShellNavItem>();
  readonly treeControl = new NestedTreeControl<AppShellNavItem>(
    (node) => node.children,
  );

  @Input() set navItems(navItems: AppShellNavItem[]) {
    this.navItemDataSource.data = generateRoutes(navItems) || [];
    this.expandActiveNode();
  }

  @Output() readonly navItemSelected = new Subject<AppShellNavItem>();

  readonly viewState$ = this.state.select();

  constructor(private state: RxState<SideNavState>) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.expandActiveNode());
  }

  hasChild = (_: number, node: AppShellNavItem) =>
    !!node.children && node.children.length > 0;

  trackNavItem(i: number, navItem: AppShellNavItem): string | any[] {
    return navItem.link;
  }

  /**
   * Expands every ancestor node of the route that is currently active so the
   * active leaf is revealed when the nav (re)loads or navigation happens.
   */
  private expandActiveNode(): void {
    const nodes = this.navItemDataSource.data;
    // Node links have no leading slash (see generateRoutes), so strip the one
    // from router.url and drop any query/fragment before comparing.
    const url = this.router.url.split(/[?#]/)[0].replace(/^\/+/, '');
    if (!url || !nodes) {
      return;
    }
    nodes.forEach((node) => this.expandIfContainsActive(node, url));
  }

  private expandIfContainsActive(node: AppShellNavItem, url: string): boolean {
    const link = (node.link ?? '').replace(/^\/+/, '');
    const selfActive = !!link && (url === link || url.startsWith(link + '/'));

    let childActive = false;
    for (const child of node.children ?? []) {
      // Iterate all children so every active branch gets expanded.
      childActive = this.expandIfContainsActive(child, url) || childActive;
    }

    if (childActive) {
      this.treeControl.expand(node);
    }

    return selfActive || childActive;
  }
}
