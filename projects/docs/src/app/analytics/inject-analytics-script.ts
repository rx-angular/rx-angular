import { inject } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";

export interface AnalyticsConfig {
    gaTrackId: string;
}

export const ANALYTICS_TRACK_ID = 'G-WC8S6X2ZPT';

export const injectAnalyticsScript = (config: AnalyticsConfig) => {
    const script = document.createElement('script') as HTMLScriptElement;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaTrackId}`;
    script.async = true;
    script.type = 'text/partytown'; // to make it work with https://partytown.builder.io
    script.defer = true;
    script.setAttribute('fetchpriority', 'low');
    document.head.appendChild(script);

    const scriptInit = document.createElement('script') as HTMLScriptElement;
    scriptInit.type = 'text/partytown'; // to make it work with https://partytown.builder.io

    const scriptBody = document.createTextNode(`
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', '${config.gaTrackId}');
    `);

    scriptInit.appendChild(scriptBody);
    document.head.appendChild(scriptInit);

    // trigger a custom event to let partytown know to update
    window.dispatchEvent(new CustomEvent('ptupdate'));
}

export const trackRouterEvents = () => {
    const router = inject(Router);

    router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
            trackPageView(event.urlAfterRedirects);
        }
    });
}

export const trackPageView = (url: string) => {
    (window as any).dataLayer.push({ 'event': 'page_path', 'page_path': url });
}

export const trackInstallEvent = () => {
    (window as any).dataLayer.push({
        event: 'install',
        category: 'install',
        label: 'go_to_npm',
    });
}