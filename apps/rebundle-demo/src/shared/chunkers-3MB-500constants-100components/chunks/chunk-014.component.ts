import { Component } from '@angular/core';
import { CONSTANT_066 } from '../constants/constant-066';
import { CONSTANT_067 } from '../constants/constant-067';
import { CONSTANT_068 } from '../constants/constant-068';
import { CONSTANT_069 } from '../constants/constant-069';
import { CONSTANT_070 } from '../constants/constant-070';

@Component({
  standalone: true,
  selector: 'app-chunk-014',
  template: `
    <div class="chunk-component">
      <h2>Chunk 014 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_066, CONSTANT_067,
        CONSTANT_068, CONSTANT_069, CONSTANT_070
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_066</h3>
          <p>{{ CONSTANT_066 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_067</h3>
          <p>{{ CONSTANT_067 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_068</h3>
          <p>{{ CONSTANT_068 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_069</h3>
          <p>{{ CONSTANT_069 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_070</h3>
          <p>{{ CONSTANT_070 }}</p>
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
export class Chunk014Component {
  CONSTANT_066 = CONSTANT_066;
  CONSTANT_067 = CONSTANT_067;
  CONSTANT_068 = CONSTANT_068;
  CONSTANT_069 = CONSTANT_069;
  CONSTANT_070 = CONSTANT_070;
}
