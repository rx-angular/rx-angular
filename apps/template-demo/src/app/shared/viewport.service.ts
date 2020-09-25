import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { distinctUntilChanged, map } from 'rxjs/operators';

export enum Viewport {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop',
}

interface ViewportServiceState {
  viewport: Viewport;
  isMobile: boolean;
  isDesktop: boolean;
  isTablet: boolean;
  isHandset: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ViewportService implements OnDestroy {
  private readonly state = new RxState<ViewportServiceState>();

  readonly viewport$ = this.state.select('viewport');
  readonly isMobile$ = this.state.select('isMobile');
  readonly isTablet$ = this.state.select('isTablet');
  readonly isDesktop$ = this.state.select('isDesktop');
  readonly isHandset$ = this.state.select('isHandset');

  constructor(private breakpointObserver: BreakpointObserver) {
    const viewport$ = this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(
        map((result: BreakpointState) => {
          if (result.breakpoints[Breakpoints.XSmall]) {
            return Viewport.mobile;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            return Viewport.tablet;
          }
          return Viewport.desktop;
        }),
        distinctUntilChanged<Viewport>(),
      );
    this.state.connect(viewport$, (oldState, viewportChange) => ({
      viewport: viewportChange,
      isHandset:
        viewportChange === 'mobile' || viewportChange === 'tablet',
      isMobile: viewportChange === 'mobile',
      isTablet: viewportChange === 'tablet',
      isDesktop: viewportChange === 'desktop',
    }));
  }

  ngOnDestroy() {
    this.state.ngOnDestroy();
  }
}
