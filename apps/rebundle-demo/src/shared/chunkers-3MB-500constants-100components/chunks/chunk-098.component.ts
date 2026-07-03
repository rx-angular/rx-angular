import { Component } from '@angular/core';
import { CONSTANT_486 } from '../constants/constant-486';
import { CONSTANT_487 } from '../constants/constant-487';
import { CONSTANT_488 } from '../constants/constant-488';
import { CONSTANT_489 } from '../constants/constant-489';
import { CONSTANT_490 } from '../constants/constant-490';

@Component({
  standalone: true,
  selector: 'app-chunk-098',
  template: `
    <div class="chunk-component">
      <h2>Chunk 098 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_486, CONSTANT_487,
        CONSTANT_488, CONSTANT_489, CONSTANT_490
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_486</h3>
          <p>{{ CONSTANT_486 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_487</h3>
          <p>{{ CONSTANT_487 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_488</h3>
          <p>{{ CONSTANT_488 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_489</h3>
          <p>{{ CONSTANT_489 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_490</h3>
          <p>{{ CONSTANT_490 }}</p>
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
export class Chunk098Component {
  CONSTANT_486 = CONSTANT_486;
  CONSTANT_487 = CONSTANT_487;
  CONSTANT_488 = CONSTANT_488;
  CONSTANT_489 = CONSTANT_489;
  CONSTANT_490 = CONSTANT_490;
}
