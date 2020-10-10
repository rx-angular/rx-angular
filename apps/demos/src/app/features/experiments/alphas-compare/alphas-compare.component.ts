import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'rxa-alphas-compare',
  templateUrl: './alphas-compare.component.html',
  changeDetection: environment.changeDetection,
})
export class AlphasCompareComponent {
  show0PushAutoTest = false;
  show0Push = false;
  show0LetAutoTest = false;
  show0Let = false;
  show1PushAutoTest = false;
  show1Push = false;
  show1LetAutoTest = false;
  show1Let = false;

  toggle0Push() {
    this.show0Push = !this.show0Push;
  }
  toggle0PushAutoTest() {
    this.show0PushAutoTest = !this.show0PushAutoTest;
  }
  toggle0Let() {
    this.show0Let = !this.show0Let;
  }
  toggle0LetAutoTest() {
    this.show0LetAutoTest = !this.show0LetAutoTest;
  }

  toggle1Push() {
    this.show1Push = !this.show1Push;
  }
  toggle1PushAutoTest() {
    this.show1PushAutoTest = !this.show1PushAutoTest;
  }

  toggle1Let() {
    this.show1Let = !this.show1Let;
  }
  toggle1LetAutoTest() {
    this.show1LetAutoTest = !this.show1LetAutoTest;
  }
}
