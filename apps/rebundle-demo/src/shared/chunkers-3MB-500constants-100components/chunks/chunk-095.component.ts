import { Component } from '@angular/core';
import { CONSTANT_471 } from '../constants/constant-471';
import { CONSTANT_472 } from '../constants/constant-472';
import { CONSTANT_473 } from '../constants/constant-473';
import { CONSTANT_474 } from '../constants/constant-474';
import { CONSTANT_475 } from '../constants/constant-475';

@Component({
  standalone: true,
  selector: 'app-chunk-095',
  template: `
    <div class="chunk-component">
      <h2>Chunk 095 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_471, CONSTANT_472,
        CONSTANT_473, CONSTANT_474, CONSTANT_475
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_471</h3>
          <p>{{ CONSTANT_471 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_472</h3>
          <p>{{ CONSTANT_472 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_473</h3>
          <p>{{ CONSTANT_473 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_474</h3>
          <p>{{ CONSTANT_474 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_475</h3>
          <p>{{ CONSTANT_475 }}</p>
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
export class Chunk095Component {
  CONSTANT_471 = CONSTANT_471;
  CONSTANT_472 = CONSTANT_472;
  CONSTANT_473 = CONSTANT_473;
  CONSTANT_474 = CONSTANT_474;
  CONSTANT_475 = CONSTANT_475;
}
