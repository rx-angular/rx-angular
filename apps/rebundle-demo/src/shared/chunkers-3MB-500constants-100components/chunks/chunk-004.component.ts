import { Component } from '@angular/core';
import { CONSTANT_016 } from '../constants/constant-016';
import { CONSTANT_017 } from '../constants/constant-017';
import { CONSTANT_018 } from '../constants/constant-018';
import { CONSTANT_019 } from '../constants/constant-019';
import { CONSTANT_020 } from '../constants/constant-020';

@Component({
  standalone: true,
  selector: 'app-chunk-004',
  template: `
    <div class="chunk-component">
      <h2>Chunk 004 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_016, CONSTANT_017,
        CONSTANT_018, CONSTANT_019, CONSTANT_020
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_016</h3>
          <p>{{ CONSTANT_016 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_017</h3>
          <p>{{ CONSTANT_017 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_018</h3>
          <p>{{ CONSTANT_018 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_019</h3>
          <p>{{ CONSTANT_019 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_020</h3>
          <p>{{ CONSTANT_020 }}</p>
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
export class Chunk004Component {
  CONSTANT_016 = CONSTANT_016;
  CONSTANT_017 = CONSTANT_017;
  CONSTANT_018 = CONSTANT_018;
  CONSTANT_019 = CONSTANT_019;
  CONSTANT_020 = CONSTANT_020;
}
