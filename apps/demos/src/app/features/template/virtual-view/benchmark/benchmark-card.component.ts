import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  OnDestroy,
} from '@angular/core';
import { BenchmarkItem, benchmarkStats } from './benchmark.model';

@Component({
  selector: 'vv-benchmark-card',
  template: `
    <h4 class="card-title">{{ item().title }}</h4>
    <p class="card-description">{{ item().description }}</p>
    <ul class="card-tags">
      @for (tag of item().tags; track $index) {
        <li>{{ tag }}</li>
      }
    </ul>
    <table class="card-stats">
      <tbody>
        @for (stat of item().stats; track stat.label) {
          <tr>
            <th>{{ stat.label }}</th>
            <td>{{ stat.value }}</td>
            <td>{{ stat.value % 7 === 0 ? '▲' : '▼' }}</td>
          </tr>
        }
      </tbody>
    </table>
    <div class="card-actions">
      <button type="button">Open</button>
      <button type="button">Share</button>
    </div>
    <div class="card-nodes">
      @for (node of nodeList(); track $index) {
        <div></div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenchmarkCard implements OnDestroy {
  item = input.required<BenchmarkItem>();
  /** empty divs to mimic a DOM-heavy component */
  nodes = input(0);
  nodeList = computed(() => new Array<void>(this.nodes()));

  constructor() {
    benchmarkStats.created++;
    benchmarkStats.lastCreatedAt = performance.now();
  }

  ngOnDestroy() {
    benchmarkStats.destroyed++;
  }
}
