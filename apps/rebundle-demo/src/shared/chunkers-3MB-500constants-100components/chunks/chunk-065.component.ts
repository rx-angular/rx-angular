import { Component } from '@angular/core';
import { CONSTANT_321 } from '../constants/constant-321';
import { CONSTANT_322 } from '../constants/constant-322';
import { CONSTANT_323 } from '../constants/constant-323';
import { CONSTANT_324 } from '../constants/constant-324';
import { CONSTANT_325 } from '../constants/constant-325';

@Component({
  standalone: true,
  selector: 'app-chunk-065',
  template: `
    <div class="chunk-component">
      <h2>Chunk 065 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_321, CONSTANT_322,
        CONSTANT_323, CONSTANT_324, CONSTANT_325
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_321</h3>
          <p>{{ CONSTANT_321 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_322</h3>
          <p>{{ CONSTANT_322 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_323</h3>
          <p>{{ CONSTANT_323 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_324</h3>
          <p>{{ CONSTANT_324 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_325</h3>
          <p>{{ CONSTANT_325 }}</p>
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
export class Chunk065Component {
  CONSTANT_321 = CONSTANT_321;
  CONSTANT_322 = CONSTANT_322;
  CONSTANT_323 = CONSTANT_323;
  CONSTANT_324 = CONSTANT_324;
  CONSTANT_325 = CONSTANT_325;
}
