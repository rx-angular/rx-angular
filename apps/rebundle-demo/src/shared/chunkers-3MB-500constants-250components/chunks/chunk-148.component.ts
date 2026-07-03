import { Component } from '@angular/core';
import { CONSTANT_295 } from '../constants/constant-295';
import { CONSTANT_296 } from '../constants/constant-296';

@Component({
  standalone: true,
  selector: 'app-chunk-148',
  template: `
    <div class="chunk-component">
      <h2>Chunk 148 Component</h2>
      <p>This component displays 2 constants: CONSTANT_295, CONSTANT_296</p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_295</h3>
          <p>{{ CONSTANT_295 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_296</h3>
          <p>{{ CONSTANT_296 }}</p>
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
export class Chunk148Component {
  CONSTANT_295 = CONSTANT_295;
  CONSTANT_296 = CONSTANT_296;
}
