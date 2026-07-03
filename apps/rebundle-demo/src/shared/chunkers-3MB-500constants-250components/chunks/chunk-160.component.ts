import { Component } from '@angular/core';
import { CONSTANT_319 } from '../constants/constant-319';
import { CONSTANT_320 } from '../constants/constant-320';

@Component({
  standalone: true,
  selector: 'app-chunk-160',
  template: `
    <div class="chunk-component">
      <h2>Chunk 160 Component</h2>
      <p>This component displays 2 constants: CONSTANT_319, CONSTANT_320</p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_319</h3>
          <p>{{ CONSTANT_319 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_320</h3>
          <p>{{ CONSTANT_320 }}</p>
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
export class Chunk160Component {
  CONSTANT_319 = CONSTANT_319;
  CONSTANT_320 = CONSTANT_320;
}
