import { Component } from '@angular/core';
import { CONSTANT_381 } from '../constants/constant-381';
import { CONSTANT_382 } from '../constants/constant-382';
import { CONSTANT_383 } from '../constants/constant-383';
import { CONSTANT_384 } from '../constants/constant-384';
import { CONSTANT_385 } from '../constants/constant-385';

@Component({
  standalone: true,
  selector: 'app-chunk-077',
  template: `
    <div class="chunk-component">
      <h2>Chunk 077 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_381, CONSTANT_382,
        CONSTANT_383, CONSTANT_384, CONSTANT_385
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_381</h3>
          <p>{{ CONSTANT_381 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_382</h3>
          <p>{{ CONSTANT_382 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_383</h3>
          <p>{{ CONSTANT_383 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_384</h3>
          <p>{{ CONSTANT_384 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_385</h3>
          <p>{{ CONSTANT_385 }}</p>
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
export class Chunk077Component {
  CONSTANT_381 = CONSTANT_381;
  CONSTANT_382 = CONSTANT_382;
  CONSTANT_383 = CONSTANT_383;
  CONSTANT_384 = CONSTANT_384;
  CONSTANT_385 = CONSTANT_385;
}
