import { Component } from '@angular/core';
import { CONSTANT_001 } from '../constants/constant-001';
import { CONSTANT_002 } from '../constants/constant-002';
import { CONSTANT_003 } from '../constants/constant-003';
import { CONSTANT_004 } from '../constants/constant-004';
import { CONSTANT_005 } from '../constants/constant-005';
import { CONSTANT_006 } from '../constants/constant-006';
import { CONSTANT_007 } from '../constants/constant-007';
import { CONSTANT_008 } from '../constants/constant-008';
import { CONSTANT_009 } from '../constants/constant-009';
import { CONSTANT_010 } from '../constants/constant-010';
import { CONSTANT_011 } from '../constants/constant-011';
import { CONSTANT_012 } from '../constants/constant-012';
import { CONSTANT_013 } from '../constants/constant-013';
import { CONSTANT_014 } from '../constants/constant-014';
import { CONSTANT_015 } from '../constants/constant-015';
import { CONSTANT_016 } from '../constants/constant-016';
import { CONSTANT_017 } from '../constants/constant-017';
import { CONSTANT_018 } from '../constants/constant-018';
import { CONSTANT_019 } from '../constants/constant-019';
import { CONSTANT_020 } from '../constants/constant-020';
import { CONSTANT_021 } from '../constants/constant-021';
import { CONSTANT_022 } from '../constants/constant-022';
import { CONSTANT_023 } from '../constants/constant-023';
import { CONSTANT_024 } from '../constants/constant-024';
import { CONSTANT_025 } from '../constants/constant-025';

@Component({
  standalone: true,
  selector: 'app-chunk-001',
  template: `
    <div class="chunk-component">
      <h2>Chunk 001 Component</h2>
      <p>
        This component displays 25 constants: CONSTANT_001, CONSTANT_002,
        CONSTANT_003, CONSTANT_004, CONSTANT_005, CONSTANT_006, CONSTANT_007,
        CONSTANT_008, CONSTANT_009, CONSTANT_010, CONSTANT_011, CONSTANT_012,
        CONSTANT_013, CONSTANT_014, CONSTANT_015, CONSTANT_016, CONSTANT_017,
        CONSTANT_018, CONSTANT_019, CONSTANT_020, CONSTANT_021, CONSTANT_022,
        CONSTANT_023, CONSTANT_024, CONSTANT_025
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_001</h3>
          <p>{{ CONSTANT_001 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_002</h3>
          <p>{{ CONSTANT_002 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_003</h3>
          <p>{{ CONSTANT_003 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_004</h3>
          <p>{{ CONSTANT_004 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_005</h3>
          <p>{{ CONSTANT_005 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_006</h3>
          <p>{{ CONSTANT_006 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_007</h3>
          <p>{{ CONSTANT_007 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_008</h3>
          <p>{{ CONSTANT_008 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_009</h3>
          <p>{{ CONSTANT_009 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_010</h3>
          <p>{{ CONSTANT_010 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_011</h3>
          <p>{{ CONSTANT_011 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_012</h3>
          <p>{{ CONSTANT_012 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_013</h3>
          <p>{{ CONSTANT_013 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_014</h3>
          <p>{{ CONSTANT_014 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_015</h3>
          <p>{{ CONSTANT_015 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_016</h3>
          <p>{{ CONSTANT_016 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_017</h3>
          <p>{{ CONSTANT_017 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_018</h3>
          <p>{{ CONSTANT_018 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_019</h3>
          <p>{{ CONSTANT_019 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_020</h3>
          <p>{{ CONSTANT_020 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_021</h3>
          <p>{{ CONSTANT_021 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_022</h3>
          <p>{{ CONSTANT_022 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_023</h3>
          <p>{{ CONSTANT_023 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_024</h3>
          <p>{{ CONSTANT_024 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_025</h3>
          <p>{{ CONSTANT_025 }}</p>
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
export class Chunk001Component {
  CONSTANT_001 = CONSTANT_001;
  CONSTANT_002 = CONSTANT_002;
  CONSTANT_003 = CONSTANT_003;
  CONSTANT_004 = CONSTANT_004;
  CONSTANT_005 = CONSTANT_005;
  CONSTANT_006 = CONSTANT_006;
  CONSTANT_007 = CONSTANT_007;
  CONSTANT_008 = CONSTANT_008;
  CONSTANT_009 = CONSTANT_009;
  CONSTANT_010 = CONSTANT_010;
  CONSTANT_011 = CONSTANT_011;
  CONSTANT_012 = CONSTANT_012;
  CONSTANT_013 = CONSTANT_013;
  CONSTANT_014 = CONSTANT_014;
  CONSTANT_015 = CONSTANT_015;
  CONSTANT_016 = CONSTANT_016;
  CONSTANT_017 = CONSTANT_017;
  CONSTANT_018 = CONSTANT_018;
  CONSTANT_019 = CONSTANT_019;
  CONSTANT_020 = CONSTANT_020;
  CONSTANT_021 = CONSTANT_021;
  CONSTANT_022 = CONSTANT_022;
  CONSTANT_023 = CONSTANT_023;
  CONSTANT_024 = CONSTANT_024;
  CONSTANT_025 = CONSTANT_025;
}
