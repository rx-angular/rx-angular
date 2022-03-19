import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformServer } from '@angular/common';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class NgxIsrService {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject(DOCUMENT) private doc: Document,
    private router: Router
  ) {
    if (isPlatformServer(this.platformId)) {
      this.activate();
    }
  }

  activate(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof ChildActivationEnd),
        map((event) => {
          let snapshot = (event as ChildActivationEnd).snapshot;
          while (snapshot.firstChild !== null) {
            snapshot = snapshot.firstChild;
          }
          return snapshot.data;
        }),
        take(1)
      )
      .subscribe((data: any) => {
        if (data?.['revalidate'] !== undefined) {
          this.addISRDataToBody(data);
        }
      });
  }

  // append script with revalidate data for the current route
  private addISRDataToBody({ revalidate }: { revalidate: number }): void {
    const script = this.doc.createElement('script');
    script.id = 'isr-state';
    script.setAttribute('type', 'application/json');
    script.textContent = JSON.stringify({ revalidate });
    this.doc.body.appendChild(script);
  }
}
