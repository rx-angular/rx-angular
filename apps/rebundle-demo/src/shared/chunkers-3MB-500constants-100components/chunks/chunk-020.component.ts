import { Component } from '@angular/core';
import { CONSTANT_096 } from '../constants/constant-096';
import { CONSTANT_097 } from '../constants/constant-097';
import { CONSTANT_098 } from '../constants/constant-098';
import { CONSTANT_099 } from '../constants/constant-099';
import { CONSTANT_100 } from '../constants/constant-100';

@Component({
  standalone: true,
  selector: 'app-chunk-020',
  template: `
    <div class="chunk-component">
      <h2>Chunk 020 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_096, CONSTANT_097,
        CONSTANT_098, CONSTANT_099, CONSTANT_100
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_096</h3>
          <p>{{ CONSTANT_096 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_097</h3>
          <p>{{ CONSTANT_097 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_098</h3>
          <p>{{ CONSTANT_098 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_099</h3>
          <p>{{ CONSTANT_099 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_100</h3>
          <p>{{ CONSTANT_100 }}</p>
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
export class Chunk020Component {
  CONSTANT_096 = CONSTANT_096;
  CONSTANT_097 = CONSTANT_097;
  CONSTANT_098 = CONSTANT_098;
  CONSTANT_099 = CONSTANT_099;
  CONSTANT_100 = CONSTANT_100;
}
