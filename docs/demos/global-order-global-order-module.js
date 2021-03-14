(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["global-order-global-order-module"],{

/***/ "+mLV":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/native-v/v1-a.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V1AComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V1AComponent", function() { return V1AComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _v1_b_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v1-b.component */ "EMHr");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");






class V1AComponent {
    constructor(data) {
        this.data = data;
    }
}
V1AComponent.ɵfac = function V1AComponent_Factory(t) { return new (t || V1AComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V1AComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V1AComponent, selectors: [["rxa-v1-a"]], hostAttrs: [1, "w-100"], decls: 13, vars: 4, consts: [["visualizerHeader", ""], [1, "row", "w-100"], [1, "col"], [3, "value", "valueChange"]], template: function V1AComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "A");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "rxa-v1-b", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("valueChange", function V1AComponent_Template_rxa_v1_b_valueChange_11_listener($event) { return ctx.data.increment($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("count: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 2, ctx.data.count$), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _v1_b_component__WEBPACK_IMPORTED_MODULE_3__["V1BComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "/Cys":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-let-v/v3-b.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V3BComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V3BComponent", function() { return V3BComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.directive */ "OyBQ");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks/dirty-checks.component */ "qnLR");







function V3BComponent_span_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-dirty-check");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const v_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" count: ", v_r1, " ");
} }
class V3BComponent {
    constructor() {
        this.valueChange = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
}
V3BComponent.ɵfac = function V3BComponent_Factory(t) { return new (t || V3BComponent)(); };
V3BComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V3BComponent, selectors: [["rxa-v3-b"]], hostAttrs: [1, "w-100"], inputs: { value: "value" }, outputs: { valueChange: "valueChange" }, decls: 13, vars: 1, consts: [["visualizerHeader", ""], [1, "row", "w-100"], [1, "col"], ["mat-raised-button", "", 3, "unpatch", "click"], [4, "rxLet"]], template: function V3BComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "B");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function V3BComponent_Template_button_click_8_listener() { return ctx.valueChange.next(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "increment");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, V3BComponent_span_10_Template, 3, 1, "span", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.value);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsDirective"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_5__["RxLet"], _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_6__["DirtyChecksComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "2C5U":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-let-v/v3-c.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V3CComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V3CComponent", function() { return V3CComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _v3_e_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v3-e.component */ "nlO6");
/* harmony import */ var _v3_f_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./v3-f.component */ "MvRo");
/* harmony import */ var _shared_value_display_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/value-display.component */ "bgQy");








function V3CComponent_rxa_value_display_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-value-display", 5);
} if (rf & 2) {
    const count_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", count_r1);
} }
class V3CComponent {
    constructor(data) {
        this.data = data;
    }
}
V3CComponent.ɵfac = function V3CComponent_Factory(t) { return new (t || V3CComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V3CComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V3CComponent, selectors: [["rxa-v3-c"]], hostAttrs: [1, "w-100"], decls: 14, vars: 1, consts: [["visualizerHeader", ""], [1, "w-100"], [1, "row"], ["class", "col", 3, "value", 4, "rxLet"], [1, "col"], [1, "col", 3, "value"]], template: function V3CComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "C");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, V3CComponent_rxa_value_display_8_Template, 1, 1, "rxa-value-display", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "rxa-v3-e");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "rxa-v3-f");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__["RxLet"], _v3_e_component__WEBPACK_IMPORTED_MODULE_4__["V3EComponent"], _v3_f_component__WEBPACK_IMPORTED_MODULE_5__["V3FComponent"], _shared_value_display_component__WEBPACK_IMPORTED_MODULE_6__["ValueDisplayComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "2j8j":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-let-v/v3-d.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V3DComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V3DComponent", function() { return V3DComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


class V3DComponent {
    constructor() {
    }
}
V3DComponent.ɵfac = function V3DComponent_Factory(t) { return new (t || V3DComponent)(); };
V3DComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: V3DComponent, selectors: [["rxa-v3-d"]], hostAttrs: [1, "w-100"], decls: 6, vars: 0, consts: [["visualizerHeader", ""]], template: function V3DComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "D");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "v3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "4GsO":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-let-v/v3-a.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V3AComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V3AComponent", function() { return V3AComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _v3_b_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v3-b.component */ "/Cys");
/* harmony import */ var _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks/dirty-checks.component */ "qnLR");







function V3AComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-dirty-check");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const v_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" count: ", v_r1, " ");
} }
class V3AComponent {
    constructor(data) {
        this.data = data;
    }
}
V3AComponent.ɵfac = function V3AComponent_Factory(t) { return new (t || V3AComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V3AComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V3AComponent, selectors: [["rxa-v3-a"]], hostAttrs: [1, "w-100"], decls: 11, vars: 2, consts: [["visualizerHeader", ""], [4, "rxLet"], [1, "row", "w-100"], [1, "col"], [3, "value", "valueChange"]], template: function V3AComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "A");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, V3AComponent_span_6_Template, 3, 1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "rxa-v3-b", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("valueChange", function V3AComponent_Template_rxa_v3_b_valueChange_9_listener($event) { return ctx.data.increment($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.data.count$);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__["RxLet"], _v3_b_component__WEBPACK_IMPORTED_MODULE_4__["V3BComponent"], _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_5__["DirtyChecksComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "7E8L":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-form-v/v4-b.component.ts ***!
  \***************************************************************************************/
/*! exports provided: V4BComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V4BComponent", function() { return V4BComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.directive */ "OyBQ");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "ofXK");








function V4BComponent_span_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("- ", ctx_r0.form.get("value").value, "");
} }
class V4BComponent {
    constructor(fb) {
        this.fb = fb;
        this.form = this.fb.group({ value: ['t', _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].minLength(2)] });
        this.valueChange = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
}
V4BComponent.ɵfac = function V4BComponent_Factory(t) { return new (t || V4BComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"])); };
V4BComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: V4BComponent, selectors: [["rxa-v4-b"]], hostAttrs: [1, "w-100"], outputs: { valueChange: "valueChange" }, decls: 18, vars: 2, consts: [["visualizerHeader", ""], [1, "row", "w-100"], [1, "col"], ["mat-raised-button", "", 3, "unpatch", "click"], [3, "formGroup"], ["for", "phone"], [4, "ngIf"], ["type", "text", "name", "phone", "id", "phone", "formControlName", "value"], ["value", ""]], template: function V4BComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "B");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "v4");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function V4BComponent_Template_button_click_8_listener() { return ctx.valueChange.next(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, "increment");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "form", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "label", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "Value ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, V4BComponent_span_13_Template, 2, 1, "span", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](14, "input", 7, 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](16, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](17, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !ctx.form.get("value").valid);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_5__["UnpatchEventsDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "AKFf":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/push-v/v2-f.component.ts ***!
  \************************************************************************************/
/*! exports provided: V2FComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V2FComponent", function() { return V2FComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _v2_h_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v2-h.component */ "hTv4");
/* harmony import */ var _shared_value_display_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/value-display.component */ "bgQy");







function V2FComponent_rxa_value_display_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-value-display", 6);
} if (rf & 2) {
    const count_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", count_r1);
} }
class V2FComponent {
    constructor(data) {
        this.data = data;
    }
}
V2FComponent.ɵfac = function V2FComponent_Factory(t) { return new (t || V2FComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V2FComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V2FComponent, selectors: [["rxa-v2-f"]], hostAttrs: [1, "w-100"], decls: 13, vars: 1, consts: [["visualizerHeader", ""], [1, "w-100"], [1, "row"], [1, "col"], ["class", "col", 3, "value", 4, "rxLet"], [1, "row", "w-100"], [1, "col", 3, "value"]], template: function V2FComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "F");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, V2FComponent_rxa_value_display_9_Template, 1, 1, "rxa-value-display", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "rxa-v2-h");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__["RxLet"], _v2_h_component__WEBPACK_IMPORTED_MODULE_4__["V2HComponent"], _shared_value_display_component__WEBPACK_IMPORTED_MODULE_5__["ValueDisplayComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "CQig":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/push-v/v2-b.component.ts ***!
  \************************************************************************************/
/*! exports provided: V2BComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V2BComponent", function() { return V2BComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.directive */ "OyBQ");
/* harmony import */ var _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks/dirty-checks.component */ "qnLR");
/* harmony import */ var _rx_angular_pocs_template_pipes_push_push_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/pipes/push/push.pipe */ "eYr4");









function V2BComponent_rxa_dirty_check_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "rxa-dirty-check");
} }
class V2BComponent {
    constructor() {
        this.numExpressions = new Array(1).fill(0);
        this.valueChange = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    }
    set _value(v$) {
        this.l('input of B', v$);
        this.value = v$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(v => console.log('value change in B', v)));
    }
    l(m, v) {
        if (v !== undefined) {
            console.log(m, v);
        }
        else {
            console.log(m);
        }
    }
}
V2BComponent.ɵfac = function V2BComponent_Factory(t) { return new (t || V2BComponent)(); };
V2BComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: V2BComponent, selectors: [["rxa-v2-b"]], hostAttrs: [1, "w-100"], inputs: { _value: ["value", "_value"] }, outputs: { valueChange: "valueChange" }, decls: 17, vars: 4, consts: [["visualizerHeader", ""], [1, "d-flex"], [4, "ngFor", "ngForOf"], [1, "row", "w-100"], [1, "col"], ["mat-raised-button", "", 3, "unpatch", "click"]], template: function V2BComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "B");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "v2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](7, V2BComponent_rxa_dirty_check_7_Template, 1, 0, "rxa-dirty-check", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function V2BComponent_Template_button_click_10_listener() { ctx.l("click in B"); return ctx.valueChange.next(1); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "increment");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](14, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](16, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.numExpressions);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("count: ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](14, 2, ctx.value), "");
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_6__["UnpatchEventsDirective"], _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_7__["DirtyChecksComponent"]], pipes: [_rx_angular_pocs_template_pipes_push_push_pipe__WEBPACK_IMPORTED_MODULE_8__["PushPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "Czzi":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/native-v/v1-d.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V1DComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V1DComponent", function() { return V1DComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


class V1DComponent {
    constructor() {
    }
}
V1DComponent.ɵfac = function V1DComponent_Factory(t) { return new (t || V1DComponent)(); };
V1DComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: V1DComponent, selectors: [["rxa-v1-d"]], hostAttrs: [1, "w-100"], decls: 6, vars: 0, consts: [["visualizerHeader", ""]], template: function V1DComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "D");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "v1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "EMHr":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/native-v/v1-b.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V1BComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V1BComponent", function() { return V1BComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "ofXK");





class V1BComponent {
    constructor() {
        this.valueChange = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
}
V1BComponent.ɵfac = function V1BComponent_Factory(t) { return new (t || V1BComponent)(); };
V1BComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: V1BComponent, selectors: [["rxa-v1-b"]], hostAttrs: [1, "w-100"], inputs: { value: "value" }, outputs: { valueChange: "valueChange" }, decls: 13, vars: 3, consts: [["visualizerHeader", ""], [1, "row", "w-100"], [1, "col"], ["mat-raised-button", "", 3, "click"]], template: function V1BComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "B");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "v1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function V1BComponent_Template_button_click_8_listener() { return ctx.valueChange.emit(42); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "decrement");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](12, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("count: ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](12, 1, ctx.value), "");
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButton"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "G+pN":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-let-v/v3-h.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V3HComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V3HComponent", function() { return V3HComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");




class V3HComponent {
    constructor(data) {
        this.data = data;
    }
}
V3HComponent.ɵfac = function V3HComponent_Factory(t) { return new (t || V3HComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V3HComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V3HComponent, selectors: [["rxa-v3-h"]], hostAttrs: [1, "w-100"], decls: 7, vars: 0, consts: [["visualizerHeader", ""], [1, "row", "w-100"]], template: function V3HComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "H");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "H+VM":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-let-v/rx-let-v.module.ts ***!
  \***************************************************************************************/
/*! exports provided: RxLetVModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxLetVModule", function() { return RxLetVModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../rx-angular-pocs */ "caVP");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _v3_a_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v3-a.component */ "4GsO");
/* harmony import */ var _v3_b_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v3-b.component */ "/Cys");
/* harmony import */ var _v3_c_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./v3-c.component */ "2C5U");
/* harmony import */ var _v3_d_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./v3-d.component */ "2j8j");
/* harmony import */ var _v3_e_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./v3-e.component */ "nlO6");
/* harmony import */ var _v3_f_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./v3-f.component */ "MvRo");
/* harmony import */ var _v3_h_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./v3-h.component */ "G+pN");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "jzD3");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ "fXoL");
















class RxLetVModule {
}
RxLetVModule.ɵfac = function RxLetVModule_Factory(t) { return new (t || RxLetVModule)(); };
RxLetVModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineNgModule"]({ type: RxLetVModule });
RxLetVModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["RxLetModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["RxLetModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_12__["DirtyChecksModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_13__["ɵɵsetNgModuleScope"](RxLetVModule, { declarations: [_v3_a_component__WEBPACK_IMPORTED_MODULE_3__["V3AComponent"],
        _v3_b_component__WEBPACK_IMPORTED_MODULE_4__["V3BComponent"],
        _v3_c_component__WEBPACK_IMPORTED_MODULE_5__["V3CComponent"],
        _v3_d_component__WEBPACK_IMPORTED_MODULE_6__["V3DComponent"],
        _v3_e_component__WEBPACK_IMPORTED_MODULE_7__["V3EComponent"],
        _v3_f_component__WEBPACK_IMPORTED_MODULE_8__["V3FComponent"],
        _v3_h_component__WEBPACK_IMPORTED_MODULE_9__["V3HComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["RxLetModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["RxLetModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
        _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_12__["DirtyChecksModule"]], exports: [_v3_a_component__WEBPACK_IMPORTED_MODULE_3__["V3AComponent"]] }); })();


/***/ }),

/***/ "Hb30":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/global-order.component.ts ***!
  \*************************************************************************************/
/*! exports provided: GlobalOrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalOrderComponent", function() { return GlobalOrderComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _native_v_v1_a_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./native-v/v1-a.component */ "+mLV");
/* harmony import */ var _push_v_v2_a_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./push-v/v2-a.component */ "K5wl");
/* harmony import */ var _rx_let_v_v3_a_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rx-let-v/v3-a.component */ "4GsO");
/* harmony import */ var _rx_form_v_v4_a_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rx-form-v/v4-a.component */ "jbS+");










function GlobalOrderComponent_div_20_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-v1-a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function GlobalOrderComponent_div_21_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-v2-a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function GlobalOrderComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-v3-a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function GlobalOrderComponent_div_23_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-v4-a");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
class GlobalOrderComponent {
    constructor(data) {
        this.data = data;
        this.displayStates = {
            none: -1,
            all: 0,
            native: 1,
            push: 2,
            rxLet: 3,
            rxForm: 4,
        };
    }
}
GlobalOrderComponent.ɵfac = function GlobalOrderComponent_Factory(t) { return new (t || GlobalOrderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
GlobalOrderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: GlobalOrderComponent, selectors: [["rxa-global-order"]], decls: 24, vars: 11, consts: [["visualizerHeader", ""], ["name", "visibleExamples", "aria-label", "Visible Examples", 3, "value"], ["group", "matButtonToggleGroup"], [3, "value"], [1, "row", "w-100"], ["class", "col", 4, "ngIf"], [1, "col"]], template: function GlobalOrderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "Custom Strategy - Parent component");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "mat-button-toggle-group", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8, "None");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Angular Native");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12, "RxAngular push ");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](14, "RxAngular *rxLet");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](15, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](16, "Angular Reactive Forms");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](17, "mat-button-toggle", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](18, "All");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](20, GlobalOrderComponent_div_20_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](21, GlobalOrderComponent_div_21_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](22, GlobalOrderComponent_div_22_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](23, GlobalOrderComponent_div_23_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.none);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.none);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.native);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.push);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.rxLet);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.rxForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r0.value === ctx.displayStates.native || _r0.value === ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r0.value === ctx.displayStates.push || _r0.value === ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r0.value === ctx.displayStates.rxLet || _r0.value === ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", _r0.value === ctx.displayStates.rxForm || _r0.value === ctx.displayStates.all);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggleGroup"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggle"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _native_v_v1_a_component__WEBPACK_IMPORTED_MODULE_5__["V1AComponent"], _push_v_v2_a_component__WEBPACK_IMPORTED_MODULE_6__["V2AComponent"], _rx_let_v_v3_a_component__WEBPACK_IMPORTED_MODULE_7__["V3AComponent"], _rx_form_v_v4_a_component__WEBPACK_IMPORTED_MODULE_8__["V4AComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "J9/y":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-form-v/rx-form-v.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: RxFormVModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxFormVModule", function() { return RxFormVModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../rx-angular-pocs */ "caVP");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _v4_a_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v4-a.component */ "jbS+");
/* harmony import */ var _v4_b_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v4-b.component */ "7E8L");
/* harmony import */ var _v4_c_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./v4-c.component */ "gqVE");
/* harmony import */ var _v4_d_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./v4-d.component */ "k0yp");
/* harmony import */ var _v4_e_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./v4-e.component */ "xadS");
/* harmony import */ var _v4_f_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./v4-f.component */ "wSI2");
/* harmony import */ var _v4_h_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./v4-h.component */ "znuq");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../shared/shared.module */ "jzD3");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ "fXoL");

















class RxFormVModule {
}
RxFormVModule.ɵfac = function RxFormVModule_Factory(t) { return new (t || RxFormVModule)(); };
RxFormVModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({ type: RxFormVModule });
RxFormVModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["RxLetModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["RxLetModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_12__["DirtyChecksModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ReactiveFormsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](RxFormVModule, { declarations: [_v4_a_component__WEBPACK_IMPORTED_MODULE_3__["V4AComponent"],
        _v4_b_component__WEBPACK_IMPORTED_MODULE_4__["V4BComponent"],
        _v4_c_component__WEBPACK_IMPORTED_MODULE_5__["V4CComponent"],
        _v4_d_component__WEBPACK_IMPORTED_MODULE_6__["V4DComponent"],
        _v4_e_component__WEBPACK_IMPORTED_MODULE_7__["V4EComponent"],
        _v4_f_component__WEBPACK_IMPORTED_MODULE_8__["V4FComponent"],
        _v4_h_component__WEBPACK_IMPORTED_MODULE_9__["V4HComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_10__["SharedModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["RxLetModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["UnpatchEventsModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["RxLetModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_1__["PushModule"],
        _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_12__["DirtyChecksModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ReactiveFormsModule"]], exports: [_v4_a_component__WEBPACK_IMPORTED_MODULE_3__["V4AComponent"]] }); })();


/***/ }),

/***/ "K5wl":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/push-v/v2-a.component.ts ***!
  \************************************************************************************/
/*! exports provided: V2AComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V2AComponent", function() { return V2AComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks/dirty-checks.component */ "qnLR");
/* harmony import */ var _v2_b_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v2-b.component */ "CQig");
/* harmony import */ var _rx_angular_pocs_template_pipes_push_push_pipe__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/pipes/push/push.pipe */ "eYr4");







class V2AComponent {
    constructor(data) {
        this.data = data;
    }
}
V2AComponent.ɵfac = function V2AComponent_Factory(t) { return new (t || V2AComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V2AComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V2AComponent, selectors: [["rxa-v2-a"]], hostAttrs: [1, "w-100"], decls: 14, vars: 4, consts: [["visualizerHeader", ""], ["log", "A"], [1, "row", "w-100"], [1, "col"], [3, "value", "valueChange"]], template: function V2AComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "A");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "rxa-dirty-check", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "span");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](9, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "rxa-v2-b", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("valueChange", function V2AComponent_Template_rxa_v2_b_valueChange_12_listener($event) { return ctx.data.increment($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("count: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](9, 2, ctx.data.count$), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_3__["DirtyChecksComponent"], _v2_b_component__WEBPACK_IMPORTED_MODULE_4__["V2BComponent"]], pipes: [_rx_angular_pocs_template_pipes_push_push_pipe__WEBPACK_IMPORTED_MODULE_5__["PushPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "KyDp":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/push-v/v2-e.component.ts ***!
  \************************************************************************************/
/*! exports provided: V2EComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V2EComponent", function() { return V2EComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


class V2EComponent {
    constructor() {
    }
}
V2EComponent.ɵfac = function V2EComponent_Factory(t) { return new (t || V2EComponent)(); };
V2EComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: V2EComponent, selectors: [["rxa-v2-e"]], hostAttrs: [1, "w-100"], decls: 6, vars: 0, consts: [["visualizerHeader", ""]], template: function V2EComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "E");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "v2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "MvRo":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-let-v/v3-f.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V3FComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V3FComponent", function() { return V3FComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _v3_h_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v3-h.component */ "G+pN");
/* harmony import */ var _shared_value_display_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/value-display.component */ "bgQy");







function V3FComponent_rxa_value_display_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-value-display", 6);
} if (rf & 2) {
    const count_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", count_r1);
} }
class V3FComponent {
    constructor(data) {
        this.data = data;
    }
}
V3FComponent.ɵfac = function V3FComponent_Factory(t) { return new (t || V3FComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V3FComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V3FComponent, selectors: [["rxa-v3-f"]], hostAttrs: [1, "w-100"], decls: 13, vars: 1, consts: [["visualizerHeader", ""], [1, "w-100"], [1, "row"], [1, "col"], ["class", "col", 3, "value", 4, "rxLet"], [1, "row", "w-100"], [1, "col", 3, "value"]], template: function V3FComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "F");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v3");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, V3FComponent_rxa_value_display_9_Template, 1, 1, "rxa-value-display", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "rxa-v3-h");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__["RxLet"], _v3_h_component__WEBPACK_IMPORTED_MODULE_4__["V3HComponent"], _shared_value_display_component__WEBPACK_IMPORTED_MODULE_5__["ValueDisplayComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "Nedg":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/push-v/v2-c.component.ts ***!
  \************************************************************************************/
/*! exports provided: V2CComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V2CComponent", function() { return V2CComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _v2_e_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v2-e.component */ "KyDp");
/* harmony import */ var _v2_f_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./v2-f.component */ "AKFf");
/* harmony import */ var _shared_value_display_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/value-display.component */ "bgQy");








function V2CComponent_rxa_value_display_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-value-display", 5);
} if (rf & 2) {
    const count_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", count_r1);
} }
class V2CComponent {
    constructor(data) {
        this.data = data;
    }
}
V2CComponent.ɵfac = function V2CComponent_Factory(t) { return new (t || V2CComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V2CComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V2CComponent, selectors: [["rxa-v2-c"]], hostAttrs: [1, "w-100"], decls: 14, vars: 1, consts: [["visualizerHeader", ""], [1, "w-100"], [1, "row"], ["class", "col", 3, "value", 4, "rxLet"], [1, "col"], [1, "col", 3, "value"]], template: function V2CComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "C");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, V2CComponent_rxa_value_display_8_Template, 1, 1, "rxa-value-display", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "rxa-v2-e");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "rxa-v2-f");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__["RxLet"], _v2_e_component__WEBPACK_IMPORTED_MODULE_4__["V2EComponent"], _v2_f_component__WEBPACK_IMPORTED_MODULE_5__["V2FComponent"], _shared_value_display_component__WEBPACK_IMPORTED_MODULE_6__["ValueDisplayComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "NgW/":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/native-v/v1-e.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V1EComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V1EComponent", function() { return V1EComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


class V1EComponent {
    constructor() {
    }
}
V1EComponent.ɵfac = function V1EComponent_Factory(t) { return new (t || V1EComponent)(); };
V1EComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: V1EComponent, selectors: [["rxa-v1-e"]], hostAttrs: [1, "w-100"], decls: 6, vars: 0, consts: [["visualizerHeader", ""]], template: function V1EComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "E");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "v1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "QE1+":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/native-v/native-v.module.ts ***!
  \***************************************************************************************/
/*! exports provided: NativeVModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NativeVModule", function() { return NativeVModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/shared.module */ "jzD3");
/* harmony import */ var _v1_a_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v1-a.component */ "+mLV");
/* harmony import */ var _v1_b_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v1-b.component */ "EMHr");
/* harmony import */ var _v1_d_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./v1-d.component */ "Czzi");
/* harmony import */ var _v1_c_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./v1-c.component */ "wTM2");
/* harmony import */ var _v1_e_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./v1-e.component */ "NgW/");
/* harmony import */ var _v1_f_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./v1-f.component */ "adR9");
/* harmony import */ var _v1_h_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./v1-h.component */ "jQ90");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");












class NativeVModule {
}
NativeVModule.ɵfac = function NativeVModule_Factory(t) { return new (t || NativeVModule)(); };
NativeVModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: NativeVModule });
NativeVModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](NativeVModule, { declarations: [_v1_a_component__WEBPACK_IMPORTED_MODULE_3__["V1AComponent"],
        _v1_b_component__WEBPACK_IMPORTED_MODULE_4__["V1BComponent"],
        _v1_c_component__WEBPACK_IMPORTED_MODULE_6__["V1CComponent"],
        _v1_d_component__WEBPACK_IMPORTED_MODULE_5__["V1DComponent"],
        _v1_e_component__WEBPACK_IMPORTED_MODULE_7__["V1EComponent"],
        _v1_f_component__WEBPACK_IMPORTED_MODULE_8__["V1FComponent"],
        _v1_h_component__WEBPACK_IMPORTED_MODULE_9__["V1HComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_2__["SharedModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"]], exports: [_v1_a_component__WEBPACK_IMPORTED_MODULE_3__["V1AComponent"]] }); })();


/***/ }),

/***/ "ZV2y":
/*!***********************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/push-v/push-v.module.ts ***!
  \***********************************************************************************/
/*! exports provided: PushVModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PushVModule", function() { return PushVModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _v2_a_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v2-a.component */ "K5wl");
/* harmony import */ var _v2_b_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v2-b.component */ "CQig");
/* harmony import */ var _v2_c_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v2-c.component */ "Nedg");
/* harmony import */ var _v2_d_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./v2-d.component */ "w0dh");
/* harmony import */ var _v2_e_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./v2-e.component */ "KyDp");
/* harmony import */ var _v2_f_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./v2-f.component */ "AKFf");
/* harmony import */ var _v2_h_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./v2-h.component */ "hTv4");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/shared.module */ "jzD3");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_pocs_template_directives_let__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let */ "poug");
/* harmony import */ var _rx_angular_pocs_template_directives_unpatch__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/unpatch */ "B09P");
/* harmony import */ var _rx_angular_pocs_template_pipes_push__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/pipes/push */ "QMWD");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ "fXoL");
















class PushVModule {
}
PushVModule.ɵfac = function PushVModule_Factory(t) { return new (t || PushVModule)(); };
PushVModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineNgModule"]({ type: PushVModule });
PushVModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
            _rx_angular_pocs_template_directives_let__WEBPACK_IMPORTED_MODULE_11__["RxLetModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
            _rx_angular_pocs_template_directives_unpatch__WEBPACK_IMPORTED_MODULE_12__["UnpatchEventsModule"],
            _rx_angular_pocs_template_directives_let__WEBPACK_IMPORTED_MODULE_11__["RxLetModule"],
            _rx_angular_pocs_template_pipes_push__WEBPACK_IMPORTED_MODULE_13__["PushModule"],
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_14__["DirtyChecksModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_15__["ɵɵsetNgModuleScope"](PushVModule, { declarations: [_v2_a_component__WEBPACK_IMPORTED_MODULE_2__["V2AComponent"],
        _v2_b_component__WEBPACK_IMPORTED_MODULE_3__["V2BComponent"],
        _v2_c_component__WEBPACK_IMPORTED_MODULE_4__["V2CComponent"],
        _v2_d_component__WEBPACK_IMPORTED_MODULE_5__["V2DComponent"],
        _v2_e_component__WEBPACK_IMPORTED_MODULE_6__["V2EComponent"],
        _v2_f_component__WEBPACK_IMPORTED_MODULE_7__["V2FComponent"],
        _v2_h_component__WEBPACK_IMPORTED_MODULE_8__["V2HComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"],
        _shared_shared_module__WEBPACK_IMPORTED_MODULE_9__["SharedModule"],
        _rx_angular_pocs_template_directives_let__WEBPACK_IMPORTED_MODULE_11__["RxLetModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
        _rx_angular_pocs_template_directives_unpatch__WEBPACK_IMPORTED_MODULE_12__["UnpatchEventsModule"],
        _rx_angular_pocs_template_directives_let__WEBPACK_IMPORTED_MODULE_11__["RxLetModule"],
        _rx_angular_pocs_template_pipes_push__WEBPACK_IMPORTED_MODULE_13__["PushModule"],
        _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_14__["DirtyChecksModule"]], exports: [_v2_a_component__WEBPACK_IMPORTED_MODULE_2__["V2AComponent"]] }); })();


/***/ }),

/***/ "adR9":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/native-v/v1-f.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V1FComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V1FComponent", function() { return V1FComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _v1_h_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v1-h.component */ "jQ90");





class V1FComponent {
    constructor(data) {
        this.data = data;
    }
}
V1FComponent.ɵfac = function V1FComponent_Factory(t) { return new (t || V1FComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V1FComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V1FComponent, selectors: [["rxa-v1-f"]], hostAttrs: [1, "w-100"], decls: 12, vars: 0, consts: [["visualizerHeader", ""], [1, "w-100"], [1, "row"], [1, "col"], [1, "row", "w-100"]], template: function V1FComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "F");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "rxa-v1-h");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _v1_h_component__WEBPACK_IMPORTED_MODULE_3__["V1HComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "bgQy":
/*!*********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/shared/value-display.component.ts ***!
  \*********************************************************************************************/
/*! exports provided: ValueDisplayComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValueDisplayComponent", function() { return ValueDisplayComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "ofXK");



const _c0 = function (a0, a1) { return { red: a0, green: a1 }; };
class ValueDisplayComponent {
    constructor() {
        this.isTrue = false;
    }
    set value(value) {
        this.isTrue = Math.abs(value % 2) < 1;
    }
}
ValueDisplayComponent.ɵfac = function ValueDisplayComponent_Factory(t) { return new (t || ValueDisplayComponent)(); };
ValueDisplayComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ValueDisplayComponent, selectors: [["rxa-value-display"]], inputs: { value: "value" }, decls: 2, vars: 5, consts: [[1, "item", 3, "ngClass"]], template: function ValueDisplayComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-icon", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c0, !ctx.isTrue, ctx.isTrue));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.isTrue ? "check" : "highlight_off");
    } }, directives: [_angular_material_icon__WEBPACK_IMPORTED_MODULE_1__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgClass"]], styles: [".item.red[_ngcontent-%COMP%] {\n      color: red;\n    }\n    .item.green[_ngcontent-%COMP%] {\n      color: green;\n    }"] });


/***/ }),

/***/ "cyPU":
/*!********************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/visualizer/index.ts ***!
  \********************************************************************/
/*! exports provided: VisualizerModule, VisualizerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _visualizer_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./visualizer.module */ "RtHe");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VisualizerModule", function() { return _visualizer_module__WEBPACK_IMPORTED_MODULE_0__["VisualizerModule"]; });

/* harmony import */ var _visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./visualizer/visualizer.component */ "cIVi");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VisualizerComponent", function() { return _visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]; });





/***/ }),

/***/ "gaEW":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/shared/data.service.ts ***!
  \**********************************************************************************/
/*! exports provided: DataService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataService", function() { return DataService; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




function unwrapAction(prop) {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(action => Object.keys(action).includes(prop)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(action => action[prop]));
}
class DataService extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_1__["RxState"] {
    constructor() {
        super();
        this.action$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.count$ = this.select('count');
        this.set({ count: 0 });
        this.connect('count', this.action$.pipe(unwrapAction('inc')), (s, num) => (s === null || s === void 0 ? void 0 : s.count) + num);
        this.connect('count', this.action$.pipe(unwrapAction('dec')), (s, num) => (s === null || s === void 0 ? void 0 : s.count) - num);
        this.hold(this.count$, (c) => console.log('update count', c));
    }
    increment(inc) {
        this.action$.next({ inc });
    }
    decrement(dec) {
        this.action$.next({ dec });
    }
}
DataService.ɵfac = function DataService_Factory(t) { return new (t || DataService)(); };
DataService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjectable"]({ token: DataService, factory: DataService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "gqVE":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-form-v/v4-c.component.ts ***!
  \***************************************************************************************/
/*! exports provided: V4CComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V4CComponent", function() { return V4CComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _v4_e_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v4-e.component */ "xadS");
/* harmony import */ var _v4_f_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./v4-f.component */ "wSI2");
/* harmony import */ var _shared_value_display_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../shared/value-display.component */ "bgQy");








function V4CComponent_rxa_value_display_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-value-display", 5);
} if (rf & 2) {
    const count_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", count_r1);
} }
class V4CComponent {
    constructor(data) {
        this.data = data;
    }
}
V4CComponent.ɵfac = function V4CComponent_Factory(t) { return new (t || V4CComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V4CComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V4CComponent, selectors: [["rxa-v4-c"]], hostAttrs: [1, "w-100"], decls: 14, vars: 1, consts: [["visualizerHeader", ""], [1, "w-100"], [1, "row"], ["class", "col", 3, "value", 4, "rxLet"], [1, "col"], [1, "col", 3, "value"]], template: function V4CComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "C");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, V4CComponent_rxa_value_display_8_Template, 1, 1, "rxa-value-display", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](11, "rxa-v4-e");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](13, "rxa-v4-f");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__["RxLet"], _v4_e_component__WEBPACK_IMPORTED_MODULE_4__["V4EComponent"], _v4_f_component__WEBPACK_IMPORTED_MODULE_5__["V4FComponent"], _shared_value_display_component__WEBPACK_IMPORTED_MODULE_6__["ValueDisplayComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "hTv4":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/push-v/v2-h.component.ts ***!
  \************************************************************************************/
/*! exports provided: V2HComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V2HComponent", function() { return V2HComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");




class V2HComponent {
    constructor(data) {
        this.data = data;
    }
}
V2HComponent.ɵfac = function V2HComponent_Factory(t) { return new (t || V2HComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V2HComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V2HComponent, selectors: [["rxa-v2-h"]], hostAttrs: [1, "w-100"], decls: 7, vars: 0, consts: [["visualizerHeader", ""], [1, "row", "w-100"]], template: function V2HComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "H");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v2");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "jQ90":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/native-v/v1-h.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V1HComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V1HComponent", function() { return V1HComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_value_display_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/value-display.component */ "bgQy");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "ofXK");






class V1HComponent {
    constructor(data) {
        this.data = data;
    }
}
V1HComponent.ɵfac = function V1HComponent_Factory(t) { return new (t || V1HComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V1HComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V1HComponent, selectors: [["rxa-v1-h"]], hostAttrs: [1, "w-100"], decls: 9, vars: 3, consts: [["visualizerHeader", ""], [1, "row", "w-100"], [3, "value"]], template: function V1HComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "H");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "rxa-value-display", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](8, "async");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](8, 1, ctx.data.count$));
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _shared_value_display_component__WEBPACK_IMPORTED_MODULE_3__["ValueDisplayComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["AsyncPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "jbS+":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-form-v/v4-a.component.ts ***!
  \***************************************************************************************/
/*! exports provided: V4AComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V4AComponent", function() { return V4AComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _v4_b_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v4-b.component */ "7E8L");
/* harmony import */ var _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks/dirty-checks.component */ "qnLR");







function V4AComponent_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](1, "rxa-dirty-check");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const v_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" count: ", v_r1, " ");
} }
class V4AComponent {
    constructor(data) {
        this.data = data;
    }
}
V4AComponent.ɵfac = function V4AComponent_Factory(t) { return new (t || V4AComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V4AComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V4AComponent, selectors: [["rxa-v4-a"]], hostAttrs: [1, "w-100"], decls: 11, vars: 1, consts: [["visualizerHeader", ""], [4, "rxLet"], [1, "row", "w-100"], [1, "col"]], template: function V4AComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "A");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, V4AComponent_span_6_Template, 3, 1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](9, "rxa-v4-b");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__["RxLet"], _v4_b_component__WEBPACK_IMPORTED_MODULE_4__["V4BComponent"], _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_5__["DirtyChecksComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "jzD3":
/*!***********************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/shared/shared.module.ts ***!
  \***********************************************************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _value_display_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./value-display.component */ "bgQy");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");




class SharedModule {
}
SharedModule.ɵfac = function SharedModule_Factory(t) { return new (t || SharedModule)(); };
SharedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: SharedModule });
SharedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](SharedModule, { declarations: [_value_display_component__WEBPACK_IMPORTED_MODULE_1__["ValueDisplayComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_2__["MatIconModule"]], exports: [_value_display_component__WEBPACK_IMPORTED_MODULE_1__["ValueDisplayComponent"]] }); })();


/***/ }),

/***/ "k0yp":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-form-v/v4-d.component.ts ***!
  \***************************************************************************************/
/*! exports provided: V4DComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V4DComponent", function() { return V4DComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


class V4DComponent {
    constructor() {
    }
}
V4DComponent.ɵfac = function V4DComponent_Factory(t) { return new (t || V4DComponent)(); };
V4DComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: V4DComponent, selectors: [["rxa-v4-d"]], hostAttrs: [1, "w-100"], decls: 6, vars: 0, consts: [["visualizerHeader", ""]], template: function V4DComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "D");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "v4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "nlO6":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-let-v/v3-e.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V3EComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V3EComponent", function() { return V3EComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


class V3EComponent {
    constructor() {
    }
}
V3EComponent.ɵfac = function V3EComponent_Factory(t) { return new (t || V3EComponent)(); };
V3EComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: V3EComponent, selectors: [["rxa-v3-e"]], hostAttrs: [1, "w-100"], decls: 6, vars: 0, consts: [["visualizerHeader", ""]], template: function V3EComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "E");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "v3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "r4AD":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/global-order.routes.ts ***!
  \**********************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _global_order_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./global-order.component */ "Hb30");

const ROUTES = [
    {
        path: '',
        component: _global_order_component__WEBPACK_IMPORTED_MODULE_0__["GlobalOrderComponent"]
    }
];


/***/ }),

/***/ "uVGF":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/global-order.module.ts ***!
  \**********************************************************************************/
/*! exports provided: GlobalOrderModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GlobalOrderModule", function() { return GlobalOrderModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _global_order_routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./global-order.routes */ "r4AD");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _global_order_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./global-order.component */ "Hb30");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _native_v_native_v_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./native-v/native-v.module */ "QE1+");
/* harmony import */ var _rx_let_v_rx_let_v_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rx-let-v/rx-let-v.module */ "H+VM");
/* harmony import */ var _push_v_push_v_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./push-v/push-v.module */ "ZV2y");
/* harmony import */ var _rx_form_v_rx_form_v_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./rx-form-v/rx-form-v.module */ "J9/y");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");












class GlobalOrderModule {
}
GlobalOrderModule.ɵfac = function GlobalOrderModule_Factory(t) { return new (t || GlobalOrderModule)(); };
GlobalOrderModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: GlobalOrderModule });
GlobalOrderModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_global_order_routes__WEBPACK_IMPORTED_MODULE_2__["ROUTES"]),
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_3__["VisualizerModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_5__["MatButtonToggleModule"],
            _native_v_native_v_module__WEBPACK_IMPORTED_MODULE_6__["NativeVModule"],
            _rx_let_v_rx_let_v_module__WEBPACK_IMPORTED_MODULE_7__["RxLetVModule"],
            _push_v_push_v_module__WEBPACK_IMPORTED_MODULE_8__["PushVModule"],
            _rx_form_v_rx_form_v_module__WEBPACK_IMPORTED_MODULE_9__["RxFormVModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](GlobalOrderModule, { declarations: [_global_order_component__WEBPACK_IMPORTED_MODULE_4__["GlobalOrderComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_3__["VisualizerModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_5__["MatButtonToggleModule"],
        _native_v_native_v_module__WEBPACK_IMPORTED_MODULE_6__["NativeVModule"],
        _rx_let_v_rx_let_v_module__WEBPACK_IMPORTED_MODULE_7__["RxLetVModule"],
        _push_v_push_v_module__WEBPACK_IMPORTED_MODULE_8__["PushVModule"],
        _rx_form_v_rx_form_v_module__WEBPACK_IMPORTED_MODULE_9__["RxFormVModule"]] }); })();


/***/ }),

/***/ "w0dh":
/*!************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/push-v/v2-d.component.ts ***!
  \************************************************************************************/
/*! exports provided: V2DComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V2DComponent", function() { return V2DComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


class V2DComponent {
    constructor() {
    }
}
V2DComponent.ɵfac = function V2DComponent_Factory(t) { return new (t || V2DComponent)(); };
V2DComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: V2DComponent, selectors: [["rxa-v2-d"]], hostAttrs: [1, "w-100"], decls: 6, vars: 0, consts: [["visualizerHeader", ""]], template: function V2DComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "D");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "v2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "wSI2":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-form-v/v4-f.component.ts ***!
  \***************************************************************************************/
/*! exports provided: V4FComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V4FComponent", function() { return V4FComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _v4_h_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v4-h.component */ "znuq");
/* harmony import */ var _shared_value_display_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/value-display.component */ "bgQy");







function V4FComponent_rxa_value_display_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "rxa-value-display", 6);
} if (rf & 2) {
    const count_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("value", count_r1);
} }
class V4FComponent {
    constructor(data) {
        this.data = data;
    }
}
V4FComponent.ɵfac = function V4FComponent_Factory(t) { return new (t || V4FComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V4FComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V4FComponent, selectors: [["rxa-v4-f"]], hostAttrs: [1, "w-100"], decls: 13, vars: 1, consts: [["visualizerHeader", ""], [1, "w-100"], [1, "row"], [1, "col"], ["class", "col", 3, "value", 4, "rxLet"], [1, "row", "w-100"], [1, "col", 3, "value"]], template: function V4FComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "F");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, V4FComponent_rxa_value_display_9_Template, 1, 1, "rxa-value-display", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "rxa-v4-h");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("rxLet", ctx.data.count$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_3__["RxLet"], _v4_h_component__WEBPACK_IMPORTED_MODULE_4__["V4HComponent"], _shared_value_display_component__WEBPACK_IMPORTED_MODULE_5__["ValueDisplayComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "wTM2":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/native-v/v1-c.component.ts ***!
  \**************************************************************************************/
/*! exports provided: V1CComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V1CComponent", function() { return V1CComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _v1_e_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v1-e.component */ "NgW/");
/* harmony import */ var _v1_f_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./v1-f.component */ "adR9");






class V1CComponent {
    constructor(data) {
        this.data = data;
    }
}
V1CComponent.ɵfac = function V1CComponent_Factory(t) { return new (t || V1CComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V1CComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V1CComponent, selectors: [["rxa-v1-c"]], hostAttrs: [1, "w-100"], decls: 13, vars: 0, consts: [["visualizerHeader", ""], [1, "w-100"], [1, "row"], [1, "col"]], template: function V1CComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "C");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](7, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "rxa-v1-e");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](12, "rxa-v1-f");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"], _v1_e_component__WEBPACK_IMPORTED_MODULE_3__["V1EComponent"], _v1_f_component__WEBPACK_IMPORTED_MODULE_4__["V1FComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "xadS":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-form-v/v4-e.component.ts ***!
  \***************************************************************************************/
/*! exports provided: V4EComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V4EComponent", function() { return V4EComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


class V4EComponent {
    constructor() {
    }
}
V4EComponent.ɵfac = function V4EComponent_Factory(t) { return new (t || V4EComponent)(); };
V4EComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: V4EComponent, selectors: [["rxa-v4-e"]], hostAttrs: [1, "w-100"], decls: 6, vars: 0, consts: [["visualizerHeader", ""]], template: function V4EComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "E");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "v4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "znuq":
/*!***************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/global-order/rx-form-v/v4-h.component.ts ***!
  \***************************************************************************************/
/*! exports provided: V4HComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "V4HComponent", function() { return V4HComponent; });
/* harmony import */ var _shared_data_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/data.service */ "gaEW");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");




class V4HComponent {
    constructor(data) {
        this.data = data;
    }
}
V4HComponent.ɵfac = function V4HComponent_Factory(t) { return new (t || V4HComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_data_service__WEBPACK_IMPORTED_MODULE_0__["DataService"])); };
V4HComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: V4HComponent, selectors: [["rxa-v4-h"]], hostAttrs: [1, "w-100"], decls: 7, vars: 0, consts: [["visualizerHeader", ""], [1, "row", "w-100"]], template: function V4HComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, "H");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "small");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "v4");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](6, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=global-order-global-order-module.js.map