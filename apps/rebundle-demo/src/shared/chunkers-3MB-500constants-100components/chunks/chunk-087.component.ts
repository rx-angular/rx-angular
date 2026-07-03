import { Component } from '@angular/core';
import { CONSTANT_431 } from '../constants/constant-431';
import { CONSTANT_432 } from '../constants/constant-432';
import { CONSTANT_433 } from '../constants/constant-433';
import { CONSTANT_434 } from '../constants/constant-434';
import { CONSTANT_435 } from '../constants/constant-435';

@Component({
  standalone: true,
  selector: 'app-chunk-087',
  template: `
    <div class="chunk-component">
      <h2>Chunk 087 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_431, CONSTANT_432,
        CONSTANT_433, CONSTANT_434, CONSTANT_435
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_431</h3>
          <p>{{ CONSTANT_431 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_432</h3>
          <p>{{ CONSTANT_432 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_433</h3>
          <p>{{ CONSTANT_433 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_434</h3>
          <p>{{ CONSTANT_434 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_435</h3>
          <p>{{ CONSTANT_435 }}</p>
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
export class Chunk087Component {
  CONSTANT_431 = CONSTANT_431;
  CONSTANT_432 = CONSTANT_432;
  CONSTANT_433 = CONSTANT_433;
  CONSTANT_434 = CONSTANT_434;
  CONSTANT_435 = CONSTANT_435;
}
