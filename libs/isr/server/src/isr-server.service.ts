import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ChildActivationEnd, Router } from '@angular/router';
import { IsrServiceInterface, IsrState } from '@rx-angular/isr/models';
import { filter, map, take } from 'rxjs/operators';

const initialState: IsrState = {
  revalidate: null,
  errors: [],
  extra: {},
};

@Injectable({ providedIn: 'root' })
export class IsrServerService implements IsrServiceInterface {
  private readonly router = inject(Router);
  private state: IsrState = initialState;

  getState(): IsrState {
    return this.state;
  }

  patchState(partialState: Partial<IsrState>): void {
    this.state = { ...this.state, ...partialState };
  }

  getExtra(): Record<string, unknown> {
    return this.state.extra;
  }

  /**
   * Activate the service and listen to router events
   * @returns void
   */
  activate(): void {
    this.router.events
      .pipe(
        filter((e) => 'snapshot' in e),
        map((event) => {
          let snapshot = (event as ChildActivationEnd).snapshot;
          // get the last child route
          while (snapshot.firstChild !== null) {
            snapshot = snapshot.firstChild;
          }
          // get the data from the last child route
          return snapshot.data;
        }),
        take(1),
      )
      .subscribe((data) => {
        // if revalidate is defined, set it
        if (typeof data?.['revalidate'] === 'number') {
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
  addExtra(extra: Record<string, unknown> = {}): void {
    this.patchState({ extra: { ...this.getExtra(), ...extra } });
  }
}
