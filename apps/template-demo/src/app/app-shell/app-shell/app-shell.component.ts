import { CdkScrollable } from '@angular/cdk/overlay';
import { AfterViewInit, ChangeDetectionStrategy, Component, ViewChild, } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, tap, withLatestFrom } from 'rxjs/operators';
import { ViewportService } from '../../shared/viewport.service';

interface AppShellState {
  isHandset: boolean;
  showBackButton: boolean;
  backButtonNavigation: any[];
}

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState],
})
export class AppShellComponent implements AfterViewInit {
  readonly viewState$ = this.state.select();
  readonly onBackButtonClick = new Subject<MouseEvent | TouchEvent>();
  @ViewChild(CdkScrollable) readonly bodyScrollElement!: CdkScrollable;

  constructor(
    private viewport: ViewportService,
    private state: RxState<AppShellState>,
    private router: Router,
  ) {
    this.connectViewport();
    this.connectBackButtonState();
    this.handleBackButtonClick();
  }

  ngAfterViewInit(): void {
    this.handleScrollPositionAfterNavigationEnd();
  }

  private handleBackButtonClick(): void {
    this.state.hold(
      this.onBackButtonClick.pipe(
        withLatestFrom(this.state.select('backButtonNavigation')),
      ),
      ([event, backButtonNavigation]) => {
        if (backButtonNavigation) {
          this.router.navigate(backButtonNavigation);
        } else {
          history.back();
        }
      },
    );
  }

  private handleScrollPositionAfterNavigationEnd(): void {
    // this effect makes sure the scrollable body gets reset to top: 0 after a route got changed
    this.state.hold(
      this.router.events.pipe(
        filter((e) => e instanceof NavigationEnd),
        tap(() => this.bodyScrollElement.scrollTo({ top: 0 })),
      ),
    );
  }

  private connectBackButtonState(): void {
    this.state.connect(
      this.router.events.pipe(
        filter((event) => event instanceof NavigationEnd),
      ),
      () => {
        let root = this.router.routerState.snapshot.root;
        while (root.children && root.children.length) {
          root = root.children[0];
        }
        return {
          showBackButton: root.data?.showBackButton || false,
          backButtonNavigation:
            root.data?.backButtonNavigation || null,
        };
      },
    );
  }

  private connectViewport(): void {
    this.state.connect('isHandset', this.viewport.isHandset$);
  }
}
