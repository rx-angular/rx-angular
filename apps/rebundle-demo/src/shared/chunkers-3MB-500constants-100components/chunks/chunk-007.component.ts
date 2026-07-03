import { Component } from '@angular/core';
import { CONSTANT_031 } from '../constants/constant-031';
import { CONSTANT_032 } from '../constants/constant-032';
import { CONSTANT_033 } from '../constants/constant-033';
import { CONSTANT_034 } from '../constants/constant-034';
import { CONSTANT_035 } from '../constants/constant-035';

@Component({
  standalone: true,
  selector: 'app-chunk-007',
  template: `
    <div class="chunk-component">
      <h2>Chunk 007 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_031, CONSTANT_032,
        CONSTANT_033, CONSTANT_034, CONSTANT_035
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_031</h3>
          <p>{{ CONSTANT_031 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_032</h3>
          <p>{{ CONSTANT_032 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_033</h3>
          <p>{{ CONSTANT_033 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_034</h3>
          <p>{{ CONSTANT_034 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_035</h3>
          <p>{{ CONSTANT_035 }}</p>
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
export class Chunk007Component {
  CONSTANT_031 = CONSTANT_031;
  CONSTANT_032 = CONSTANT_032;
  CONSTANT_033 = CONSTANT_033;
  CONSTANT_034 = CONSTANT_034;
  CONSTANT_035 = CONSTANT_035;
}
