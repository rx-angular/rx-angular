import { Component } from '@angular/core';
import { CONSTANT_306 } from '../constants/constant-306';
import { CONSTANT_307 } from '../constants/constant-307';
import { CONSTANT_308 } from '../constants/constant-308';
import { CONSTANT_309 } from '../constants/constant-309';
import { CONSTANT_310 } from '../constants/constant-310';

@Component({
  standalone: true,
  selector: 'app-chunk-062',
  template: `
    <div class="chunk-component">
      <h2>Chunk 062 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_306, CONSTANT_307,
        CONSTANT_308, CONSTANT_309, CONSTANT_310
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_306</h3>
          <p>{{ CONSTANT_306 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_307</h3>
          <p>{{ CONSTANT_307 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_308</h3>
          <p>{{ CONSTANT_308 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_309</h3>
          <p>{{ CONSTANT_309 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_310</h3>
          <p>{{ CONSTANT_310 }}</p>
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
export class Chunk062Component {
  CONSTANT_306 = CONSTANT_306;
  CONSTANT_307 = CONSTANT_307;
  CONSTANT_308 = CONSTANT_308;
  CONSTANT_309 = CONSTANT_309;
  CONSTANT_310 = CONSTANT_310;
}
