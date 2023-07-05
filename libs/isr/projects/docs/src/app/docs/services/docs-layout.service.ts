import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DocsLayoutService {

  mainTitle$ = new BehaviorSubject('ngx-isr Docs');
  darkMode$ = new BehaviorSubject(true);
  mobileMenuOpen$ = new BehaviorSubject(false);

  pagination$ = new BehaviorSubject<DocsPagination>({ show: true });

  menu: DocsMenuItem[] = [
    {
      id: PAGE_IDS.intro,
      title: 'Introduction',
      routeLink: '/docs/intro',
    },
    {
      id: PAGE_IDS.gettingStarted,
      title: 'Getting started',
      routeLink: '/docs/getting-started',
    },
    {
      id: PAGE_IDS.howItWorks,
      title: 'How it works',
      routeLink: '/docs/how-it-works',
    },
    {
      id: PAGE_IDS.errorHandling,
      title: 'Error handling',
      routeLink: '/docs/error-handling',
    },
    {
      id: PAGE_IDS.onDemandRevalidation,
      title: 'On-demand revalidation',
      routeLink: '/docs/on-demand-revalidation',
    },
    {
      id: PAGE_IDS.cacheHandlers,
      title: 'Cache handlers',
      routeLink: '/docs/cache-handlers',
    },
    {
      id: PAGE_IDS.preRenderingAndIsr,
      title: 'Pre-rendering & ISR',
      routeLink: '/docs/pre-rendering-and-isr',
    },
    {
      id: PAGE_IDS.createYourOwnCacheHandler,
      title: 'Create your own cache handler',
      routeLink: '/docs/create-your-own-cache-handler',
    },
    {
      id: PAGE_IDS.modifyHtmlCacheHooks,
      title: 'Modify HTML cache hooks',
      routeLink: '/docs/modify-html-cache-hooks',
    },
    {
      id: PAGE_IDS.deploying,
      title: 'Deploying',
      routeLink: '/docs/deploying',
    },
    {
      id: PAGE_IDS.useNgxIsrServiceForMoreThanCaching,
      title: 'Use NgxIsrService for more than caching',
      routeLink: '/docs/use-ngx-isr-service-for-more-than-caching',
    },
    {
      id: PAGE_IDS.api,
      title: 'API',
      routeLink: '/docs/api',
    }
  ];

  setTitle(title: string) {
    this.mainTitle$.next(title);
  }

  setPageDataBasedOnPageId(pageId: string) {
    const page = this.menu.find((page) => page.id === pageId);
    if (!page) return;
    
    const pageIndex = this.menu.indexOf(page);
    const prevPage = this.menu[pageIndex - 1];
    const nextPage = this.menu[pageIndex + 1];

    this.pagination$.next({
      show: true,
      prev: prevPage ? { title: prevPage.title, routeLink: prevPage.routeLink } : undefined,
      next: nextPage ? { title: nextPage.title, routeLink: nextPage.routeLink } : undefined,
    });

    this.mainTitle$.next(page.title);
  }

  setPagination(pagination: DocsPagination) {
    this.pagination$.next(pagination);
  }

  toggleDarkMode() {
    this.darkMode$.next(!this.darkMode$.getValue());
  }

  toggleMobileMenu(show?: boolean) {
    if (show !== undefined) {
      this.mobileMenuOpen$.next(show);
      return;
    }
  
    this.mobileMenuOpen$.next(!this.mobileMenuOpen$.getValue());
  }
}

/**
 * Configure page data based on page id. Should be used only in component constructor!
 * @param pageId 
 */
export const configurePage = (pageId: string) => {
  const docLayout = inject(DocsLayoutService);
  docLayout.setPageDataBasedOnPageId(pageId);
}

export const PAGE_IDS = {
  intro: 'intro',
  gettingStarted: 'getting-started',
  howItWorks: 'how-it-works',
  errorHandling: 'error-handling',
  onDemandRevalidation: 'on-demand-revalidation',
  cacheHandlers: 'cache-handlers',
  preRenderingAndIsr: 'pre-rendering-and-isr',
  createYourOwnCacheHandler: 'create-your-own-cache-handler',
  modifyHtmlCacheHooks: 'modify-html-cache-hooks',
  deploying: 'deploying',
  useNgxIsrServiceForMoreThanCaching: 'use-ngx-isr-service-for-more-than-caching',
  api: 'api',
}


interface DocsMenuItem {
  id: string;
  title: string;
  routeLink: string;
  children?: DocsMenuItem[];
}

interface DocsPagination {
  show: boolean;
  prev?: DocsPaginationItem;
  next?: DocsPaginationItem;
}

interface DocsPaginationItem {
  title: string;
  routeLink: string;
}
