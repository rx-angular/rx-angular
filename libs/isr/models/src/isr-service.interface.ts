export interface IsrState {
  revalidate: number | null;
  errors: Error[];
  extra: Record<string, unknown>;
}

export interface IsrServiceInterface {
  getState(): IsrState;
  patchState(partialState: Partial<IsrState>): void;
  getExtra(): Record<string, unknown>;
  activate(): void;
  addError(error: Error): void;
  addExtra(extra?: Record<string, unknown>): void;
}
