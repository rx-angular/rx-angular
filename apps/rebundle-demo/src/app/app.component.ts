import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  selector: 'app-root',
  template: `
    <h1>Ngx Build Demo</h1>

    <ul class="nav-list">
      <li class="nav-item">
        <a routerLink="/0" routerLinkActive="active">0 Extra Chunks</a>
      </li>
      <li class="nav-item">
        <a routerLink="/20" routerLinkActive="active">20 Extra Chunks</a>
      </li>
      <li class="nav-item">
        <a routerLink="/100" routerLinkActive="active">100 Extra Chunks</a>
      </li>
      <li class="nav-item">
        <a routerLink="/250" routerLinkActive="active">250 Extra Chunks</a>
      </li>
      <li class="nav-item">
        <a routerLink="/500" routerLinkActive="active">500 Extra Chunks</a>
      </li>
    </ul>

    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: [
    `
      h1 {
        margin: 0 0 2rem 0;
        color: #1a202c;
        font-size: 1.25rem;
        font-weight: 600;
        text-align: center;
        letter-spacing: -0.025em;
      }

      .nav-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        list-style: none;
        margin: 0;
        padding: 0;
        gap: 1rem;
        width: 100%;
      }

      .nav-item {
        margin: 0;
        display: flex;
      }

      .nav-item a {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        text-decoration: none;
        color: #4a5568;
        font-weight: 500;
        font-size: 0.95rem;
        border-radius: 8px;
        transition: all 0.2s ease;
        background: #ffffff;
        border: 1px solid #e2e8f0;
        min-height: 56px;
      }

      .nav-item a:hover {
        background: #f7fafc;
        color: #2d3748;
        border-color: #cbd5e0;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
      }

      .nav-item a.active {
        background: #3182ce;
        color: #ffffff;
        border-color: #3182ce;
        font-weight: 600;
      }

      .nav-item a.active:hover {
        background: #2c5aa0;
        border-color: #2c5aa0;
      }

      @media (max-width: 768px) {
        h1 {
          font-size: 1.875rem;
          margin-bottom: 1.5rem;
        }

        .nav-list {
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 0.75rem;
          max-width: 100%;
        }

        .nav-item a {
          font-size: 0.9rem;
          min-height: 48px;
        }
      }

      @media (max-width: 480px) {
        .nav-list {
          grid-template-columns: 1fr;
          gap: 0.5rem;
        }

        .nav-item a {
          font-size: 1rem;
          min-height: 52px;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = 'demo';
}
