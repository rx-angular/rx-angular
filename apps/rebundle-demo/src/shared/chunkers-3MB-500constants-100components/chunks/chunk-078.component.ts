import { Component } from '@angular/core';
import { CONSTANT_386 } from '../constants/constant-386';
import { CONSTANT_387 } from '../constants/constant-387';
import { CONSTANT_388 } from '../constants/constant-388';
import { CONSTANT_389 } from '../constants/constant-389';
import { CONSTANT_390 } from '../constants/constant-390';

@Component({
  standalone: true,
  selector: 'app-chunk-078',
  template: `
    <div class="chunk-component">
      <h2>Chunk 078 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_386, CONSTANT_387,
        CONSTANT_388, CONSTANT_389, CONSTANT_390
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_386</h3>
          <p>{{ CONSTANT_386 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_387</h3>
          <p>{{ CONSTANT_387 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_388</h3>
          <p>{{ CONSTANT_388 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_389</h3>
          <p>{{ CONSTANT_389 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_390</h3>
          <p>{{ CONSTANT_390 }}</p>
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
export class Chunk078Component {
  CONSTANT_386 = CONSTANT_386;
  CONSTANT_387 = CONSTANT_387;
  CONSTANT_388 = CONSTANT_388;
  CONSTANT_389 = CONSTANT_389;
  CONSTANT_390 = CONSTANT_390;
}
