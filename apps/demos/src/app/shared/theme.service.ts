import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'rxa-demos-theme';
const DARK_CLASS = 'dark-theme';

/**
 * Controls the demos app light/dark theme.
 *
 * The active mode is reflected as a `.dark-theme` class on the <html> element,
 * which flips the `--rxa-*` design tokens (see styles/_design-system.scss) and
 * the scoped Angular Material dark colors (see styles/theme.scss). The choice is
 * persisted to localStorage and, on first visit, seeded from the OS preference.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly mode$$ = new BehaviorSubject<ThemeMode>(
    this.resolveInitialMode(),
  );

  /** The current theme mode as an observable. */
  readonly mode$ = this.mode$$.asObservable();

  constructor(@Inject(DOCUMENT) private readonly document: Document) {
    this.applyMode(this.mode$$.value);
  }

  get mode(): ThemeMode {
    return this.mode$$.value;
  }

  toggle(): void {
    this.setMode(this.mode === 'dark' ? 'light' : 'dark');
  }

  setMode(mode: ThemeMode): void {
    if (mode === this.mode) {
      return;
    }
    this.mode$$.next(mode);
    this.applyMode(mode);
    this.persist(mode);
  }

  private applyMode(mode: ThemeMode): void {
    const root = this.document.documentElement;
    root.classList.toggle(DARK_CLASS, mode === 'dark');
  }

  private resolveInitialMode(): ThemeMode {
    const stored = this.readStored();
    if (stored) {
      return stored;
    }
    const prefersDark =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  private readStored(): ThemeMode | null {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'dark' || value === 'light' ? value : null;
    } catch {
      return null;
    }
  }

  private persist(mode: ThemeMode): void {
    try {
      localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      // Ignore storage failures (e.g. private mode); theme still applies.
    }
  }
}
