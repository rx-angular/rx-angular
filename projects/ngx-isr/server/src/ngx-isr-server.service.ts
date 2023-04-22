import { Injectable, inject } from '@angular/core';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { INgxIsrService, NgxIsrState } from 'ngx-isr/models';

const initialState: NgxIsrState = {
  revalidate: null,
  errors: [],
  extra: {},
};

@Injectable({ providedIn: 'root' })
export class NgxIsrServerService implements INgxIsrService {
  private readonly router = inject(Router);
  private state: NgxIsrState = initialState;

  getState(): NgxIsrState {
    return this.state;
  }

  patchState(partialState: Partial<NgxIsrState>): void {
    this.state = { ...this.state, ...partialState };
  }

  getExtra(): Record<string, any> {
    return this.state.extra;
  }

  /**
   * Activate the service and listen to router events
   * @returns void
   */
  activate(): void {
    this.router.events
      .pipe(
        filter((e) => e instanceof ChildActivationEnd),
        map((event) => {
          let snapshot = (event as ChildActivationEnd).snapshot;
          // get the last child route
          while (snapshot.firstChild !== null) {
            snapshot = snapshot.firstChild;
          }
          // get the data from the last child route
          return snapshot.data;
        }),
        take(1)
      )
      .subscribe((data: any) => {
        // if revalidate is defined, set it
        if (data?.['revalidate'] !== undefined) {
          this.patchState({ revalidate: data['revalidate'] });
        }
      });
  }

  /**
   * Add error to the state
   * @param error HttpErrorResponse
   * @returns void
   * @example
   * ```typescript
   * this.isrService.addError(err);
   * ```
   */
  addError(error: HttpErrorResponse | Error): void {
    this.patchState({ errors: [...this.getState().errors, error] });
  }

  /**
   * Add extra data to the state
   * @param extra Record<string, any>
   * @returns void
   * @example
   * ```typescript
   * this.isrService.addExtra({ foo: 'bar' });
   * ```
   */
  addExtra(extra: Record<string, any> = {}): void {
    this.patchState({ extra: { ...this.getExtra(), ...extra } });
  }
}
