import { isPlatformServer } from "@angular/common";
import { PLATFORM_ID, inject } from "@angular/core";

export interface AnalyticsConfig {
    gaTrackId: string;
}

export const injectAnalyticsScript = (config: AnalyticsConfig) => {
    const isServer = isPlatformServer(inject(PLATFORM_ID));
    // we don't want to inject the script on the server side
    if (isServer) return;

    const script = document.createElement('script') as HTMLScriptElement;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.gaTrackId}`;
    script.async = true;
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