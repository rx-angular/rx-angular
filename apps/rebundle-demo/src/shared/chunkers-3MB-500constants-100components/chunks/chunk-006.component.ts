import { Component } from '@angular/core';
import { CONSTANT_026 } from '../constants/constant-026';
import { CONSTANT_027 } from '../constants/constant-027';
import { CONSTANT_028 } from '../constants/constant-028';
import { CONSTANT_029 } from '../constants/constant-029';
import { CONSTANT_030 } from '../constants/constant-030';

@Component({
  standalone: true,
  selector: 'app-chunk-006',
  template: `
    <div class="chunk-component">
      <h2>Chunk 006 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_026, CONSTANT_027,
        CONSTANT_028, CONSTANT_029, CONSTANT_030
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_026</h3>
          <p>{{ CONSTANT_026 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_027</h3>
          <p>{{ CONSTANT_027 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_028</h3>
          <p>{{ CONSTANT_028 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_029</h3>
          <p>{{ CONSTANT_029 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_030</h3>
          <p>{{ CONSTANT_030 }}</p>
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
export class Chunk006Component {
  CONSTANT_026 = CONSTANT_026;
  CONSTANT_027 = CONSTANT_027;
  CONSTANT_028 = CONSTANT_028;
  CONSTANT_029 = CONSTANT_029;
  CONSTANT_030 = CONSTANT_030;
}
