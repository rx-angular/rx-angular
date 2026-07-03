import { Component } from '@angular/core';
import { CONSTANT_301 } from '../constants/constant-301';
import { CONSTANT_302 } from '../constants/constant-302';
import { CONSTANT_303 } from '../constants/constant-303';
import { CONSTANT_304 } from '../constants/constant-304';
import { CONSTANT_305 } from '../constants/constant-305';

@Component({
  standalone: true,
  selector: 'app-chunk-061',
  template: `
    <div class="chunk-component">
      <h2>Chunk 061 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_301, CONSTANT_302,
        CONSTANT_303, CONSTANT_304, CONSTANT_305
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_301</h3>
          <p>{{ CONSTANT_301 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_302</h3>
          <p>{{ CONSTANT_302 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_303</h3>
          <p>{{ CONSTANT_303 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_304</h3>
          <p>{{ CONSTANT_304 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_305</h3>
          <p>{{ CONSTANT_305 }}</p>
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
export class Chunk061Component {
  CONSTANT_301 = CONSTANT_301;
  CONSTANT_302 = CONSTANT_302;
  CONSTANT_303 = CONSTANT_303;
  CONSTANT_304 = CONSTANT_304;
  CONSTANT_305 = CONSTANT_305;
}
