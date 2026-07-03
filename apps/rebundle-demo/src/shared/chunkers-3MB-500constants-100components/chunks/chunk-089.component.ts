import { Component } from '@angular/core';
import { CONSTANT_441 } from '../constants/constant-441';
import { CONSTANT_442 } from '../constants/constant-442';
import { CONSTANT_443 } from '../constants/constant-443';
import { CONSTANT_444 } from '../constants/constant-444';
import { CONSTANT_445 } from '../constants/constant-445';

@Component({
  standalone: true,
  selector: 'app-chunk-089',
  template: `
    <div class="chunk-component">
      <h2>Chunk 089 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_441, CONSTANT_442,
        CONSTANT_443, CONSTANT_444, CONSTANT_445
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_441</h3>
          <p>{{ CONSTANT_441 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_442</h3>
          <p>{{ CONSTANT_442 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_443</h3>
          <p>{{ CONSTANT_443 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_444</h3>
          <p>{{ CONSTANT_444 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_445</h3>
          <p>{{ CONSTANT_445 }}</p>
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
export class Chunk089Component {
  CONSTANT_441 = CONSTANT_441;
  CONSTANT_442 = CONSTANT_442;
  CONSTANT_443 = CONSTANT_443;
  CONSTANT_444 = CONSTANT_444;
  CONSTANT_445 = CONSTANT_445;
}
