import { Component } from '@angular/core';
import { CONSTANT_063 } from '../constants/constant-063';
import { CONSTANT_064 } from '../constants/constant-064';

@Component({
  standalone: true,
  selector: 'app-chunk-032',
  template: `
    <div class="chunk-component">
      <h2>Chunk 032 Component</h2>
      <p>This component displays 2 constants: CONSTANT_063, CONSTANT_064</p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_063</h3>
          <p>{{ CONSTANT_063 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_064</h3>
          <p>{{ CONSTANT_064 }}</p>
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
export class Chunk032Component {
  CONSTANT_063 = CONSTANT_063;
  CONSTANT_064 = CONSTANT_064;
}
