import { Component } from '@angular/core';
import { CONSTANT_006 } from '../constants/constant-006';
import { CONSTANT_007 } from '../constants/constant-007';
import { CONSTANT_008 } from '../constants/constant-008';
import { CONSTANT_009 } from '../constants/constant-009';
import { CONSTANT_010 } from '../constants/constant-010';

@Component({
  standalone: true,
  selector: 'app-chunk-002',
  template: `
    <div class="chunk-component">
      <h2>Chunk 002 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_006, CONSTANT_007,
        CONSTANT_008, CONSTANT_009, CONSTANT_010
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_006</h3>
          <p>{{ CONSTANT_006 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_007</h3>
          <p>{{ CONSTANT_007 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_008</h3>
          <p>{{ CONSTANT_008 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_009</h3>
          <p>{{ CONSTANT_009 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_010</h3>
          <p>{{ CONSTANT_010 }}</p>
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
export class Chunk002Component {
  CONSTANT_006 = CONSTANT_006;
  CONSTANT_007 = CONSTANT_007;
  CONSTANT_008 = CONSTANT_008;
  CONSTANT_009 = CONSTANT_009;
  CONSTANT_010 = CONSTANT_010;
}
