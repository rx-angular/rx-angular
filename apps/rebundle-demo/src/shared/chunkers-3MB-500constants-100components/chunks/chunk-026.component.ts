import { Component } from '@angular/core';
import { CONSTANT_126 } from '../constants/constant-126';
import { CONSTANT_127 } from '../constants/constant-127';
import { CONSTANT_128 } from '../constants/constant-128';
import { CONSTANT_129 } from '../constants/constant-129';
import { CONSTANT_130 } from '../constants/constant-130';

@Component({
  standalone: true,
  selector: 'app-chunk-026',
  template: `
    <div class="chunk-component">
      <h2>Chunk 026 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_126, CONSTANT_127,
        CONSTANT_128, CONSTANT_129, CONSTANT_130
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_126</h3>
          <p>{{ CONSTANT_126 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_127</h3>
          <p>{{ CONSTANT_127 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_128</h3>
          <p>{{ CONSTANT_128 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_129</h3>
          <p>{{ CONSTANT_129 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_130</h3>
          <p>{{ CONSTANT_130 }}</p>
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
export class Chunk026Component {
  CONSTANT_126 = CONSTANT_126;
  CONSTANT_127 = CONSTANT_127;
  CONSTANT_128 = CONSTANT_128;
  CONSTANT_129 = CONSTANT_129;
  CONSTANT_130 = CONSTANT_130;
}
