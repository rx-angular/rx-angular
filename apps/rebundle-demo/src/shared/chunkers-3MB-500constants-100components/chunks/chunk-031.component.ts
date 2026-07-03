import { Component } from '@angular/core';
import { CONSTANT_151 } from '../constants/constant-151';
import { CONSTANT_152 } from '../constants/constant-152';
import { CONSTANT_153 } from '../constants/constant-153';
import { CONSTANT_154 } from '../constants/constant-154';
import { CONSTANT_155 } from '../constants/constant-155';

@Component({
  standalone: true,
  selector: 'app-chunk-031',
  template: `
    <div class="chunk-component">
      <h2>Chunk 031 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_151, CONSTANT_152,
        CONSTANT_153, CONSTANT_154, CONSTANT_155
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_151</h3>
          <p>{{ CONSTANT_151 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_152</h3>
          <p>{{ CONSTANT_152 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_153</h3>
          <p>{{ CONSTANT_153 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_154</h3>
          <p>{{ CONSTANT_154 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_155</h3>
          <p>{{ CONSTANT_155 }}</p>
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
export class Chunk031Component {
  CONSTANT_151 = CONSTANT_151;
  CONSTANT_152 = CONSTANT_152;
  CONSTANT_153 = CONSTANT_153;
  CONSTANT_154 = CONSTANT_154;
  CONSTANT_155 = CONSTANT_155;
}
