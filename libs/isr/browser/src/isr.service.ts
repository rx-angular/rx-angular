/* eslint-disable @typescript-eslint/no-unused-vars */
import { isPlatformServer } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { IsrServiceInterface, IsrState } from '@rx-angular/isr/models';

@Injectable({ providedIn: 'root' })
export class IsrService implements IsrServiceInterface {
  private platformId = inject(PLATFORM_ID);

  constructor() {
    if (isPlatformServer(this.platformId)) {
      throw new Error(
        `IsrService should not be instantiated on the server.
          It is only used on the client as a injection token.`,
      );
    }
  }

  getState(): IsrState {
    return { revalidate: null, errors: [], extra: {} };
  }

  patchState(partialState: Partial<IsrState>): void {
    return;
  }

  getExtra(): Record<string, unknown> {
    return {};
  }

  activate(): void {
    return;
  }

  addError(error: Error): void {
    return;
  }

  addExtra(extra?: Record<string, unknown> | undefined): void {
    return;
  }
}
