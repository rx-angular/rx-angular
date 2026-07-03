import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SpeculativeLink } from '@rx-angular/speculative-link';
import { RouterLink } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { SpeculativeLinkService } from './speculative-link.service';

@Component({
  standalone: true,
  imports: [SpeculativeLink, RouterLink, NgClass],
  template: `
    <div
      style="max-width: 800px; margin: 0 auto; padding: 20px; display: flex; flex-direction: column; gap: 30px;"
    >
      <section>
        <h2>Speculative Link Demo</h2>
        <p>
          Scroll down to see more links. When a link enters the viewport, the
          route chunk will be preloaded and the data will be pre-resolved.
        </p>
      </section>

      <section>
        <h3>Immediately Visible Link</h3>
        <a
          [routerLink]="['detail', 0]"
          [speculativeLink]="'/speculative-link/detail/0'"
          [ngClass]="{ flash: service.lastResolvedId() === '0' }"
          class="spec-link"
        >
          View Detail 0
          @if (service.resolvedCounts()['0']) {
            <span class="badge">
              Resolved: {{ service.resolvedCounts()['0'] }}
            </span>
          }
        </a>
      </section>

      <div class="scroll-spacer card">
        <p style="color: #666; font-style: italic; margin-bottom: 8px;">
          Scroll down to trigger more speculative links...
        </p>
        <h3 style="margin-bottom: 16px;">Logs</h3>
        <div class="log-container" style="flex: 1; max-height: none;">
          @for (event of service.events(); track event.timestamp) {
            <div class="log-entry">
              <strong>[{{ event.timestamp }}]</strong> Item
              {{ event.id }} pre-resolved
            </div>
          } @empty {
            <div
              style="flex: 1; display: flex; align-items: center; justify-content: center; color: #999; font-style: italic;"
            >
              No events yet...
            </div>
          }
        </div>
      </div>

      <section style="padding-bottom: 100px;">
        <h3>Viewport Triggered Links</h3>
        <div style="display: flex; flex-direction: column; gap: 20px;">
          @for (id of [1, 2, 3, 4, 5]; track id) {
            <a
              [routerLink]="['detail', id]"
              [speculativeLink]="'/speculative-link/detail/' + id"
              [ngClass]="{ flash: service.lastResolvedId() === id.toString() }"
              class="spec-link"
            >
              View Detail {{ id }}
              @if (service.resolvedCounts()[id.toString()]) {
                <span class="badge">
                  Resolved: {{ service.resolvedCounts()[id.toString()] }}
                </span>
              }
            </a>
          }
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .card {
        background: #fff;
        border: 1px solid #eee;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      }
      .log-container {
        max-height: 200px;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 10px;
        background: #fafafa;
        border-radius: 8px;
        border: 1px solid #f0f0f0;
      }
      .log-entry {
        font-size: 13px;
        padding: 8px 12px;
        background: #fff;
        border-radius: 6px;
        border-left: 4px solid #007bff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
      }
      .spec-link {
        padding: 24px;
        border: 1px solid #ddd;
        border-radius: 12px;
        text-decoration: none;
        color: #333;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
      }
      .spec-link:hover {
        border-color: #007bff;
        background: #f8fbff;
        transform: translateY(-3px);
        box-shadow: 0 8px 16px rgba(0, 123, 255, 0.1);
      }
      .badge {
        font-size: 12px;
        background: #e7f3ff;
        color: #007bff;
        padding: 6px 12px;
        border-radius: 20px;
        font-weight: 600;
      }
      .scroll-spacer {
        height: 80vh;
        background: #fdfdfd;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        border: 2px dashed #eee;
        border-radius: 16px;
        color: #333;
      }
      .flash {
        animation: flash-bg 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      @keyframes flash-bg {
        0% {
          background-color: #fff;
          transform: scale(1);
        }
        30% {
          background-color: #d1e7ff;
          transform: scale(1.03);
          border-color: #007bff;
        }
        100% {
          background-color: #fff;
          transform: scale(1);
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpeculativeLinkComponent {
  readonly service = inject(SpeculativeLinkService);
}
