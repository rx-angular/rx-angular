import { Component } from '@angular/core';
import { CONSTANT_376 } from '../constants/constant-376';
import { CONSTANT_377 } from '../constants/constant-377';
import { CONSTANT_378 } from '../constants/constant-378';
import { CONSTANT_379 } from '../constants/constant-379';
import { CONSTANT_380 } from '../constants/constant-380';

@Component({
  standalone: true,
  selector: 'app-chunk-076',
  template: `
    <div class="chunk-component">
      <h2>Chunk 076 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_376, CONSTANT_377,
        CONSTANT_378, CONSTANT_379, CONSTANT_380
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_376</h3>
          <p>{{ CONSTANT_376 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_377</h3>
          <p>{{ CONSTANT_377 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_378</h3>
          <p>{{ CONSTANT_378 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_379</h3>
          <p>{{ CONSTANT_379 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_380</h3>
          <p>{{ CONSTANT_380 }}</p>
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
export class Chunk076Component {
  CONSTANT_376 = CONSTANT_376;
  CONSTANT_377 = CONSTANT_377;
  CONSTANT_378 = CONSTANT_378;
  CONSTANT_379 = CONSTANT_379;
  CONSTANT_380 = CONSTANT_380;
}
