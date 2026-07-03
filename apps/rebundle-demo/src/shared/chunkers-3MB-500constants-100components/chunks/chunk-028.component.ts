import { Component } from '@angular/core';
import { CONSTANT_136 } from '../constants/constant-136';
import { CONSTANT_137 } from '../constants/constant-137';
import { CONSTANT_138 } from '../constants/constant-138';
import { CONSTANT_139 } from '../constants/constant-139';
import { CONSTANT_140 } from '../constants/constant-140';

@Component({
  standalone: true,
  selector: 'app-chunk-028',
  template: `
    <div class="chunk-component">
      <h2>Chunk 028 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_136, CONSTANT_137,
        CONSTANT_138, CONSTANT_139, CONSTANT_140
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_136</h3>
          <p>{{ CONSTANT_136 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_137</h3>
          <p>{{ CONSTANT_137 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_138</h3>
          <p>{{ CONSTANT_138 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_139</h3>
          <p>{{ CONSTANT_139 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_140</h3>
          <p>{{ CONSTANT_140 }}</p>
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
export class Chunk028Component {
  CONSTANT_136 = CONSTANT_136;
  CONSTANT_137 = CONSTANT_137;
  CONSTANT_138 = CONSTANT_138;
  CONSTANT_139 = CONSTANT_139;
  CONSTANT_140 = CONSTANT_140;
}
