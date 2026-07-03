import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface DemoSection {
  emoji: string;
  title: string;
  link: string;
  description: string;
  highlights: string[];
  docs?: string;
}

/**
 * Landing page for the RxAngular demos app. Surfaces every section and the
 * flagship demos so the playground is easy to explore and showcase.
 */
@Component({
  selector: 'rxa-home',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header class="hero">
      <h1>Welcome to RxAngular Demos 🚀</h1>
      <p class="lead">
        A living playground for <code>&#64;rx-angular</code>. Every demo is a
        standalone, zoneless, signal-first Angular 21 component and links
        straight to its documentation on
        <a
          href="https://rx-angular.io"
          target="_blank"
          rel="noopener noreferrer"
          >rx-angular.io</a
        >.
      </p>
    </header>

    <section class="grid">
      @for (section of sections; track section.link) {
        <article class="card">
          <a class="card__title" [routerLink]="[section.link]">
            <span class="card__emoji">{{ section.emoji }}</span>
            {{ section.title }}
          </a>
          <p class="card__desc">{{ section.description }}</p>
          <ul class="card__highlights">
            @for (highlight of section.highlights; track highlight) {
              <li>{{ highlight }}</li>
            }
          </ul>
          <div class="card__actions">
            <a class="btn btn--primary" [routerLink]="[section.link]"
              >Open demos</a
            >
            @if (section.docs) {
              <a
                class="btn btn--ghost"
                [href]="section.docs"
                target="_blank"
                rel="noopener noreferrer"
                >📖 Docs</a
              >
            }
          </div>
        </article>
      }
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 1.5rem;
        max-width: 1100px;
      }
      .hero h1 {
        margin: 0 0 0.5rem;
      }
      .lead {
        max-width: 70ch;
        color: #444;
        font-size: 1.05rem;
      }
      code {
        background: #f3f0ff;
        color: #5b2bd9;
        padding: 0.1rem 0.35rem;
        border-radius: 4px;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
        gap: 1rem;
        margin-top: 1.5rem;
      }
      .card {
        border: 1px solid #e1e4e8;
        border-radius: 10px;
        padding: 1.1rem;
        background: #fff;
        display: flex;
        flex-direction: column;
        transition:
          box-shadow 0.15s ease,
          transform 0.15s ease;
      }
      .card:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
        transform: translateY(-2px);
      }
      .card__title {
        font-size: 1.15rem;
        font-weight: 700;
        text-decoration: none;
        color: #1b1f23;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
      .card__title:hover {
        color: #c3002f;
      }
      .card__emoji {
        font-size: 1.4rem;
      }
      .card__desc {
        color: #57606a;
        font-size: 0.9rem;
        margin: 0.5rem 0;
      }
      .card__highlights {
        margin: 0 0 0.85rem;
        padding-left: 1.1rem;
        color: #444;
        font-size: 0.85rem;
      }
      .card__highlights li {
        margin-bottom: 0.15rem;
      }
      .card__actions {
        margin-top: auto;
        display: flex;
        gap: 0.5rem;
      }
      .btn {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.35rem 0.8rem;
        border-radius: 6px;
        font-size: 0.85rem;
        font-weight: 600;
        text-decoration: none;
      }
      .btn--primary {
        background: #c3002f;
        color: #fff;
      }
      .btn--primary:hover {
        background: #a30028;
      }
      .btn--ghost {
        border: 1px solid #d0d7de;
        color: #24292f;
      }
      .btn--ghost:hover {
        background: #f6f8fa;
      }
    `,
  ],
})
export class HomeComponent {
  protected readonly sections: DemoSection[] = [
    {
      emoji: '🧰',
      title: 'Template',
      link: 'template',
      description:
        'Reactive rendering primitives from @rx-angular/template — directives and pipes that render straight from Observables and signals.',
      highlights: [
        '*rxLet, *rxIf, *rxFor with reactive context',
        'push pipe, render callbacks, unpatch',
        'Virtual scrolling, virtual view & viewport priority',
      ],
      docs: 'https://rx-angular.io/docs/template',
    },
    {
      emoji: '🗃️',
      title: 'State',
      link: 'state',
      description:
        'Local and global reactive state with @rx-angular/state — signals, actions and effects without boilerplate.',
      highlights: [
        'Signal state',
        'rxActions — typed, transformable action streams',
        'rxEffects — auto-cleaned side effects',
      ],
      docs: 'https://rx-angular.io/docs/state',
    },
    {
      emoji: '🛠️',
      title: 'CDK',
      link: 'cdk',
      description:
        'Low-level building blocks from @rx-angular/cdk used under the hood by template and state.',
      highlights: [
        'Transformations — immutable array & object helpers',
        'Coercing — value-or-Observable normalization',
        'Render strategies & coalescing',
      ],
      docs: 'https://rx-angular.io/docs/cdk',
    },
    {
      emoji: '🏁',
      title: 'Concepts',
      link: 'concepts',
      description:
        'Fundamental Angular rendering and change-detection behaviors that are good to understand before going reactive.',
      highlights: [
        'Coalescing & scheduling',
        'Views vs embedded views',
        'Zone-patched APIs',
      ],
    },
    {
      emoji: '📋',
      title: 'Tutorials',
      link: 'tutorials',
      description:
        'Step-by-step lessons that build up the core RxAngular patterns from scratch.',
      highlights: [
        'Input & output bindings',
        'Global state & side effects',
        'The presenter pattern',
      ],
    },
    {
      emoji: '🧮',
      title: 'Integrations',
      link: 'integrations',
      description:
        '@rx-angular/state composed with real-world patterns: forms, pagination and drag & drop.',
      highlights: [
        'Dynamic counter (5 state patterns)',
        'Pokémon pagination',
        'Drag & drop',
      ],
    },
  ];
}
