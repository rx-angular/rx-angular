import { Component } from '@angular/core';
import { CONSTANT_421 } from '../constants/constant-421';
import { CONSTANT_422 } from '../constants/constant-422';
import { CONSTANT_423 } from '../constants/constant-423';
import { CONSTANT_424 } from '../constants/constant-424';
import { CONSTANT_425 } from '../constants/constant-425';

@Component({
  standalone: true,
  selector: 'app-chunk-085',
  template: `
    <div class="chunk-component">
      <h2>Chunk 085 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_421, CONSTANT_422,
        CONSTANT_423, CONSTANT_424, CONSTANT_425
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_421</h3>
          <p>{{ CONSTANT_421 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_422</h3>
          <p>{{ CONSTANT_422 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_423</h3>
          <p>{{ CONSTANT_423 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_424</h3>
          <p>{{ CONSTANT_424 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_425</h3>
          <p>{{ CONSTANT_425 }}</p>
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
export class Chunk085Component {
  CONSTANT_421 = CONSTANT_421;
  CONSTANT_422 = CONSTANT_422;
  CONSTANT_423 = CONSTANT_423;
  CONSTANT_424 = CONSTANT_424;
  CONSTANT_425 = CONSTANT_425;
}
