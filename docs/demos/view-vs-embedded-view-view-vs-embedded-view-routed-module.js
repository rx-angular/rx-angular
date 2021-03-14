(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["view-vs-embedded-view-view-vs-embedded-view-routed-module"],{

/***/ "5EWD":
/*!*******************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/view-vs-embedded-view/view-vs-embedded-view.component.ts ***!
  \*******************************************************************************************************/
/*! exports provided: ViewVsEmbeddedViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewVsEmbeddedViewComponent", function() { return ViewVsEmbeddedViewComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");
/* harmony import */ var _original_let_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./original-let.directive */ "mi9+");
/* harmony import */ var _poc1_let_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./poc1-let.directive */ "NEiu");








function ViewVsEmbeddedViewComponent_ng_container_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "rxa-visualizer");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const value_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", value_r2, " ");
} }
function ViewVsEmbeddedViewComponent_ng_container_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "rxa-visualizer", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const value_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("viewType", "embedded-view");
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", value_r3, " ");
} }
class ViewVsEmbeddedViewComponent {
    constructor() {
        this.btn1Click$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.btn2Click$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.value1$ = this.btn1Click$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])(a => ++a, 0));
        this.value2$ = this.btn2Click$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["scan"])(a => ++a, 0));
    }
}
ViewVsEmbeddedViewComponent.ɵfac = function ViewVsEmbeddedViewComponent_Factory(t) { return new (t || ViewVsEmbeddedViewComponent)(); };
ViewVsEmbeddedViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: ViewVsEmbeddedViewComponent, selectors: [["rxa-cd-embedded-view-parent01"]], decls: 18, vars: 2, consts: [["visualizerHeader", ""], ["mat-raised-button", "", 3, "unpatch", "click"], [1, "row", "w-100"], [1, "col-sm-6"], [4, "oLet"], [4, "poc1Let"], [3, "viewType"]], template: function ViewVsEmbeddedViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](3, " Component Template vs Embedded View ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ViewVsEmbeddedViewComponent_Template_button_click_5_listener($event) { return ctx.btn2Click$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, " Directive cdRef#detectChanges ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function ViewVsEmbeddedViewComponent_Template_button_click_7_listener($event) { return ctx.btn1Click$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " EmbeddedView cdRef#detectChanges ");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](11, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](12, "*rxLet Directive cdRef#detectChanges");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](13, ViewVsEmbeddedViewComponent_ng_container_13_Template, 3, 1, "ng-container", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](15, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](16, "*rxLet EmbeddedView cdRef#detectChanges");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, ViewVsEmbeddedViewComponent_ng_container_17_Template, 3, 2, "ng-container", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](13);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("oLet", ctx.value2$);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("poc1Let", ctx.value1$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_3__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_5__["UnpatchEventsDirective"], _original_let_directive__WEBPACK_IMPORTED_MODULE_6__["OriginalLetDirective"], _poc1_let_directive__WEBPACK_IMPORTED_MODULE_7__["Poc1LetDirective"]], encapsulation: 2 });


/***/ }),

/***/ "NEiu":
/*!******************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/view-vs-embedded-view/poc1-let.directive.ts ***!
  \******************************************************************************************/
/*! exports provided: Poc1LetDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Poc1LetDirective", function() { return Poc1LetDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");




class Poc1LetDirective {
    constructor(cdRef, nextTemplateRef, viewContainerRef) {
        this.cdRef = cdRef;
        this.nextTemplateRef = nextTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.observables$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this.viewContext = { $implicit: undefined };
        this.values$ = this.observables$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchAll"])());
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
    }
    set poc1Let(potentialObservable) {
        this.observables$.next(potentialObservable);
    }
    ngOnInit() {
        this.embeddedView = this.viewContainerRef.createEmbeddedView(this.nextTemplateRef, this.viewContext);
        this.subscription = this.values$
            .subscribe(v => {
            this.viewContext.$implicit = v;
            this.embeddedView.detectChanges();
        });
    }
    ngOnDestroy() {
        this.embeddedView.destroy();
        this.subscription.unsubscribe();
    }
}
Poc1LetDirective.ɵfac = function Poc1LetDirective_Factory(t) { return new (t || Poc1LetDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])); };
Poc1LetDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: Poc1LetDirective, selectors: [["", "poc1Let", ""]], inputs: { poc1Let: "poc1Let" } });


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

/***/ "k5b7":
/*!****************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/view-vs-embedded-view/view-vs-embedded-view.routes.ts ***!
  \****************************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _view_vs_embedded_view_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-vs-embedded-view.component */ "5EWD");

const ROUTES = [
    {
        path: '',
        component: _view_vs_embedded_view_component__WEBPACK_IMPORTED_MODULE_0__["ViewVsEmbeddedViewComponent"]
    }
];


/***/ }),

/***/ "mSXM":
/*!***********************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/view-vs-embedded-view/view-vs-embedded-view.routed.module.ts ***!
  \***********************************************************************************************************/
/*! exports provided: ViewVsEmbeddedViewRoutedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewVsEmbeddedViewRoutedModule", function() { return ViewVsEmbeddedViewRoutedModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _view_vs_embedded_view_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view-vs-embedded-view.routes */ "k5b7");
/* harmony import */ var _view_vs_embedded_view_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view-vs-embedded-view.module */ "r7u/");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class ViewVsEmbeddedViewRoutedModule {
}
ViewVsEmbeddedViewRoutedModule.ɵfac = function ViewVsEmbeddedViewRoutedModule_Factory(t) { return new (t || ViewVsEmbeddedViewRoutedModule)(); };
ViewVsEmbeddedViewRoutedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: ViewVsEmbeddedViewRoutedModule });
ViewVsEmbeddedViewRoutedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _view_vs_embedded_view_module__WEBPACK_IMPORTED_MODULE_2__["ViewVsEmbeddedViewModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(_view_vs_embedded_view_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"])
        ], _view_vs_embedded_view_module__WEBPACK_IMPORTED_MODULE_2__["ViewVsEmbeddedViewModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](ViewVsEmbeddedViewRoutedModule, { imports: [_view_vs_embedded_view_module__WEBPACK_IMPORTED_MODULE_2__["ViewVsEmbeddedViewModule"], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_view_vs_embedded_view_module__WEBPACK_IMPORTED_MODULE_2__["ViewVsEmbeddedViewModule"]] }); })();


/***/ }),

/***/ "mi9+":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/view-vs-embedded-view/original-let.directive.ts ***!
  \**********************************************************************************************/
/*! exports provided: OriginalLetDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OriginalLetDirective", function() { return OriginalLetDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");




class OriginalLetDirective {
    constructor(cdRef, nextTemplateRef, viewContainerRef) {
        this.cdRef = cdRef;
        this.nextTemplateRef = nextTemplateRef;
        this.viewContainerRef = viewContainerRef;
        this.observables$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this.viewContext = { $implicit: undefined };
        this.values$ = this.observables$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchAll"])());
        this.subscription = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subscription"]();
    }
    set oLet(potentialObservable) {
        this.observables$.next(potentialObservable);
    }
    ngOnInit() {
        this.embeddedView = this.viewContainerRef.createEmbeddedView(this.nextTemplateRef, this.viewContext);
        this.subscription = this.values$
            .subscribe(v => {
            this.viewContext.$implicit = v;
            this.cdRef.detectChanges();
        });
    }
    ngOnDestroy() {
        this.embeddedView.destroy();
        this.subscription.unsubscribe();
    }
}
OriginalLetDirective.ɵfac = function OriginalLetDirective_Factory(t) { return new (t || OriginalLetDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])); };
OriginalLetDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: OriginalLetDirective, selectors: [["", "oLet", ""]], inputs: { oLet: "oLet" } });


/***/ }),

/***/ "r7u/":
/*!****************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/view-vs-embedded-view/view-vs-embedded-view.module.ts ***!
  \****************************************************************************************************/
/*! exports provided: ViewVsEmbeddedViewModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewVsEmbeddedViewModule", function() { return ViewVsEmbeddedViewModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _original_let_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./original-let.directive */ "mi9+");
/* harmony import */ var _poc1_let_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./poc1-let.directive */ "NEiu");
/* harmony import */ var _view_vs_embedded_view_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view-vs-embedded-view.component */ "5EWD");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ "fXoL");








class ViewVsEmbeddedViewModule {
}
ViewVsEmbeddedViewModule.ɵfac = function ViewVsEmbeddedViewModule_Factory(t) { return new (t || ViewVsEmbeddedViewModule)(); };
ViewVsEmbeddedViewModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineNgModule"]({ type: ViewVsEmbeddedViewModule });
ViewVsEmbeddedViewModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_4__["VisualizerModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__["UnpatchEventsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_7__["ɵɵsetNgModuleScope"](ViewVsEmbeddedViewModule, { declarations: [_original_let_directive__WEBPACK_IMPORTED_MODULE_1__["OriginalLetDirective"],
        _poc1_let_directive__WEBPACK_IMPORTED_MODULE_2__["Poc1LetDirective"],
        _view_vs_embedded_view_component__WEBPACK_IMPORTED_MODULE_3__["ViewVsEmbeddedViewComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_4__["VisualizerModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__["UnpatchEventsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"]], exports: [_poc1_let_directive__WEBPACK_IMPORTED_MODULE_2__["Poc1LetDirective"]] }); })();


/***/ })

}]);
//# sourceMappingURL=view-vs-embedded-view-view-vs-embedded-view-routed-module.js.map