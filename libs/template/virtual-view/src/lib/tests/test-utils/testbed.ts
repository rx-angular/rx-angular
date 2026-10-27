import { PLATFORM_ID, Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PLATFORM } from '@rx-angular/cdk/ssr';
import {
  provideVirtualViewConfig,
  RxVirtualViewConfig,
} from '../../virtual-view.config';
import { VirtualViewCache } from '../../virtual-view-cache';
import { provideSyncRenderStrategies } from './render-strategy';

/**
 * Config accepted by {@link provideVirtualViewConfig}. Typed loosely against the
 * provider factory so both the object and factory-function forms are allowed.
 */
type VVConfig = Parameters<typeof provideVirtualViewConfig>[0];

/**
 * Options shared by the browser and server TestBed builders.
 */
export interface HarnessOptions {
  /** Standalone host component to import into the testing module. */
  host: Type<unknown>;
  /**
   * Configuration forwarded to {@link provideVirtualViewConfig}. When omitted a
   * default synchronous config (`placeholderStrategy: 'sync'`,
   * `contentStrategy: 'sync'`) is used.
   */
  config?: VVConfig;
  /** Additional providers appended to the testing module. */
  extraProviders?: Provider[];
}

/**
 * Default synchronous config used when a caller does not supply one. Keeps
 * placeholder/content rendering deterministic within a single test tick.
 */
const DEFAULT_SYNC_CONFIG: VVConfig = {
  placeholderStrategy: 'sync',
  contentStrategy: 'sync',
};

/**
 * Configures a TestBed on the (default jsdom) browser platform.
 *
 * Resets the testing module first, then installs the synchronous render
 * strategies and the Virtual View config. When a `config` is supplied it is
 * forwarded verbatim to {@link provideVirtualViewConfig} — the caller is
 * responsible for passing `placeholderStrategy: 'sync'`/`contentStrategy: 'sync'`
 * to keep rendering synchronous; there is no force-merge.
 */
export function configureBrowser(opts: HarnessOptions): void {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [opts.host],
    providers: [
      ...provideSyncRenderStrategies(),
      provideVirtualViewConfig(opts.config ?? DEFAULT_SYNC_CONFIG),
      ...(opts.extraProviders ?? []),
    ],
  });
}

/**
 * Configures a TestBed on the server platform.
 *
 * Identical to {@link configureBrowser} but additionally provides
 * `PLATFORM_ID: 'server'` and an explicit root override for the {@link PLATFORM}
 * token. Because `PLATFORM` is `providedIn: 'platform'`, overriding it at the
 * root guarantees the observer / resize-observer / directive all see the server
 * platform view regardless of injector scoping.
 */
export function configureServer(opts: HarnessOptions): void {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [opts.host],
    providers: [
      ...provideSyncRenderStrategies(),
      provideVirtualViewConfig(opts.config ?? DEFAULT_SYNC_CONFIG),
      { provide: PLATFORM_ID, useValue: 'server' },
      {
        provide: PLATFORM,
        useValue: { isServer: true, isBrowser: false, isServerRendered: false },
      },
      ...(opts.extraProviders ?? []),
    ],
  });
}

/**
 * Convenience builder for the {@link VirtualViewCache} service.
 *
 * Resets the testing module, configures a TestBed that provides the Virtual View
 * config with the given cache sizes plus the `VirtualViewCache` service, and
 * returns the injected instance.
 */
export function createCache(
  cache?: Partial<RxVirtualViewConfig['cache']>,
): VirtualViewCache {
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    providers: [provideVirtualViewConfig({ cache }), VirtualViewCache],
  });
  return TestBed.inject(VirtualViewCache);
}
