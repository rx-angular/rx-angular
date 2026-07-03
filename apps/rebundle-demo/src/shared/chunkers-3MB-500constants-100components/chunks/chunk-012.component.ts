import { Component } from '@angular/core';
import { CONSTANT_056 } from '../constants/constant-056';
import { CONSTANT_057 } from '../constants/constant-057';
import { CONSTANT_058 } from '../constants/constant-058';
import { CONSTANT_059 } from '../constants/constant-059';
import { CONSTANT_060 } from '../constants/constant-060';

@Component({
  standalone: true,
  selector: 'app-chunk-012',
  template: `
    <div class="chunk-component">
      <h2>Chunk 012 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_056, CONSTANT_057,
        CONSTANT_058, CONSTANT_059, CONSTANT_060
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_056</h3>
          <p>{{ CONSTANT_056 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_057</h3>
          <p>{{ CONSTANT_057 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_058</h3>
          <p>{{ CONSTANT_058 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_059</h3>
          <p>{{ CONSTANT_059 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_060</h3>
          <p>{{ CONSTANT_060 }}</p>
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
export class Chunk012Component {
  CONSTANT_056 = CONSTANT_056;
  CONSTANT_057 = CONSTANT_057;
  CONSTANT_058 = CONSTANT_058;
  CONSTANT_059 = CONSTANT_059;
  CONSTANT_060 = CONSTANT_060;
}
