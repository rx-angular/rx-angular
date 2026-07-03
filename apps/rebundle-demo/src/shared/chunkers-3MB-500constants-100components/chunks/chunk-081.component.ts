import { Component } from '@angular/core';
import { CONSTANT_401 } from '../constants/constant-401';
import { CONSTANT_402 } from '../constants/constant-402';
import { CONSTANT_403 } from '../constants/constant-403';
import { CONSTANT_404 } from '../constants/constant-404';
import { CONSTANT_405 } from '../constants/constant-405';

@Component({
  standalone: true,
  selector: 'app-chunk-081',
  template: `
    <div class="chunk-component">
      <h2>Chunk 081 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_401, CONSTANT_402,
        CONSTANT_403, CONSTANT_404, CONSTANT_405
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_401</h3>
          <p>{{ CONSTANT_401 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_402</h3>
          <p>{{ CONSTANT_402 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_403</h3>
          <p>{{ CONSTANT_403 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_404</h3>
          <p>{{ CONSTANT_404 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_405</h3>
          <p>{{ CONSTANT_405 }}</p>
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
export class Chunk081Component {
  CONSTANT_401 = CONSTANT_401;
  CONSTANT_402 = CONSTANT_402;
  CONSTANT_403 = CONSTANT_403;
  CONSTANT_404 = CONSTANT_404;
  CONSTANT_405 = CONSTANT_405;
}
