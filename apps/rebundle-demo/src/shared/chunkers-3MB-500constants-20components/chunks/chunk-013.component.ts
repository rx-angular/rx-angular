import { Component } from '@angular/core';
import { CONSTANT_301 } from '../constants/constant-301';
import { CONSTANT_302 } from '../constants/constant-302';
import { CONSTANT_303 } from '../constants/constant-303';
import { CONSTANT_304 } from '../constants/constant-304';
import { CONSTANT_305 } from '../constants/constant-305';
import { CONSTANT_306 } from '../constants/constant-306';
import { CONSTANT_307 } from '../constants/constant-307';
import { CONSTANT_308 } from '../constants/constant-308';
import { CONSTANT_309 } from '../constants/constant-309';
import { CONSTANT_310 } from '../constants/constant-310';
import { CONSTANT_311 } from '../constants/constant-311';
import { CONSTANT_312 } from '../constants/constant-312';
import { CONSTANT_313 } from '../constants/constant-313';
import { CONSTANT_314 } from '../constants/constant-314';
import { CONSTANT_315 } from '../constants/constant-315';
import { CONSTANT_316 } from '../constants/constant-316';
import { CONSTANT_317 } from '../constants/constant-317';
import { CONSTANT_318 } from '../constants/constant-318';
import { CONSTANT_319 } from '../constants/constant-319';
import { CONSTANT_320 } from '../constants/constant-320';
import { CONSTANT_321 } from '../constants/constant-321';
import { CONSTANT_322 } from '../constants/constant-322';
import { CONSTANT_323 } from '../constants/constant-323';
import { CONSTANT_324 } from '../constants/constant-324';
import { CONSTANT_325 } from '../constants/constant-325';

@Component({
  standalone: true,
  selector: 'app-chunk-013',
  template: `
    <div class="chunk-component">
      <h2>Chunk 013 Component</h2>
      <p>
        This component displays 25 constants: CONSTANT_301, CONSTANT_302,
        CONSTANT_303, CONSTANT_304, CONSTANT_305, CONSTANT_306, CONSTANT_307,
        CONSTANT_308, CONSTANT_309, CONSTANT_310, CONSTANT_311, CONSTANT_312,
        CONSTANT_313, CONSTANT_314, CONSTANT_315, CONSTANT_316, CONSTANT_317,
        CONSTANT_318, CONSTANT_319, CONSTANT_320, CONSTANT_321, CONSTANT_322,
        CONSTANT_323, CONSTANT_324, CONSTANT_325
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_301</h3>
          <p>{{ CONSTANT_301 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_302</h3>
          <p>{{ CONSTANT_302 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_303</h3>
          <p>{{ CONSTANT_303 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_304</h3>
          <p>{{ CONSTANT_304 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_305</h3>
          <p>{{ CONSTANT_305 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_306</h3>
          <p>{{ CONSTANT_306 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_307</h3>
          <p>{{ CONSTANT_307 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_308</h3>
          <p>{{ CONSTANT_308 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_309</h3>
          <p>{{ CONSTANT_309 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_310</h3>
          <p>{{ CONSTANT_310 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_311</h3>
          <p>{{ CONSTANT_311 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_312</h3>
          <p>{{ CONSTANT_312 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_313</h3>
          <p>{{ CONSTANT_313 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_314</h3>
          <p>{{ CONSTANT_314 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_315</h3>
          <p>{{ CONSTANT_315 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_316</h3>
          <p>{{ CONSTANT_316 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_317</h3>
          <p>{{ CONSTANT_317 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_318</h3>
          <p>{{ CONSTANT_318 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_319</h3>
          <p>{{ CONSTANT_319 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_320</h3>
          <p>{{ CONSTANT_320 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_321</h3>
          <p>{{ CONSTANT_321 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_322</h3>
          <p>{{ CONSTANT_322 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_323</h3>
          <p>{{ CONSTANT_323 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_324</h3>
          <p>{{ CONSTANT_324 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_325</h3>
          <p>{{ CONSTANT_325 }}</p>
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
export class Chunk013Component {
  CONSTANT_301 = CONSTANT_301;
  CONSTANT_302 = CONSTANT_302;
  CONSTANT_303 = CONSTANT_303;
  CONSTANT_304 = CONSTANT_304;
  CONSTANT_305 = CONSTANT_305;
  CONSTANT_306 = CONSTANT_306;
  CONSTANT_307 = CONSTANT_307;
  CONSTANT_308 = CONSTANT_308;
  CONSTANT_309 = CONSTANT_309;
  CONSTANT_310 = CONSTANT_310;
  CONSTANT_311 = CONSTANT_311;
  CONSTANT_312 = CONSTANT_312;
  CONSTANT_313 = CONSTANT_313;
  CONSTANT_314 = CONSTANT_314;
  CONSTANT_315 = CONSTANT_315;
  CONSTANT_316 = CONSTANT_316;
  CONSTANT_317 = CONSTANT_317;
  CONSTANT_318 = CONSTANT_318;
  CONSTANT_319 = CONSTANT_319;
  CONSTANT_320 = CONSTANT_320;
  CONSTANT_321 = CONSTANT_321;
  CONSTANT_322 = CONSTANT_322;
  CONSTANT_323 = CONSTANT_323;
  CONSTANT_324 = CONSTANT_324;
  CONSTANT_325 = CONSTANT_325;
}
