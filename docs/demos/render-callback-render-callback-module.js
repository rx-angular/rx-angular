(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["render-callback-render-callback-module"],{

/***/ "1uAJ":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/render-callback/render-callback.module.ts ***!
  \****************************************************************************************/
/*! exports provided: RenderCallbackModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderCallbackModule", function() { return RenderCallbackModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material/divider */ "f0Cb");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/progress-spinner */ "Xa2L");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _shared_debug_helper_dirty_checks_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/debug-helper/dirty-checks/index */ "v95w");
/* harmony import */ var _render_callback_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./render-callback.component */ "eaYv");
/* harmony import */ var _render_callback_routes__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./render-callback.routes */ "RJDu");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../rx-angular-pocs */ "caVP");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ "fXoL");












class RenderCallbackModule {
}
RenderCallbackModule.ɵfac = function RenderCallbackModule_Factory(t) { return new (t || RenderCallbackModule)(); };
RenderCallbackModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineNgModule"]({ type: RenderCallbackModule });
RenderCallbackModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(_render_callback_routes__WEBPACK_IMPORTED_MODULE_6__["RENDER_CALLBACK_ROUTES"]),
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"],
            _shared_debug_helper_dirty_checks_index__WEBPACK_IMPORTED_MODULE_4__["DirtyChecksModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__["UnpatchEventsModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__["PushModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__["RxLetModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_10__["ɵɵsetNgModuleScope"](RenderCallbackModule, { declarations: [_render_callback_component__WEBPACK_IMPORTED_MODULE_5__["RenderCallbackComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_2__["MatProgressSpinnerModule"],
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_1__["MatDividerModule"],
        _shared_debug_helper_dirty_checks_index__WEBPACK_IMPORTED_MODULE_4__["DirtyChecksModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__["UnpatchEventsModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__["PushModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__["RxLetModule"]] }); })();


/***/ }),

/***/ "RJDu":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/render-callback/render-callback.routes.ts ***!
  \****************************************************************************************/
/*! exports provided: RENDER_CALLBACK_ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RENDER_CALLBACK_ROUTES", function() { return RENDER_CALLBACK_ROUTES; });
/* harmony import */ var _render_callback_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./render-callback.component */ "eaYv");

const RENDER_CALLBACK_ROUTES = [
    {
        path: '',
        component: _render_callback_component__WEBPACK_IMPORTED_MODULE_0__["RenderCallbackComponent"],
    },
];


/***/ }),

/***/ "eaYv":
/*!*******************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/render-callback/render-callback.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: RenderCallbackComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RenderCallbackComponent", function() { return RenderCallbackComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _rx_angular_pocs_template_pipes_push_push_pipe__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../rx-angular-pocs/template/pipes/push/push.pipe */ "eYr4");








function RenderCallbackComponent_ng_container_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const content_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", content_r1, " ");
} }
class RenderCallbackComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        this.afterViewInit$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.rendered$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.updateClick = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.content$ = this.updateClick.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(false), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["scan"])(a => !a, false), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(b => b ? sentence() : paragraph()), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])({ bufferSize: 1, refCount: true }));
        this.calculatedAfterRender$ = this.afterViewInit$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(() => this.rendered$), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(() => this.box.getBoundingClientRect().height));
        // afterViewInit$ is needed, otherwise the ViewChild would not be ready
        this.calculatedAfterValue$ = this.afterViewInit$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMapTo"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["concat"])(this.rendered$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)), this.content$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(() => this.box.getBoundingClientRect().height)))));
    }
    get box() {
        if (!this._box) {
            this._box = document.getElementById('box');
        }
        return this._box;
    }
    reset() {
        this.cdRef.detectChanges();
    }
    ngAfterViewInit() {
        this.afterViewInit$.next();
        this.reset();
    }
}
RenderCallbackComponent.ɵfac = function RenderCallbackComponent_Factory(t) { return new (t || RenderCallbackComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
RenderCallbackComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RenderCallbackComponent, selectors: [["rxa-render-callback"]], decls: 23, vars: 9, consts: [[1, "mat-header"], [1, "mat-subheader"], ["mat-raised-button", "", 3, "unpatch", "click"], [1, "example-results"], [1, "example-result"], [1, "example-value", "p-4"], [4, "rxLet", "rxLetStrategy", "rxLetRenderCallback"], ["id", "box", 1, "example-box"]], template: function RenderCallbackComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h1", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Render Callback");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h4", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Height calculation using rendered$ Event");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RenderCallbackComponent_Template_button_click_4_listener() { return ctx.updateClick.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Update content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Calculated after renderCallback");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](12, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Calculated after value changed");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "strong");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](18, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Value");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, RenderCallbackComponent_ng_container_22_Template, 3, 1, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](12, 5, ctx.calculatedAfterRender$) + "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](18, 7, ctx.calculatedAfterValue$) + "px");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx.content$)("rxLetStrategy", "chunk")("rxLetRenderCallback", ctx.rendered$);
    } }, directives: [_angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButton"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_4__["UnpatchEventsDirective"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_5__["RxLet"]], pipes: [_rx_angular_pocs_template_pipes_push_push_pipe__WEBPACK_IMPORTED_MODULE_6__["PushPipe"]], styles: [".example-value[_ngcontent-%COMP%] {\n        width: 400px;\n        max-height: 500px;\n        overflow: auto;\n      }\n\n      .example-results[_ngcontent-%COMP%] {\n        display: flex;\n        width: 100%;\n        justify-content: space-evenly;\n        margin-bottom: 3rem;\n      }\n\n      .example-result[_ngcontent-%COMP%] {\n        flex-grow: 1;\n      }\n\n      .example-box[_ngcontent-%COMP%] {\n        display: flex;\n        justify-content: center;\n        align-items: center;\n        width: 300px;\n        outline: 1px solid red;\n      }"], changeDetection: 0 });
function sentence() {
    return text(3, 12);
}
function paragraph() {
    return text(35, 102);
}
function text(min, max) {
    return 'Lorem Ipsum '.repeat(Math.ceil(Math.max(min, Math.random() * max)));
}


/***/ })

}]);
//# sourceMappingURL=render-callback-render-callback-module.js.map