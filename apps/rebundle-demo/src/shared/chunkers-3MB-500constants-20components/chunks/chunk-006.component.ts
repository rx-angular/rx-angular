import { Component } from '@angular/core';
import { CONSTANT_126 } from '../constants/constant-126';
import { CONSTANT_127 } from '../constants/constant-127';
import { CONSTANT_128 } from '../constants/constant-128';
import { CONSTANT_129 } from '../constants/constant-129';
import { CONSTANT_130 } from '../constants/constant-130';
import { CONSTANT_131 } from '../constants/constant-131';
import { CONSTANT_132 } from '../constants/constant-132';
import { CONSTANT_133 } from '../constants/constant-133';
import { CONSTANT_134 } from '../constants/constant-134';
import { CONSTANT_135 } from '../constants/constant-135';
import { CONSTANT_136 } from '../constants/constant-136';
import { CONSTANT_137 } from '../constants/constant-137';
import { CONSTANT_138 } from '../constants/constant-138';
import { CONSTANT_139 } from '../constants/constant-139';
import { CONSTANT_140 } from '../constants/constant-140';
import { CONSTANT_141 } from '../constants/constant-141';
import { CONSTANT_142 } from '../constants/constant-142';
import { CONSTANT_143 } from '../constants/constant-143';
import { CONSTANT_144 } from '../constants/constant-144';
import { CONSTANT_145 } from '../constants/constant-145';
import { CONSTANT_146 } from '../constants/constant-146';
import { CONSTANT_147 } from '../constants/constant-147';
import { CONSTANT_148 } from '../constants/constant-148';
import { CONSTANT_149 } from '../constants/constant-149';
import { CONSTANT_150 } from '../constants/constant-150';

@Component({
  standalone: true,
  selector: 'app-chunk-006',
  template: `
    <div class="chunk-component">
      <h2>Chunk 006 Component</h2>
      <p>
        This component displays 25 constants: CONSTANT_126, CONSTANT_127,
        CONSTANT_128, CONSTANT_129, CONSTANT_130, CONSTANT_131, CONSTANT_132,
        CONSTANT_133, CONSTANT_134, CONSTANT_135, CONSTANT_136, CONSTANT_137,
        CONSTANT_138, CONSTANT_139, CONSTANT_140, CONSTANT_141, CONSTANT_142,
        CONSTANT_143, CONSTANT_144, CONSTANT_145, CONSTANT_146, CONSTANT_147,
        CONSTANT_148, CONSTANT_149, CONSTANT_150
      </p>
      <div class="constants-container">
        <div class="constant-display">
          <h3>CONSTANT_126</h3>
          <p>{{ CONSTANT_126 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_127</h3>
          <p>{{ CONSTANT_127 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_128</h3>
          <p>{{ CONSTANT_128 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_129</h3>
          <p>{{ CONSTANT_129 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_130</h3>
          <p>{{ CONSTANT_130 }}</p>
        </div>
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
        <div class="constant-display">
          <h3>CONSTANT_141</h3>
          <p>{{ CONSTANT_141 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_142</h3>
          <p>{{ CONSTANT_142 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_143</h3>
          <p>{{ CONSTANT_143 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_144</h3>
          <p>{{ CONSTANT_144 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_145</h3>
          <p>{{ CONSTANT_145 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_146</h3>
          <p>{{ CONSTANT_146 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_147</h3>
          <p>{{ CONSTANT_147 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_148</h3>
          <p>{{ CONSTANT_148 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_149</h3>
          <p>{{ CONSTANT_149 }}</p>
        </div>
        <div class="constant-display">
          <h3>CONSTANT_150</h3>
          <p>{{ CONSTANT_150 }}</p>
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
export class Chunk006Component {
  CONSTANT_126 = CONSTANT_126;
  CONSTANT_127 = CONSTANT_127;
  CONSTANT_128 = CONSTANT_128;
  CONSTANT_129 = CONSTANT_129;
  CONSTANT_130 = CONSTANT_130;
  CONSTANT_131 = CONSTANT_131;
  CONSTANT_132 = CONSTANT_132;
  CONSTANT_133 = CONSTANT_133;
  CONSTANT_134 = CONSTANT_134;
  CONSTANT_135 = CONSTANT_135;
  CONSTANT_136 = CONSTANT_136;
  CONSTANT_137 = CONSTANT_137;
  CONSTANT_138 = CONSTANT_138;
  CONSTANT_139 = CONSTANT_139;
  CONSTANT_140 = CONSTANT_140;
  CONSTANT_141 = CONSTANT_141;
  CONSTANT_142 = CONSTANT_142;
  CONSTANT_143 = CONSTANT_143;
  CONSTANT_144 = CONSTANT_144;
  CONSTANT_145 = CONSTANT_145;
  CONSTANT_146 = CONSTANT_146;
  CONSTANT_147 = CONSTANT_147;
  CONSTANT_148 = CONSTANT_148;
  CONSTANT_149 = CONSTANT_149;
  CONSTANT_150 = CONSTANT_150;
}
