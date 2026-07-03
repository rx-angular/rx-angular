import { Component } from '@angular/core';
import { CONSTANT_236 } from '../constants/constant-236';
import { CONSTANT_237 } from '../constants/constant-237';
import { CONSTANT_238 } from '../constants/constant-238';
import { CONSTANT_239 } from '../constants/constant-239';
import { CONSTANT_240 } from '../constants/constant-240';

@Component({
  standalone: true,
  selector: 'app-chunk-048',
  template: `
    <div class="chunk-component">
      <h2>Chunk 048 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_236, CONSTANT_237,
        CONSTANT_238, CONSTANT_239, CONSTANT_240
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_236</h3>
          <p>{{ CONSTANT_236 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_237</h3>
          <p>{{ CONSTANT_237 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_238</h3>
          <p>{{ CONSTANT_238 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_239</h3>
          <p>{{ CONSTANT_239 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_240</h3>
          <p>{{ CONSTANT_240 }}</p>
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
export class Chunk048Component {
  CONSTANT_236 = CONSTANT_236;
  CONSTANT_237 = CONSTANT_237;
  CONSTANT_238 = CONSTANT_238;
  CONSTANT_239 = CONSTANT_239;
  CONSTANT_240 = CONSTANT_240;
}
