import { Component } from '@angular/core';
import { CONSTANT_161 } from '../constants/constant-161';
import { CONSTANT_162 } from '../constants/constant-162';
import { CONSTANT_163 } from '../constants/constant-163';
import { CONSTANT_164 } from '../constants/constant-164';
import { CONSTANT_165 } from '../constants/constant-165';

@Component({
  standalone: true,
  selector: 'app-chunk-033',
  template: `
    <div class="chunk-component">
      <h2>Chunk 033 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_161, CONSTANT_162,
        CONSTANT_163, CONSTANT_164, CONSTANT_165
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_161</h3>
          <p>{{ CONSTANT_161 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_162</h3>
          <p>{{ CONSTANT_162 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_163</h3>
          <p>{{ CONSTANT_163 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_164</h3>
          <p>{{ CONSTANT_164 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_165</h3>
          <p>{{ CONSTANT_165 }}</p>
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
export class Chunk033Component {
  CONSTANT_161 = CONSTANT_161;
  CONSTANT_162 = CONSTANT_162;
  CONSTANT_163 = CONSTANT_163;
  CONSTANT_164 = CONSTANT_164;
  CONSTANT_165 = CONSTANT_165;
}
