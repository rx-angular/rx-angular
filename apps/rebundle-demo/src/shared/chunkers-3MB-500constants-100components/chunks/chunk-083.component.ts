import { Component } from '@angular/core';
import { CONSTANT_411 } from '../constants/constant-411';
import { CONSTANT_412 } from '../constants/constant-412';
import { CONSTANT_413 } from '../constants/constant-413';
import { CONSTANT_414 } from '../constants/constant-414';
import { CONSTANT_415 } from '../constants/constant-415';

@Component({
  standalone: true,
  selector: 'app-chunk-083',
  template: `
    <div class="chunk-component">
      <h2>Chunk 083 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_411, CONSTANT_412,
        CONSTANT_413, CONSTANT_414, CONSTANT_415
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_411</h3>
          <p>{{ CONSTANT_411 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_412</h3>
          <p>{{ CONSTANT_412 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_413</h3>
          <p>{{ CONSTANT_413 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_414</h3>
          <p>{{ CONSTANT_414 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_415</h3>
          <p>{{ CONSTANT_415 }}</p>
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
export class Chunk083Component {
  CONSTANT_411 = CONSTANT_411;
  CONSTANT_412 = CONSTANT_412;
  CONSTANT_413 = CONSTANT_413;
  CONSTANT_414 = CONSTANT_414;
  CONSTANT_415 = CONSTANT_415;
}
