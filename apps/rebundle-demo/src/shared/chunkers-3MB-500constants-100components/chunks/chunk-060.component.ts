import { Component } from '@angular/core';
import { CONSTANT_296 } from '../constants/constant-296';
import { CONSTANT_297 } from '../constants/constant-297';
import { CONSTANT_298 } from '../constants/constant-298';
import { CONSTANT_299 } from '../constants/constant-299';
import { CONSTANT_300 } from '../constants/constant-300';

@Component({
  standalone: true,
  selector: 'app-chunk-060',
  template: `
    <div class="chunk-component">
      <h2>Chunk 060 Component</h2>
      <p>
        This component displays 5 constants: CONSTANT_296, CONSTANT_297,
        CONSTANT_298, CONSTANT_299, CONSTANT_300
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_296</h3>
          <p>{{ CONSTANT_296 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_297</h3>
          <p>{{ CONSTANT_297 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_298</h3>
          <p>{{ CONSTANT_298 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_299</h3>
          <p>{{ CONSTANT_299 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_300</h3>
          <p>{{ CONSTANT_300 }}</p>
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
export class Chunk060Component {
  CONSTANT_296 = CONSTANT_296;
  CONSTANT_297 = CONSTANT_297;
  CONSTANT_298 = CONSTANT_298;
  CONSTANT_299 = CONSTANT_299;
  CONSTANT_300 = CONSTANT_300;
}
