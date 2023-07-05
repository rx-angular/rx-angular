import { isPlatformServer } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { INgxIsrService, NgxIsrState } from 'ngx-isr/models';

@Injectable({ providedIn: 'root' })
export class NgxIsrService implements INgxIsrService {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformServer(this.platformId)) {
      throw new Error(
        `NgxIsrService should not be instantiated on the server. 
          It is only used on the client as a injection token.`
      );
    }
  }

  getState(): NgxIsrState {
    return { revalidate: null, errors: [], extra: {} };
  }

  patchState(partialState: Partial<NgxIsrState>): void {}

  getExtra(): Record<string, any> {
    return {};
  }

  activate(): void {}

  addError(error: Error): void {}

  addExtra(extra?: Record<string, any> | undefined): void {}
}
