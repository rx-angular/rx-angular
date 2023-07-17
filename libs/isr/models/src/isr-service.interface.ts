export interface IsrState {
  revalidate: number | null;
  errors: Error[];
  extra: Record<string, any>;
}

export interface IsrServiceInterface {
  getState(): IsrState;
  patchState(partialState: Partial<IsrState>): void;
  getExtra(): Record<string, any>;
  activate(): void;
  addError(error: Error): void;
  addExtra(extra?: Record<string, any>): void;
}
