(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["basic-rx-let-basic-module"],{

/***/ "ROTI":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/debug/dirty-check/dirty-checks.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: DirtyChecksModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirtyChecksModule", function() { return DirtyChecksModule; });
/* harmony import */ var _dirty_checks_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dirty-checks.component */ "wPsG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



const DEPRECATIONS = [_dirty_checks_component__WEBPACK_IMPORTED_MODULE_0__["DirtyChecksComponent"]];
class DirtyChecksModule {
}
DirtyChecksModule.ɵfac = function DirtyChecksModule_Factory(t) { return new (t || DirtyChecksModule)(); };
DirtyChecksModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: DirtyChecksModule });
DirtyChecksModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](DirtyChecksModule, { declarations: [_dirty_checks_component__WEBPACK_IMPORTED_MODULE_0__["DirtyChecksComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]], exports: [_dirty_checks_component__WEBPACK_IMPORTED_MODULE_0__["DirtyChecksComponent"]] }); })();


/***/ }),

/***/ "gjIV":
/*!*************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/basic/rx-let-basic.component.ts ***!
  \*************************************************************************************/
/*! exports provided: RxLetBasicComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxLetBasicComponent", function() { return RxLetBasicComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_strategy_select_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/debug-helper/strategy-select/strategy-select/strategy-select.component */ "zFhl");
/* harmony import */ var _shared_debug_helper_value_provider_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/value-provider/value-provider.component */ "eHQV");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.directive */ "OyBQ");
/* harmony import */ var _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/let/let.directive */ "cihl");
/* harmony import */ var _rx_angular_pocs_cdk_debug_dirty_check_dirty_checks_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../rx-angular-pocs/cdk/debug/dirty-check/dirty-checks.component */ "wPsG");










function RxLetBasicComponent_strong_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const rendered_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"]("Rendercallback: ", rendered_r3, "");
} }
function RxLetBasicComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "rxa-dirty-check");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const value_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" Value: ", value_r4, " ");
} }
class RxLetBasicComponent {
    constructor() {
        this._renderCalled = 0;
        this.renderCallback = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.rendered$ = this.renderCallback.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => this._renderCalled++));
    }
}
RxLetBasicComponent.ɵfac = function RxLetBasicComponent_Factory(t) { return new (t || RxLetBasicComponent)(); };
RxLetBasicComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: RxLetBasicComponent, selectors: [["rxa-rx-let-poc"]], decls: 17, vars: 5, consts: [["visualizerHeader", ""], [3, "strategyChange"], [3, "buttons"], ["v", "rxaValueProvider"], ["mat-raised-button", "", 1, "mr-1", 3, "click"], ["mat-raised-button", "", 3, "unpatch", "click"], [1, "row", "w-100"], [1, "col-sm-3"], [4, "rxLet"], ["class", "dh-embedded-view", 4, "rxLet", "rxLetRenderCallback", "rxLetStrategy"], [1, "dh-embedded-view"]], template: function RxLetBasicComponent_Template(rf, ctx) { if (rf & 1) {
        const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "rxLet BASIC");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "rxa-strategy-select", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("strategyChange", function RxLetBasicComponent_Template_rxa_strategy_select_strategyChange_4_listener($event) { return ctx.strategy = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](5, "rxa-value-provider", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RxLetBasicComponent_Template_button_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](6); return _r0.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " toggle ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RxLetBasicComponent_Template_button_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r5); const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](6); return _r0.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10, " toggle (unpatched) ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](14, "RxLet");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](15, RxLetBasicComponent_strong_15_Template, 2, 1, "strong", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, RxLetBasicComponent_div_16_Template, 3, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("buttons", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("rxLet", ctx.rendered$);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("rxLet", _r0.incremental$)("rxLetRenderCallback", ctx.renderCallback)("rxLetStrategy", ctx.strategy);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _shared_debug_helper_strategy_select_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_4__["StrategySelectComponent"], _shared_debug_helper_value_provider_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_5__["ValueProviderComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButton"], _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_7__["UnpatchEventsDirective"], _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_8__["LetDirective"], _rx_angular_pocs_cdk_debug_dirty_check_dirty_checks_component__WEBPACK_IMPORTED_MODULE_9__["DirtyChecksComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "s6yb":
/*!**********************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/basic/rx-let-basic.module.ts ***!
  \**********************************************************************************/
/*! exports provided: RxLetBasicModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxLetBasicModule", function() { return RxLetBasicModule; });
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rx_angular_pocs_cdk_debug_dirty_check_dirty_checks_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../rx-angular-pocs/cdk/debug/dirty-check/dirty-checks.module */ "ROTI");
/* harmony import */ var _rx_angular_pocs_template_directives_unpatch_unpatch_events_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.module */ "+iFM");
/* harmony import */ var _shared_debug_helper_strategy_select_strategy_select_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/debug-helper/strategy-select/strategy-select.module */ "9oZ2");
/* harmony import */ var _shared_debug_helper_value_provider_value_providers_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/value-providers.module */ "aUMF");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer.module */ "RtHe");
/* harmony import */ var _rx_let_basic_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rx-let-basic.component */ "gjIV");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ "fXoL");











const routes = [
    {
        path: '',
        component: _rx_let_basic_component__WEBPACK_IMPORTED_MODULE_7__["RxLetBasicComponent"]
    }
];
class RxLetBasicModule {
}
RxLetBasicModule.ɵfac = function RxLetBasicModule_Factory(t) { return new (t || RxLetBasicModule)(); };
RxLetBasicModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineNgModule"]({ type: RxLetBasicModule });
RxLetBasicModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes),
            _rx_angular_pocs_cdk_debug_dirty_check_dirty_checks_module__WEBPACK_IMPORTED_MODULE_2__["DirtyChecksModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_0__["MatButtonModule"],
            _shared_debug_helper_value_provider_value_providers_module__WEBPACK_IMPORTED_MODULE_5__["ValueProvidersModule"],
            _rx_angular_pocs_template_directives_unpatch_unpatch_events_module__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
            _shared_debug_helper_strategy_select_strategy_select_module__WEBPACK_IMPORTED_MODULE_4__["StrategySelectModule"],
            _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_6__["VisualizerModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__["LetModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_9__["ɵɵsetNgModuleScope"](RxLetBasicModule, { declarations: [_rx_let_basic_component__WEBPACK_IMPORTED_MODULE_7__["RxLetBasicComponent"]], imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _rx_angular_pocs_cdk_debug_dirty_check_dirty_checks_module__WEBPACK_IMPORTED_MODULE_2__["DirtyChecksModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_0__["MatButtonModule"],
        _shared_debug_helper_value_provider_value_providers_module__WEBPACK_IMPORTED_MODULE_5__["ValueProvidersModule"],
        _rx_angular_pocs_template_directives_unpatch_unpatch_events_module__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
        _shared_debug_helper_strategy_select_strategy_select_module__WEBPACK_IMPORTED_MODULE_4__["StrategySelectModule"],
        _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_6__["VisualizerModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__["LetModule"]] }); })();


/***/ }),

/***/ "wPsG":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/rx-angular-pocs/cdk/debug/dirty-check/dirty-checks.component.ts ***!
  \********************************************************************************************/
/*! exports provided: DirtyChecksComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DirtyChecksComponent", function() { return DirtyChecksComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");


// tslint:disable
class DirtyChecksComponent {
    constructor(elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.dirtyChecks = 0;
    }
    ngAfterViewInit() {
        this.displayElem = this.elementRef.nativeElement.children[0].children[0];
        this.numDirtyChecks();
    }
    numDirtyChecks() {
        if (this.log) {
            console.log('dirtyCheck', this.log);
        }
        else {
        }
    }
}
DirtyChecksComponent.ɵfac = function DirtyChecksComponent_Factory(t) { return new (t || DirtyChecksComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"])); };
DirtyChecksComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DirtyChecksComponent, selectors: [["rxa-dirty-check"]], inputs: { log: "log" }, decls: 3, vars: 1, consts: [[1, "dirty-check"], [1, "indicator"]], template: function DirtyChecksComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.numDirtyChecks());
    } }, styles: ["[_nghost-%COMP%]   .indicator[_ngcontent-%COMP%] {\n        border: 1px solid #ffff005f;\n      }"] });


/***/ })

}]);
//# sourceMappingURL=basic-rx-let-basic-module.js.map