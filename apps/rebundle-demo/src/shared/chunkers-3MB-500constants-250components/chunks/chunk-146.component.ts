import { Component } from '@angular/core';
import { CONSTANT_291 } from '../constants/constant-291';
import { CONSTANT_292 } from '../constants/constant-292';

@Component({
  standalone: true,
  selector: 'app-chunk-146',
  template: `
    <div class="chunk-component">
      <h2>Chunk 146 Component</h2>
      <p>This component displays 2 constants: CONSTANT_291, CONSTANT_292</p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_291</h3>
          <p>{{ CONSTANT_291 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_292</h3>
          <p>{{ CONSTANT_292 }}</p>
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
export class Chunk146Component {
  CONSTANT_291 = CONSTANT_291;
  CONSTANT_292 = CONSTANT_292;
}
