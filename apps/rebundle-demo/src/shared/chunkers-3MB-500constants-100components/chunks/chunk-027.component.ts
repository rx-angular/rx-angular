import { Component } from '@angular/core';
import { CONSTANT_131 } from '../constants/constant-131';
import { CONSTANT_132 } from '../constants/constant-132';
import { CONSTANT_133 } from '../constants/constant-133';
import { CONSTANT_134 } from '../constants/constant-134';
import { CONSTANT_135 } from '../constants/constant-135';

@Component({
  standalone: true,
  selector: 'app-chunk-027',
  template: `
    <div class="chunk-component">
      <h2>Chunk 027 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_131, CONSTANT_132,
        CONSTANT_133, CONSTANT_134, CONSTANT_135
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_131</h3>
          <p>{{ CONSTANT_131 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_132</h3>
          <p>{{ CONSTANT_132 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_133</h3>
          <p>{{ CONSTANT_133 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_134</h3>
          <p>{{ CONSTANT_134 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_135</h3>
          <p>{{ CONSTANT_135 }}</p>
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
export class Chunk027Component {
  CONSTANT_131 = CONSTANT_131;
  CONSTANT_132 = CONSTANT_132;
  CONSTANT_133 = CONSTANT_133;
  CONSTANT_134 = CONSTANT_134;
  CONSTANT_135 = CONSTANT_135;
}
