import { Component } from '@angular/core';
import { CONSTANT_281 } from '../constants/constant-281';
import { CONSTANT_282 } from '../constants/constant-282';
import { CONSTANT_283 } from '../constants/constant-283';
import { CONSTANT_284 } from '../constants/constant-284';
import { CONSTANT_285 } from '../constants/constant-285';

@Component({
  standalone: true,
  selector: 'app-chunk-057',
  template: `
    <div class="chunk-component">
      <h2>Chunk 057 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_281, CONSTANT_282,
        CONSTANT_283, CONSTANT_284, CONSTANT_285
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_281</h3>
          <p>{{ CONSTANT_281 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_282</h3>
          <p>{{ CONSTANT_282 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_283</h3>
          <p>{{ CONSTANT_283 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_284</h3>
          <p>{{ CONSTANT_284 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_285</h3>
          <p>{{ CONSTANT_285 }}</p>
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
export class Chunk057Component {
  CONSTANT_281 = CONSTANT_281;
  CONSTANT_282 = CONSTANT_282;
  CONSTANT_283 = CONSTANT_283;
  CONSTANT_284 = CONSTANT_284;
  CONSTANT_285 = CONSTANT_285;
}
