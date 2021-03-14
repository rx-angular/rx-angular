(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["comparison-comparison-module"],{

/***/ "IWNs":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/strategies/comparison/comparison.routes.ts ***!
  \*****************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _comparison_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./comparison.component */ "cqsQ");

const ROUTES = [
    {
        path: '',
        component: _comparison_component__WEBPACK_IMPORTED_MODULE_0__["ComparisonComponent"]
    }
];


/***/ }),

/***/ "WASh":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/strategies/comparison/comparison.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: ComparisonModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparisonModule", function() { return ComparisonModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _comparison_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./comparison.component */ "cqsQ");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _shared_template_structures_sibling_sibling_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../shared/template-structures/sibling/sibling.module */ "AAm+");
/* harmony import */ var _shared_image_array_image_array_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../shared/image-array/image-array.module */ "LXRa");
/* harmony import */ var _comparison_routes__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./comparison.routes */ "IWNs");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../rx-angular-pocs */ "caVP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ "fXoL");
















class ComparisonModule {
}
ComparisonModule.ɵfac = function ComparisonModule_Factory(t) { return new (t || ComparisonModule)(); };
ComparisonModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineNgModule"]({ type: ComparisonModule });
ComparisonModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_comparison_routes__WEBPACK_IMPORTED_MODULE_12__["ROUTES"]),
            _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_9__["VisualizerModule"],
            _shared_template_structures_sibling_sibling_module__WEBPACK_IMPORTED_MODULE_10__["SiblingModule"],
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
            _shared_image_array_image_array_module__WEBPACK_IMPORTED_MODULE_11__["ImageArrayModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_13__["RxLetModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_13__["RxForModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_13__["RxIfModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_13__["PipeModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_14__["ɵɵsetNgModuleScope"](ComparisonModule, { declarations: [_comparison_component__WEBPACK_IMPORTED_MODULE_4__["ComparisonComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_9__["VisualizerModule"],
        _shared_template_structures_sibling_sibling_module__WEBPACK_IMPORTED_MODULE_10__["SiblingModule"],
        _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInputModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
        _shared_image_array_image_array_module__WEBPACK_IMPORTED_MODULE_11__["ImageArrayModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_13__["RxLetModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_13__["RxForModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_13__["RxIfModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_13__["PipeModule"]] }); })();


/***/ }),

/***/ "cqsQ":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/strategies/comparison/comparison.component.ts ***!
  \********************************************************************************************/
/*! exports provided: ComparisonComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ComparisonComponent", function() { return ComparisonComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");
/* harmony import */ var _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/for/rx-for.directive */ "LriG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _rx_angular_pocs_template_directives_if_rx_if_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/if/rx-if.directive */ "Dq9L");
/* harmony import */ var _shared_template_structures_sibling_sibling_strategy_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../shared/template-structures/sibling/sibling-strategy.component */ "mK68");















function ComparisonComponent_input_9_Template(rf, ctx) { if (rf & 1) {
    const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "input", 12, 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("input", function ComparisonComponent_input_9_Template_input_input_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r6); const _r4 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](1); const ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r5.count$.next(_r4.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const count_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("value", count_r3);
} }
function ComparisonComponent_mat_checkbox_14_Template(rf, ctx) { if (rf & 1) {
    const _r10 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "mat-checkbox", 14, 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("change", function ComparisonComponent_mat_checkbox_14_Template_mat_checkbox_change_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵrestoreView"](_r10); const strategy_r7 = ctx.$implicit; const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](1); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"](); return ctx_r9.setStrategy(strategy_r7.name, _r8.checked); });
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const strategy_r7 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("checked", strategy_r7.checked);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" ", strategy_r7.name, " ");
} }
function ComparisonComponent_ng_container_16_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "h2", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](3, "rxa-sibling-strategy", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const strategy_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]().$implicit;
    const ctx_r12 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](strategy_r11.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("strategy", strategy_r11.name)("count", ctx_r12.count$)("filled", ctx_r12.filled$);
} }
function ComparisonComponent_ng_container_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](1, ComparisonComponent_ng_container_16_div_1_Template, 4, 4, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const strategy_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rxIf", strategy_r11.checked)("rxIfStrategy", "immediate");
} }
class ComparisonComponent {
    constructor(strategyProvider) {
        this.strategyProvider = strategyProvider;
        this.selectedStrategies$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](
        /*this.strategyProvider.strategyNames.reduce((selectedStrategies, strategy) => {
          selectedStrategies[strategy] = true;
          return selectedStrategies;
        }, {})*/ {});
        this.strategies$ = this.selectedStrategies$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((selectedStrategies) => this.strategyProvider.strategyNames.map(strategy => ({ name: strategy, checked: selectedStrategies[strategy] || false }))));
        this.count$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('500');
        this.filled$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
        this.trackByStrategyName = (idx, v) => v.name;
    }
    setStrategy(strategy, state) {
        const old = this.selectedStrategies$.getValue();
        this.selectedStrategies$.next(Object.assign(Object.assign({}, old), { [strategy]: state }));
    }
    visible(choice) {
        return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])((s) => s[choice] === true));
    }
}
ComparisonComponent.ɵfac = function ComparisonComponent_Factory(t) { return new (t || ComparisonComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"])); };
ComparisonComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ComparisonComponent, selectors: [["rxa-concurrent-strategies"]], decls: 17, vars: 6, consts: [["visualizerHeader", ""], [1, "mat-headline"], [1, "row"], [1, "col-12", "d-flex"], [1, "mr-2"], ["matInput", "", "type", "number", 3, "unpatch", "value", "input", 4, "rxLet"], ["mat-button", "", "unpatch", "", 3, "click"], [1, "col-12"], [1, "w-100", "strategy-multiselect"], [3, "checked", "change", 4, "rxFor", "rxForOf", "rxForTrackBy"], [1, "row", "w-100"], [4, "rxFor", "rxForOf", "rxForStrategy", "rxForTrackBy"], ["matInput", "", "type", "number", 3, "unpatch", "value", "input"], ["i", ""], [3, "checked", "change"], ["c", ""], ["class", "col d-flex flex-column", 4, "rxIf", "rxIfStrategy"], [1, "col", "d-flex", "flex-column"], [1, "mat-subheader"], [3, "strategy", "count", "filled"]], template: function ComparisonComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Strategy Comparison");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](6, "mat-form-field", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "mat-label");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](8, "Num Siblings");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, ComparisonComponent_input_9_Template, 2, 1, "input", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](10, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ComparisonComponent_Template_button_click_10_listener() { return ctx.filled$.next(!ctx.filled$.getValue()); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](11, " do change ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](12, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](13, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](14, ComparisonComponent_mat_checkbox_14_Template, 3, 2, "mat-checkbox", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](15, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](16, ComparisonComponent_ng_container_16_Template, 2, 2, "ng-container", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rxLet", ctx.count$);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rxForOf", ctx.strategies$)("rxForTrackBy", ctx.trackByStrategyName);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rxForOf", ctx.strategies$)("rxForStrategy", "immediate")("rxForTrackBy", ctx.trackByStrategyName);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_4__["VisualizerComponent"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_5__["MatLabel"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_6__["RxLet"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_8__["UnpatchEventsDirective"], _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_9__["RxFor"], _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInput"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_11__["MatCheckbox"], _rx_angular_pocs_template_directives_if_rx_if_directive__WEBPACK_IMPORTED_MODULE_12__["RxIf"], _shared_template_structures_sibling_sibling_strategy_component__WEBPACK_IMPORTED_MODULE_13__["SiblingStrategyComponent"]], styles: [".strategy-multiselect[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n    }\n\n    .strategy-multiselect[_ngcontent-%COMP%]   .mat-checkbox[_ngcontent-%COMP%] {\n      flex-grow: 1;\n      width: 200px;\n    }"], changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=comparison-comparison-module.js.map