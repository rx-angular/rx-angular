import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';

const DOCS_BASE = 'https://rx-angular.io/docs/';
const SOURCE_BASE = 'https://github.com/rx-angular/rx-angular/tree/main/';

/**
 * A small, reusable header used by every demo to cross-link the running
 * example with its documentation and source code.
 *
 * Usage:
 * ```html
 * <rxa-docs-link
 *   docs="template/rx-if-directive"
 *   source="apps/demos/src/app/features/template/rx-if"
 * />
 * ```
 *
 * - `docs` is appended to the deployed docs base (https://rx-angular.io/docs/).
 * - `source` is appended to the GitHub repo tree (kept in sync with the demo).
 */
@Component({
  selector: 'rxa-docs-link',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="rxa-docs-link">
      <a
        class="rxa-docs-link__item rxa-docs-link__item--docs"
        [href]="docsUrl()"
        target="_blank"
        rel="noopener noreferrer"
      >
        📖 Read the docs
      </a>
      @if (source()) {
        <a
          class="rxa-docs-link__item rxa-docs-link__item--source"
          [href]="sourceUrl()"
          target="_blank"
          rel="noopener noreferrer"
        >
          📄 View source
        </a>
      }
    </nav>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .rxa-docs-link {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin: 0 0 0.75rem;
      }

      .rxa-docs-link__item {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.75rem;
        border-radius: 999px;
        font-size: 0.8125rem;
        font-weight: 600;
        line-height: 1.4;
        text-decoration: none;
        transition:
          background-color 0.15s ease,
          color 0.15s ease;
      }

      .rxa-docs-link__item--docs {
        background-color: #e3373715;
        color: #c3002f;
      }

      .rxa-docs-link__item--docs:hover {
        background-color: #c3002f;
        color: #fff;
      }

      .rxa-docs-link__item--source {
        background-color: #24292f15;
        color: #24292f;
      }

      .rxa-docs-link__item--source:hover {
        background-color: #24292f;
        color: #fff;
      }
    `,
  ],
})
export class DocsLinkComponent {
  /** Docs page path relative to https://rx-angular.io/docs/ */
  readonly docs = input.required<string>();
  /** Optional source folder path relative to the GitHub repo root. */
  readonly source = input<string>();

  protected readonly docsUrl = computed(() => DOCS_BASE + this.docs());
  protected readonly sourceUrl = computed(
    () => SOURCE_BASE + (this.source() ?? ''),
  );
}
