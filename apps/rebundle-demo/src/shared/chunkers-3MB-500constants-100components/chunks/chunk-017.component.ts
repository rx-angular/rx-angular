import { Component } from '@angular/core';
import { CONSTANT_081 } from '../constants/constant-081';
import { CONSTANT_082 } from '../constants/constant-082';
import { CONSTANT_083 } from '../constants/constant-083';
import { CONSTANT_084 } from '../constants/constant-084';
import { CONSTANT_085 } from '../constants/constant-085';

@Component({
  standalone: true,
  selector: 'app-chunk-017',
  template: `
    <div class="chunk-component">
      <h2>Chunk 017 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_081, CONSTANT_082,
        CONSTANT_083, CONSTANT_084, CONSTANT_085
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_081</h3>
          <p>{{ CONSTANT_081 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_082</h3>
          <p>{{ CONSTANT_082 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_083</h3>
          <p>{{ CONSTANT_083 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_084</h3>
          <p>{{ CONSTANT_084 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_085</h3>
          <p>{{ CONSTANT_085 }}</p>
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
export class Chunk017Component {
  CONSTANT_081 = CONSTANT_081;
  CONSTANT_082 = CONSTANT_082;
  CONSTANT_083 = CONSTANT_083;
  CONSTANT_084 = CONSTANT_084;
  CONSTANT_085 = CONSTANT_085;
}
