import { Component } from '@angular/core';
import { CONSTANT_176 } from '../constants/constant-176';
import { CONSTANT_177 } from '../constants/constant-177';
import { CONSTANT_178 } from '../constants/constant-178';
import { CONSTANT_179 } from '../constants/constant-179';
import { CONSTANT_180 } from '../constants/constant-180';

@Component({
  standalone: true,
  selector: 'app-chunk-036',
  template: `
    <div class="chunk-component">
      <h2>Chunk 036 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_176, CONSTANT_177,
        CONSTANT_178, CONSTANT_179, CONSTANT_180
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_176</h3>
          <p>{{ CONSTANT_176 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_177</h3>
          <p>{{ CONSTANT_177 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_178</h3>
          <p>{{ CONSTANT_178 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_179</h3>
          <p>{{ CONSTANT_179 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_180</h3>
          <p>{{ CONSTANT_180 }}</p>
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
export class Chunk036Component {
  CONSTANT_176 = CONSTANT_176;
  CONSTANT_177 = CONSTANT_177;
  CONSTANT_178 = CONSTANT_178;
  CONSTANT_179 = CONSTANT_179;
  CONSTANT_180 = CONSTANT_180;
}
