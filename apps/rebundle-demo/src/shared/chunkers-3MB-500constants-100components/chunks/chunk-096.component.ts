import { Component } from '@angular/core';
import { CONSTANT_476 } from '../constants/constant-476';
import { CONSTANT_477 } from '../constants/constant-477';
import { CONSTANT_478 } from '../constants/constant-478';
import { CONSTANT_479 } from '../constants/constant-479';
import { CONSTANT_480 } from '../constants/constant-480';

@Component({
  standalone: true,
  selector: 'app-chunk-096',
  template: `
    <div class="chunk-component">
      <h2>Chunk 096 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_476, CONSTANT_477,
        CONSTANT_478, CONSTANT_479, CONSTANT_480
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_476</h3>
          <p>{{ CONSTANT_476 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_477</h3>
          <p>{{ CONSTANT_477 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_478</h3>
          <p>{{ CONSTANT_478 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_479</h3>
          <p>{{ CONSTANT_479 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_480</h3>
          <p>{{ CONSTANT_480 }}</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .chunk-component {
        padding: 20px;
        margin: 10px 0;
        border: 2px solid #007acc;
        border-radius: 8px;
        background: #f0f8ff;
        font-family: Arial, sans-serif;
      }

      .chunk-component h2 {
        color: #007acc;
        margin: 0 0 10px 0;
      }

      .constants-container {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 10px;
        margin-top: 15px;
      }

      .constant-display {
        background: white;
        padding: 10px;
        border-radius: 4px;
        border: 1px solid #ddd;
      }

      .constant-display h3 {
        margin: 0 0 5px 0;
        color: #333;
        font-size: 12px;
        font-weight: bold;
      }

      .constant-display p {
        margin: 0;
        word-break: break-all;
        font-family: monospace;
        font-size: 10px;
        color: #666;
      }
    `,
  ],
})
export class Chunk096Component {
  CONSTANT_476 = CONSTANT_476;
  CONSTANT_477 = CONSTANT_477;
  CONSTANT_478 = CONSTANT_478;
  CONSTANT_479 = CONSTANT_479;
  CONSTANT_480 = CONSTANT_480;
}
