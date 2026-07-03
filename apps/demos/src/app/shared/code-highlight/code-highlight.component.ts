import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { createHighlighter, type Highlighter } from 'shiki';

/**
 * Lazily-created, app-wide singleton highlighter. Shiki loads its WASM engine
 * and the requested TextMate grammars once, then every `<rxa-code>` reuses it.
 * `angular-ts` pulls in its embedded grammars (TypeScript, the Angular template
 * / control-flow blocks, CSS, …) automatically.
 */
let highlighterPromise: Promise<Highlighter> | null = null;
function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-dark'],
      langs: ['angular-ts', 'angular-html'],
    });
  }
  return highlighterPromise;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Renders a syntax-highlighted, read-only code block using Shiki.
 *
 * ```html
 * <rxa-code title="my.component.ts" [code]="exampleCode" />
 * ```
 * `lang` defaults to `angular-ts`; pass `angular-html` for template snippets.
 */
@Component({
  selector: 'rxa-code',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <figure class="rxa-code">
      @if (title()) {
        <figcaption class="rxa-code__bar">
          <span class="rxa-code__title">{{ title() }}</span>
          <button type="button" class="rxa-code__copy" (click)="copy()">
            {{ copied() ? '✓ Copied' : 'Copy' }}
          </button>
        </figcaption>
      }
      <div class="rxa-code__body" [innerHTML]="html()"></div>
    </figure>
  `,
  styles: [
    `
      .rxa-code {
        margin: 0 0 1rem;
        border: 1px solid var(--rxa-border);
        border-radius: var(--rxa-radius);
        overflow: hidden;
        background: #24292e;
        box-shadow: var(--rxa-shadow-sm);
      }
      .rxa-code__bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        padding: 0.4rem 0.5rem 0.4rem 0.85rem;
        background: #1b1f23;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .rxa-code__title {
        font-family: var(--rxa-mono);
        font-size: 0.75rem;
        font-weight: 600;
        color: #adbac7;
        letter-spacing: 0.02em;
      }
      .rxa-code__copy {
        font-family: var(--rxa-font);
        font-size: 0.72rem;
        font-weight: 600;
        color: #adbac7;
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: var(--rxa-radius-sm);
        padding: 0.2rem 0.6rem;
        cursor: pointer;
        transition:
          background-color 0.15s ease,
          color 0.15s ease;
      }
      .rxa-code__copy:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
      .rxa-code__body pre.shiki {
        margin: 0;
        padding: 1rem 1.1rem;
        overflow-x: auto;
        font-family: var(--rxa-mono);
        font-size: 0.82rem;
        line-height: 1.6;
        background: transparent !important;
      }
      .rxa-code__body pre.shiki code {
        font-family: inherit;
        background: none;
        padding: 0;
        color: inherit;
      }
    `,
  ],
})
export class CodeHighlightComponent {
  private readonly sanitizer = inject(DomSanitizer);

  /** The source code to render. */
  readonly code = input.required<string>();
  /** Shiki language id — `angular-ts` (default) or `angular-html`. */
  readonly lang = input<string>('angular-ts');
  /** Optional caption shown in the header bar (e.g. the file name). */
  readonly title = input<string>('');

  protected readonly html = signal<SafeHtml>('');
  protected readonly copied = signal(false);

  constructor() {
    effect(() => {
      const code = this.code();
      const lang = this.lang();

      // Immediate, un-highlighted fallback so there is no empty flash while the
      // highlighter (WASM + grammars) loads on first use.
      this.html.set(
        this.sanitizer.bypassSecurityTrustHtml(
          `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`,
        ),
      );

      getHighlighter().then((hl) => {
        // Guard against a newer input having superseded this run.
        if (this.code() !== code || this.lang() !== lang) {
          return;
        }
        this.html.set(
          this.sanitizer.bypassSecurityTrustHtml(
            hl.codeToHtml(code, { lang, theme: 'github-dark' }),
          ),
        );
      });
    });
  }

  copy(): void {
    navigator.clipboard?.writeText(this.code()).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1500);
    });
  }
}
