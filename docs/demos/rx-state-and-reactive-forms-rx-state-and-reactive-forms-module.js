(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["rx-state-and-reactive-forms-rx-state-and-reactive-forms-module"],{

/***/ "49q8":
/*!************************************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/rx-state-and-reactive-forms/rx-state-and-reactive-forms.module.ts ***!
  \************************************************************************************************************************************/
/*! exports provided: RxStateAndReactiveFormsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateAndReactiveFormsModule", function() { return RxStateAndReactiveFormsModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rx_state_and_reactive_forms_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rx-state-and-reactive-forms.routes */ "Ulj+");
/* harmony import */ var _rx_state_and_reactive_forms_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./rx-state-and-reactive-forms.component */ "lNjd");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "zhsl");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");






const DECLARATIONS = [_rx_state_and_reactive_forms_component__WEBPACK_IMPORTED_MODULE_2__["RxStateAndReactiveFormsCounterComponent"]];
class RxStateAndReactiveFormsModule {
}
RxStateAndReactiveFormsModule.ɵfac = function RxStateAndReactiveFormsModule_Factory(t) { return new (t || RxStateAndReactiveFormsModule)(); };
RxStateAndReactiveFormsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineNgModule"]({ type: RxStateAndReactiveFormsModule });
RxStateAndReactiveFormsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineInjector"]({ imports: [[
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(_rx_state_and_reactive_forms_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"])
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵsetNgModuleScope"](RxStateAndReactiveFormsModule, { declarations: [_rx_state_and_reactive_forms_component__WEBPACK_IMPORTED_MODULE_2__["RxStateAndReactiveFormsCounterComponent"]], imports: [_shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "UKRj":
/*!*********************************************************!*\
  !*** ./apps/demos/src/app/shared/utils/utils.module.ts ***!
  \*********************************************************/
/*! exports provided: UtilsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilsModule", function() { return UtilsModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _to_array_pipe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./to-array.pipe */ "bllw");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class UtilsModule {
}
UtilsModule.ɵfac = function UtilsModule_Factory(t) { return new (t || UtilsModule)(); };
UtilsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: UtilsModule });
UtilsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](UtilsModule, { declarations: [_to_array_pipe__WEBPACK_IMPORTED_MODULE_1__["ToArrayPipe"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]], exports: [_to_array_pipe__WEBPACK_IMPORTED_MODULE_1__["ToArrayPipe"]] }); })();


/***/ }),

/***/ "Ulj+":
/*!************************************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/rx-state-and-reactive-forms/rx-state-and-reactive-forms.routes.ts ***!
  \************************************************************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _rx_state_and_reactive_forms_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rx-state-and-reactive-forms.component */ "lNjd");

const ROUTES = [
    {
        path: '',
        component: _rx_state_and_reactive_forms_component__WEBPACK_IMPORTED_MODULE_0__["RxStateAndReactiveFormsCounterComponent"]
    }
];


/***/ }),

/***/ "bllw":
/*!**********************************************************!*\
  !*** ./apps/demos/src/app/shared/utils/to-array.pipe.ts ***!
  \**********************************************************/
/*! exports provided: ToArrayPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToArrayPipe", function() { return ToArrayPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class ToArrayPipe {
    transform(value) {
        if (typeof value === 'number') {
            return new Array(value).fill(0).map((_, idx) => idx);
        }
        return value != null ? value.toString().split('') : [];
    }
}
ToArrayPipe.ɵfac = function ToArrayPipe_Factory(t) { return new (t || ToArrayPipe)(); };
ToArrayPipe.ɵpipe = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefinePipe"]({ name: "toArray", type: ToArrayPipe, pure: true });


/***/ }),

/***/ "lNjd":
/*!***************************************************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/integrations/dynamic-counter/rx-state-and-reactive-forms/rx-state-and-reactive-forms.component.ts ***!
  \***************************************************************************************************************************************/
/*! exports provided: RxStateAndReactiveFormsCounterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxStateAndReactiveFormsCounterComponent", function() { return RxStateAndReactiveFormsCounterComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "mrSG");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _shared_model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../shared/model */ "wvVy");
/* harmony import */ var _shared_utils_to_latest_from__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/utils/to-latest-from */ "VuqE");
/* harmony import */ var _shared_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/utils */ "NMwP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_counter_display_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../shared/counter-display.component */ "Zwmw");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/input */ "qFsG");















class RxStateAndReactiveFormsCounterComponent {
    constructor(fb, $) {
        this.fb = fb;
        this.$ = $;
        this.initialCounterState = _shared_model__WEBPACK_IMPORTED_MODULE_5__["INITIAL_STATE"];
        this.counterForm = this.fb.group({
            tickSpeed: [],
            count: [],
            countDiff: []
        });
        this.updateTicking = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.updateCountUp = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.btnSetTo = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.count$ = this.$.select(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(s => s.count + ''));
        this.reset();
        this.$.connect(this.updateTicking);
        this.$.connect(this.updateCountUp);
        this.$.connect(this.counterForm.valueChanges
            .pipe(Object(_rx_angular_state__WEBPACK_IMPORTED_MODULE_4__["selectSlice"])(['tickSpeed', 'countDiff'])));
        this.$.connect(this.btnSetTo.pipe(Object(_shared_utils_to_latest_from__WEBPACK_IMPORTED_MODULE_6__["toLatestFrom"])(this.counterForm.valueChanges
            .pipe(Object(_rx_angular_state__WEBPACK_IMPORTED_MODULE_4__["selectSlice"])(['count'])), { count: this.counterForm.value.count })));
        const updateCountTrigger$ = this.$.select(Object(_rx_angular_state__WEBPACK_IMPORTED_MODULE_4__["selectSlice"])(['isTicking', 'tickSpeed']), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(s => (s.isTicking ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["timer"])(0, s.tickSpeed) : rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"])));
        this.$.connect('count', updateCountTrigger$, _shared_utils__WEBPACK_IMPORTED_MODULE_7__["updateCount"]);
    }
    reset() {
        const _a = this.initialCounterState, { tickSpeed, countDiff, count } = _a, ignore = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__rest"])(_a, ["tickSpeed", "countDiff", "count"]);
        this.$.set(this.initialCounterState);
        this.counterForm.patchValue({ tickSpeed, countDiff, count });
    }
}
RxStateAndReactiveFormsCounterComponent.ɵfac = function RxStateAndReactiveFormsCounterComponent_Factory(t) { return new (t || RxStateAndReactiveFormsCounterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_4__["RxState"])); };
RxStateAndReactiveFormsCounterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineComponent"]({ type: RxStateAndReactiveFormsCounterComponent, selectors: [["rxa-dynamic-counter-and-forms"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵProvidersFeature"]([_rx_angular_state__WEBPACK_IMPORTED_MODULE_4__["RxState"]])], decls: 31, vars: 5, consts: [[1, "counter", 3, "formGroup"], [3, "count$"], ["mat-raised-button", "", 3, "click"], ["type", "number", "min", "0", "matInput", "", 3, "formControlName"]], template: function RxStateAndReactiveFormsCounterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](0, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](1, "RxState + ReactiveForms");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](2, "form", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](3, "rxa-counter-display", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RxStateAndReactiveFormsCounterComponent_Template_button_click_4_listener() { return ctx.updateTicking.next({ isTicking: true }); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](5, " Start ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](6, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RxStateAndReactiveFormsCounterComponent_Template_button_click_6_listener() { return ctx.updateTicking.next({ isTicking: false }); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](7, " Pause ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](8, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RxStateAndReactiveFormsCounterComponent_Template_button_click_8_listener() { return ctx.reset(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](9, " Reset ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](10, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](11, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RxStateAndReactiveFormsCounterComponent_Template_button_click_11_listener() { return ctx.btnSetTo.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](12, " Set To ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](13, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](14, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](15, "Count");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](16, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](17, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](18, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RxStateAndReactiveFormsCounterComponent_Template_button_click_18_listener() { return ctx.updateCountUp.next({ countUp: true }); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](19, " Count Up ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](20, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵlistener"]("click", function RxStateAndReactiveFormsCounterComponent_Template_button_click_20_listener() { return ctx.updateCountUp.next({ countUp: false }); });
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](21, " Count Down ");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](22, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](23, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](24, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](25, "Tick Speed");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](26, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](27, "mat-form-field");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementStart"](28, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵtext"](29, "CountDiff");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelement"](30, "input", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formGroup", ctx.counterForm);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("count$", ctx.count$);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControlName", "count");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControlName", "tickSpeed");
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵproperty"]("formControlName", "countDiff");
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_3__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormGroupDirective"], _shared_counter_display_component__WEBPACK_IMPORTED_MODULE_9__["CounterDisplayComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButton"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_11__["MatFormField"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NumberValueAccessor"], _angular_material_input__WEBPACK_IMPORTED_MODULE_12__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlName"]], encapsulation: 2 });


/***/ })

}]);
//# sourceMappingURL=rx-state-and-reactive-forms-rx-state-and-reactive-forms-module.js.map