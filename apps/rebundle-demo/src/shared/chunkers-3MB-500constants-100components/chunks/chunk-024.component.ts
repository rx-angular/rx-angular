import { Component } from '@angular/core';
import { CONSTANT_116 } from '../constants/constant-116';
import { CONSTANT_117 } from '../constants/constant-117';
import { CONSTANT_118 } from '../constants/constant-118';
import { CONSTANT_119 } from '../constants/constant-119';
import { CONSTANT_120 } from '../constants/constant-120';

@Component({
  standalone: true,
  selector: 'app-chunk-024',
  template: `
    <div class="chunk-component">
      <h2>Chunk 024 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_116, CONSTANT_117,
        CONSTANT_118, CONSTANT_119, CONSTANT_120
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_116</h3>
          <p>{{ CONSTANT_116 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_117</h3>
          <p>{{ CONSTANT_117 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_118</h3>
          <p>{{ CONSTANT_118 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_119</h3>
          <p>{{ CONSTANT_119 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_120</h3>
          <p>{{ CONSTANT_120 }}</p>
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
export class Chunk024Component {
  CONSTANT_116 = CONSTANT_116;
  CONSTANT_117 = CONSTANT_117;
  CONSTANT_118 = CONSTANT_118;
  CONSTANT_119 = CONSTANT_119;
  CONSTANT_120 = CONSTANT_120;
}
