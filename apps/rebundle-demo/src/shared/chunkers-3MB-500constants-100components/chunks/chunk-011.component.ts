import { Component } from '@angular/core';
import { CONSTANT_051 } from '../constants/constant-051';
import { CONSTANT_052 } from '../constants/constant-052';
import { CONSTANT_053 } from '../constants/constant-053';
import { CONSTANT_054 } from '../constants/constant-054';
import { CONSTANT_055 } from '../constants/constant-055';

@Component({
  standalone: true,
  selector: 'app-chunk-011',
  template: `
    <div class="chunk-component">
      <h2>Chunk 011 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_051, CONSTANT_052,
        CONSTANT_053, CONSTANT_054, CONSTANT_055
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_051</h3>
          <p>{{ CONSTANT_051 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_052</h3>
          <p>{{ CONSTANT_052 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_053</h3>
          <p>{{ CONSTANT_053 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_054</h3>
          <p>{{ CONSTANT_054 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_055</h3>
          <p>{{ CONSTANT_055 }}</p>
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
export class Chunk011Component {
  CONSTANT_051 = CONSTANT_051;
  CONSTANT_052 = CONSTANT_052;
  CONSTANT_053 = CONSTANT_053;
  CONSTANT_054 = CONSTANT_054;
  CONSTANT_055 = CONSTANT_055;
}
