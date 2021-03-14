(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["stateful-stateful-module"],{

/***/ "UW/r":
/*!*******************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/decorators/stateful/stateful.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: StatefulComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatefulComponent", function() { return StatefulComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_pocs_cdk_decorators_stateful__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../rx-angular-pocs/cdk/decorators/stateful */ "yvEk");
/* harmony import */ var _shared_debug_helper_value_provider_array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/array-provider/array-provider.component */ "vvYH");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/for/rx-for.directive */ "LriG");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "ofXK");








const _c0 = function (a0) { return { background: a0 }; };
function StatefulComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 6);
} if (rf & 2) {
    const a_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, a_r2.color));
} }
class StatefulComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        Object(_rx_angular_pocs_cdk_decorators_stateful__WEBPACK_IMPORTED_MODULE_1__["renderOnChange"])(this, ['siblings'], {
            cdRef
        });
    }
    trackSibling(i, s) {
        return s.id;
    }
    ngOnInit() {
        this.test = 'test';
        // this.siblings = [];
    }
    ngAfterViewInit() {
        this.dataService.array$.subscribe(arr => {
            this.siblings = arr.map(sibling => (Object.assign(Object.assign({}, sibling), { color: this.color(sibling.value) })));
        });
    }
    color(a) {
        return '#' + Math.floor(a * 16777215).toString(16);
    }
    update() {
        this.test = (Math.random() * 1000).toString();
    }
}
StatefulComponent.ɵfac = function StatefulComponent_Factory(t) { return new (t || StatefulComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
StatefulComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: StatefulComponent, selectors: [["rxa-stateful"]], viewQuery: function StatefulComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_shared_debug_helper_value_provider_array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_2__["ArrayProviderComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.dataService = _t.first);
    } }, decls: 9, vars: 3, consts: [["visualizerHeader", "", 1, "row"], [1, "col-sm-12"], [3, "unpatched", "buttons"], ["arrayP", "rxaArrayProvider"], [1, "d-flex", "flex-wrap", "w-100"], ["class", "sibling", 3, "ngStyle", 4, "rxFor", "rxForOf", "rxForTrackBy"], [1, "sibling", 3, "ngStyle"]], template: function StatefulComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "RxFor with static values");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "rxa-array-provider", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, StatefulComponent_div_8_Template, 1, 3, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("buttons", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxForOf", ctx.siblings)("rxForTrackBy", ctx.trackSibling);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _shared_debug_helper_value_provider_array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_2__["ArrayProviderComponent"], _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_4__["RxFor"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgStyle"]], styles: [".sibling[_ngcontent-%COMP%] {\n        position: relative;\n        width: 8px;\n        height: 8px;\n        margin: 0 2px 2px 0;\n        padding: 0px;\n\n        outline: 1px solid mistyrose;\n        background-color: transparent;\n      }"], changeDetection: 0 });


/***/ }),

/***/ "mVc4":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/experiments/decorators/stateful/stateful.module.ts ***!
  \****************************************************************************************/
/*! exports provided: StatefulModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StatefulModule", function() { return StatefulModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rx_angular_pocs_template_directives_for_rx_for_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/for/rx-for.module */ "v1iz");
/* harmony import */ var _rx_angular_pocs_template_directives_unpatch_unpatch_events_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.module */ "+iFM");
/* harmony import */ var _shared_debug_helper_value_provider_value_providers_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/value-providers.module */ "aUMF");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer.module */ "RtHe");
/* harmony import */ var _stateful_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./stateful.component */ "UW/r");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");









const routes = [{
        path: '',
        component: _stateful_component__WEBPACK_IMPORTED_MODULE_6__["StatefulComponent"]
    }];
class StatefulModule {
}
StatefulModule.ɵfac = function StatefulModule_Factory(t) { return new (t || StatefulModule)(); };
StatefulModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: StatefulModule });
StatefulModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes),
            _rx_angular_pocs_template_directives_unpatch_unpatch_events_module__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
            _rx_angular_pocs_template_directives_for_rx_for_module__WEBPACK_IMPORTED_MODULE_2__["RxForModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _shared_debug_helper_value_provider_value_providers_module__WEBPACK_IMPORTED_MODULE_4__["ValueProvidersModule"],
            _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_5__["VisualizerModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](StatefulModule, { declarations: [_stateful_component__WEBPACK_IMPORTED_MODULE_6__["StatefulComponent"]], imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _rx_angular_pocs_template_directives_unpatch_unpatch_events_module__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
        _rx_angular_pocs_template_directives_for_rx_for_module__WEBPACK_IMPORTED_MODULE_2__["RxForModule"],
        _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _shared_debug_helper_value_provider_value_providers_module__WEBPACK_IMPORTED_MODULE_4__["ValueProvidersModule"],
        _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_5__["VisualizerModule"]] }); })();


/***/ })

}]);
//# sourceMappingURL=stateful-stateful-module.js.map