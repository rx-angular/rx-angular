import { Component } from '@angular/core';
import { CONSTANT_261 } from '../constants/constant-261';
import { CONSTANT_262 } from '../constants/constant-262';
import { CONSTANT_263 } from '../constants/constant-263';
import { CONSTANT_264 } from '../constants/constant-264';
import { CONSTANT_265 } from '../constants/constant-265';

@Component({
  standalone: true,
  selector: 'app-chunk-053',
  template: `
    <div class="chunk-component">
      <h2>Chunk 053 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_261, CONSTANT_262,
        CONSTANT_263, CONSTANT_264, CONSTANT_265
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_261</h3>
          <p>{{ CONSTANT_261 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_262</h3>
          <p>{{ CONSTANT_262 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_263</h3>
          <p>{{ CONSTANT_263 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_264</h3>
          <p>{{ CONSTANT_264 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_265</h3>
          <p>{{ CONSTANT_265 }}</p>
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
export class Chunk053Component {
  CONSTANT_261 = CONSTANT_261;
  CONSTANT_262 = CONSTANT_262;
  CONSTANT_263 = CONSTANT_263;
  CONSTANT_264 = CONSTANT_264;
  CONSTANT_265 = CONSTANT_265;
}
