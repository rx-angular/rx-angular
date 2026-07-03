import { Component } from '@angular/core';
import { CONSTANT_101 } from '../constants/constant-101';
import { CONSTANT_102 } from '../constants/constant-102';
import { CONSTANT_103 } from '../constants/constant-103';
import { CONSTANT_104 } from '../constants/constant-104';
import { CONSTANT_105 } from '../constants/constant-105';

@Component({
  standalone: true,
  selector: 'app-chunk-021',
  template: `
    <div class="chunk-component">
      <h2>Chunk 021 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_101, CONSTANT_102,
        CONSTANT_103, CONSTANT_104, CONSTANT_105
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_101</h3>
          <p>{{ CONSTANT_101 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_102</h3>
          <p>{{ CONSTANT_102 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_103</h3>
          <p>{{ CONSTANT_103 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_104</h3>
          <p>{{ CONSTANT_104 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_105</h3>
          <p>{{ CONSTANT_105 }}</p>
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
export class Chunk021Component {
  CONSTANT_101 = CONSTANT_101;
  CONSTANT_102 = CONSTANT_102;
  CONSTANT_103 = CONSTANT_103;
  CONSTANT_104 = CONSTANT_104;
  CONSTANT_105 = CONSTANT_105;
}
