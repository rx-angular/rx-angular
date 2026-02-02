import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { DOCUMENT, inject, InjectionToken, PLATFORM_ID } from '@angular/core';

/**
 * An injection token that provides information about the current platform.
 *
 * It provides the following information:
 * - `isServer`: Whether the current platform is the server.
 * - `isBrowser`: Whether the current platform is the browser.
 * - `isServerRenderer`: Whether the current platform is the browser and the application was server-side rendered.
 */
export const PLATFORM = new InjectionToken<{
  isServer: boolean;
  isBrowser: boolean;
  isServerRendered: boolean;
}>('PLATFORM', {
  providedIn: 'platform',
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    const document = inject(DOCUMENT);

    const isServer = isPlatformServer(platformId);
    const isBrowser = isPlatformBrowser(platformId);
    const isServerRendered = isBrowser && !!document.getElementById('ng-state');

    return { isServer, isBrowser, isServerRendered };
  },
});
