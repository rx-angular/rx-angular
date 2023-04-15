import { Injectable } from '@angular/core';
import { ChildActivationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

export interface NgxIsrState {
  revalidate: number | null;
  errors: Error[];
  extra: Record<string, any>;
}

const initialState: NgxIsrState = {
  revalidate: null,
  errors: [],
  extra: {}
}

@Injectable({ providedIn: 'root' })
export class NgxIsrService {
  protected state = new BehaviorSubject<NgxIsrState>(initialState);

  getState(): NgxIsrState {
    return this.state.getValue();
  }

  getExtra(): Record<string, any> {
    return this.state.getValue().extra;
  }

  constructor(private router: Router) {}

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
          this.setRevalidate(data['revalidate']);
        }
      });
  }

  addError(err: HttpErrorResponse): void {
    const currentErrors = this.getState().errors;
    this.state.next({ ...this.getState(), errors: [ ...currentErrors, err ] });
  }

  addExtra(extra: Record<string, any> = {}): void {
    this.state.next({ ...this.getState(), extra: { ...this.getExtra(), ...extra } });
  }
  
  setRevalidate = (revalidate: number | null): void => {
    this.state.next({ ...this.getState(), revalidate });
  }

}
