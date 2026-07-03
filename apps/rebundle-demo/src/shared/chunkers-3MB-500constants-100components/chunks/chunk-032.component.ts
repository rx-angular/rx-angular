import { Component } from '@angular/core';
import { CONSTANT_156 } from '../constants/constant-156';
import { CONSTANT_157 } from '../constants/constant-157';
import { CONSTANT_158 } from '../constants/constant-158';
import { CONSTANT_159 } from '../constants/constant-159';
import { CONSTANT_160 } from '../constants/constant-160';

@Component({
  standalone: true,
  selector: 'app-chunk-032',
  template: `
    <div class="chunk-component">
      <h2>Chunk 032 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_156, CONSTANT_157,
        CONSTANT_158, CONSTANT_159, CONSTANT_160
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_156</h3>
          <p>{{ CONSTANT_156 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_157</h3>
          <p>{{ CONSTANT_157 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_158</h3>
          <p>{{ CONSTANT_158 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_159</h3>
          <p>{{ CONSTANT_159 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_160</h3>
          <p>{{ CONSTANT_160 }}</p>
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
  CONSTANT_156 = CONSTANT_156;
  CONSTANT_157 = CONSTANT_157;
  CONSTANT_158 = CONSTANT_158;
  CONSTANT_159 = CONSTANT_159;
  CONSTANT_160 = CONSTANT_160;
}
