import { HttpErrorResponse } from '@angular/common/http';

export interface NgxIsrState {
  revalidate: number | null;
  errors: Error[];
  extra: Record<string, any>;
}

export interface INgxIsrService {
  getState(): NgxIsrState;
  patchState(partialState: Partial<NgxIsrState>): void;
  getExtra(): Record<string, any>;
  activate(): void;
  addError(error: Error): void;
  addExtra(extra?: Record<string, any>): void;
}
