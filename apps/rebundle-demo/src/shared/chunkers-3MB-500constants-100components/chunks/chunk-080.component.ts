import { Component } from '@angular/core';
import { CONSTANT_396 } from '../constants/constant-396';
import { CONSTANT_397 } from '../constants/constant-397';
import { CONSTANT_398 } from '../constants/constant-398';
import { CONSTANT_399 } from '../constants/constant-399';
import { CONSTANT_400 } from '../constants/constant-400';

@Component({
  standalone: true,
  selector: 'app-chunk-080',
  template: `
    <div class="chunk-component">
      <h2>Chunk 080 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_396, CONSTANT_397,
        CONSTANT_398, CONSTANT_399, CONSTANT_400
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_396</h3>
          <p>{{ CONSTANT_396 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_397</h3>
          <p>{{ CONSTANT_397 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_398</h3>
          <p>{{ CONSTANT_398 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_399</h3>
          <p>{{ CONSTANT_399 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_400</h3>
          <p>{{ CONSTANT_400 }}</p>
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
export class Chunk080Component {
  CONSTANT_396 = CONSTANT_396;
  CONSTANT_397 = CONSTANT_397;
  CONSTANT_398 = CONSTANT_398;
  CONSTANT_399 = CONSTANT_399;
  CONSTANT_400 = CONSTANT_400;
}
