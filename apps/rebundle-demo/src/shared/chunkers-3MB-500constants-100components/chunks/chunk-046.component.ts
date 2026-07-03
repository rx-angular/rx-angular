import { Component } from '@angular/core';
import { CONSTANT_226 } from '../constants/constant-226';
import { CONSTANT_227 } from '../constants/constant-227';
import { CONSTANT_228 } from '../constants/constant-228';
import { CONSTANT_229 } from '../constants/constant-229';
import { CONSTANT_230 } from '../constants/constant-230';

@Component({
  standalone: true,
  selector: 'app-chunk-046',
  template: `
    <div class="chunk-component">
      <h2>Chunk 046 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_226, CONSTANT_227,
        CONSTANT_228, CONSTANT_229, CONSTANT_230
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_226</h3>
          <p>{{ CONSTANT_226 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_227</h3>
          <p>{{ CONSTANT_227 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_228</h3>
          <p>{{ CONSTANT_228 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_229</h3>
          <p>{{ CONSTANT_229 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_230</h3>
          <p>{{ CONSTANT_230 }}</p>
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
export class Chunk046Component {
  CONSTANT_226 = CONSTANT_226;
  CONSTANT_227 = CONSTANT_227;
  CONSTANT_228 = CONSTANT_228;
  CONSTANT_229 = CONSTANT_229;
  CONSTANT_230 = CONSTANT_230;
}
