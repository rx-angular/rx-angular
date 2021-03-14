(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pipe-poc-pipe-poc-module"],{

/***/ "FIzo":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/pipes/pipe-poc/pipe-poc.module.ts ***!
  \********************************************************************************/
/*! exports provided: PipePocModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipePocModule", function() { return PipePocModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _rx_angular_pocs_template_pipes_pipe_pipe_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/pipes/pipe/pipe.module */ "CapS");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _pipe_poc_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pipe-poc.component */ "knRG");
/* harmony import */ var _pipe_poc_routes__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pipe-poc.routes */ "uveb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ "fXoL");










const DECLARATIONS = [_pipe_poc_component__WEBPACK_IMPORTED_MODULE_6__["PipePocComponent"]];
class PipePocModule {
}
PipePocModule.ɵfac = function PipePocModule_Factory(t) { return new (t || PipePocModule)(); };
PipePocModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineNgModule"]({ type: PipePocModule });
PipePocModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(_pipe_poc_routes__WEBPACK_IMPORTED_MODULE_7__["ROUTES"]),
            _rx_angular_pocs_template_pipes_pipe_pipe_module__WEBPACK_IMPORTED_MODULE_4__["PipeModule"],
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_5__["DirtyChecksModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_8__["ɵɵsetNgModuleScope"](PipePocModule, { declarations: [_pipe_poc_component__WEBPACK_IMPORTED_MODULE_6__["PipePocComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"], _rx_angular_pocs_template_pipes_pipe_pipe_module__WEBPACK_IMPORTED_MODULE_4__["PipeModule"],
        _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_5__["DirtyChecksModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_1__["MatButtonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["UnpatchEventsModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["PushModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_3__["LetModule"]], exports: [_pipe_poc_component__WEBPACK_IMPORTED_MODULE_6__["PipePocComponent"]] }); })();


/***/ }),

/***/ "knRG":
/*!***********************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/pipes/pipe-poc/pipe-poc.component.ts ***!
  \***********************************************************************************/
/*! exports provided: PipePocComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PipePocComponent", function() { return PipePocComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");
/* harmony import */ var _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks/dirty-checks.component */ "qnLR");
/* harmony import */ var _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/let/let.directive */ "cihl");
/* harmony import */ var _libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/push/push.pipe */ "duzR");
/* harmony import */ var _rx_angular_pocs_template_pipes_pipe_pipe_pipe__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/pipes/pipe/pipe.pipe */ "9EiU");









function PipePocComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
} if (rf & 2) {
    const value_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", value_r1, "");
} }
class PipePocComponent {
    constructor() {
        this.updateClick = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.value$ = this.updateClick.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => Math.ceil(Math.random() * 100)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(console.log));
        this.toRandom = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(() => Math.random()));
        this.debounce350 = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["debounceTime"])(350));
        this.toInterval = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["pipe"])(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["switchMapTo"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["interval"])(1000)));
    }
}
PipePocComponent.ɵfac = function PipePocComponent_Factory(t) { return new (t || PipePocComponent)(); };
PipePocComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: PipePocComponent, selectors: [["rxa-push-basic-example"]], decls: 25, vars: 16, consts: [[1, "row", "mb-2"], [1, "col"], ["mat-raised-button", "", "unpatch", "", 3, "click"], [1, "row"], [1, "col-4"], [1, "mat-headline"], [4, "rxLet"]], template: function PipePocComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function PipePocComponent_Template_button_click_2_listener() { return ctx.updateClick.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, "Update");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](4, "rxa-dirty-check");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " toRandom ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](11, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](12, "pipe");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](15, " debounce350 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, PipePocComponent_div_16_Template, 2, 1, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](17, "pipe");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](18, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](19, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](20, " toInterval ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](21, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](22);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](23, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](24, "pipe");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](11, 3, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](12, 5, ctx.value$, ctx.toRandom)), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("rxLet", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](17, 8, ctx.value$, ctx.debounce350));
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind1"](23, 11, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](24, 13, ctx.value$, ctx.toInterval)), "");
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsDirective"], _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_5__["DirtyChecksComponent"], _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_6__["LetDirective"]], pipes: [_libs_template_src_lib_push_push_pipe__WEBPACK_IMPORTED_MODULE_7__["PushPipe"], _rx_angular_pocs_template_pipes_pipe_pipe_pipe__WEBPACK_IMPORTED_MODULE_8__["PipePipe"]], styles: [""], changeDetection: 0 });


/***/ }),

/***/ "uveb":
/*!********************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/pipes/pipe-poc/pipe-poc.routes.ts ***!
  \********************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _pipe_poc_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pipe-poc.component */ "knRG");

const ROUTES = [
    {
        path: '',
        component: _pipe_poc_component__WEBPACK_IMPORTED_MODULE_0__["PipePocComponent"]
    }
];


/***/ })

}]);
//# sourceMappingURL=pipe-poc-pipe-poc-module.js.map