import { Component } from '@angular/core';
import { CONSTANT_256 } from '../constants/constant-256';
import { CONSTANT_257 } from '../constants/constant-257';
import { CONSTANT_258 } from '../constants/constant-258';
import { CONSTANT_259 } from '../constants/constant-259';
import { CONSTANT_260 } from '../constants/constant-260';

@Component({
  standalone: true,
  selector: 'app-chunk-052',
  template: `
    <div class="chunk-component">
      <h2>Chunk 052 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_256, CONSTANT_257,
        CONSTANT_258, CONSTANT_259, CONSTANT_260
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_256</h3>
          <p>{{ CONSTANT_256 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_257</h3>
          <p>{{ CONSTANT_257 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_258</h3>
          <p>{{ CONSTANT_258 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_259</h3>
          <p>{{ CONSTANT_259 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_260</h3>
          <p>{{ CONSTANT_260 }}</p>
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
export class Chunk052Component {
  CONSTANT_256 = CONSTANT_256;
  CONSTANT_257 = CONSTANT_257;
  CONSTANT_258 = CONSTANT_258;
  CONSTANT_259 = CONSTANT_259;
  CONSTANT_260 = CONSTANT_260;
}
