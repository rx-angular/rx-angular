import { Component } from '@angular/core';
import { CONSTANT_071 } from '../constants/constant-071';
import { CONSTANT_072 } from '../constants/constant-072';
import { CONSTANT_073 } from '../constants/constant-073';
import { CONSTANT_074 } from '../constants/constant-074';
import { CONSTANT_075 } from '../constants/constant-075';

@Component({
  standalone: true,
  selector: 'app-chunk-015',
  template: `
    <div class="chunk-component">
      <h2>Chunk 015 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_071, CONSTANT_072,
        CONSTANT_073, CONSTANT_074, CONSTANT_075
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_071</h3>
          <p>{{ CONSTANT_071 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_072</h3>
          <p>{{ CONSTANT_072 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_073</h3>
          <p>{{ CONSTANT_073 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_074</h3>
          <p>{{ CONSTANT_074 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_075</h3>
          <p>{{ CONSTANT_075 }}</p>
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
export class Chunk015Component {
  CONSTANT_071 = CONSTANT_071;
  CONSTANT_072 = CONSTANT_072;
  CONSTANT_073 = CONSTANT_073;
  CONSTANT_074 = CONSTANT_074;
  CONSTANT_075 = CONSTANT_075;
}
