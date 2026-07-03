import { Component } from '@angular/core';
import { CONSTANT_146 } from '../constants/constant-146';
import { CONSTANT_147 } from '../constants/constant-147';
import { CONSTANT_148 } from '../constants/constant-148';
import { CONSTANT_149 } from '../constants/constant-149';
import { CONSTANT_150 } from '../constants/constant-150';

@Component({
  standalone: true,
  selector: 'app-chunk-030',
  template: `
    <div class="chunk-component">
      <h2>Chunk 030 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_146, CONSTANT_147,
        CONSTANT_148, CONSTANT_149, CONSTANT_150
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_146</h3>
          <p>{{ CONSTANT_146 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_147</h3>
          <p>{{ CONSTANT_147 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_148</h3>
          <p>{{ CONSTANT_148 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_149</h3>
          <p>{{ CONSTANT_149 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_150</h3>
          <p>{{ CONSTANT_150 }}</p>
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
export class Chunk030Component {
  CONSTANT_146 = CONSTANT_146;
  CONSTANT_147 = CONSTANT_147;
  CONSTANT_148 = CONSTANT_148;
  CONSTANT_149 = CONSTANT_149;
  CONSTANT_150 = CONSTANT_150;
}
