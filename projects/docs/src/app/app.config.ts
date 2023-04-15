import { ApplicationConfig } from "@angular/platform-browser";
import { TitleStrategy, provideRouter } from "@angular/router";
import { HIGHLIGHT_OPTIONS } from "ngx-highlightjs";
import { CustomTitleStrategy } from "./custom-title-strategy";
import { routes } from "./routes";
import { importProvidersFrom } from "@angular/core";
import { TransferHttpCacheModule } from '@nguniversal/common';
import { provideHttpClient } from "@angular/common/http";

export const appConfig: ApplicationConfig = {
    providers: [
        provideRouter(routes),
        importProvidersFrom(TransferHttpCacheModule),
        provideHttpClient(),

        { provide: TitleStrategy, useClass: CustomTitleStrategy },
        {
          provide: HIGHLIGHT_OPTIONS,
          useValue: {
            coreLibraryLoader: () => import('highlight.js/lib/core'),
            languages: {
              typescript: () => import('highlight.js/lib/languages/typescript'),
            },
          },
        },
    ]
}