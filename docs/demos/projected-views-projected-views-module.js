(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["projected-views-projected-views-module"],{

/***/ "3K9R":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/projected-views/view-child.component.ts ***!
  \**************************************************************************************/
/*! exports provided: ViewChildComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewChildComponent", function() { return ViewChildComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _content_child_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content-child.component */ "oWrs");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");




const _c0 = ["*"];
class ViewChildComponent {
    constructor(cdRef) {
        this.cdRef = cdRef;
        this._renders = 0;
    }
    renders() {
        return this._renders++;
    }
    set cc(v) {
        console.log('ContentChild in ViewChildComponent of type ContentChildComponent: ', v);
    }
    ;
}
ViewChildComponent.ɵfac = function ViewChildComponent_Factory(t) { return new (t || ViewChildComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
ViewChildComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ViewChildComponent, selectors: [["rxa-view-child"]], contentQueries: function ViewChildComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _content_child_component__WEBPACK_IMPORTED_MODULE_1__["ContentChildComponent"], 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.cc = _t.first);
    } }, ngContentSelectors: _c0, decls: 4, vars: 0, consts: [["visualizerHeader", ""]], template: function ViewChildComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "ViewChild");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_2__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "4mWL":
/*!*******************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/projected-views/projected-views.component.ts ***!
  \*******************************************************************************************/
/*! exports provided: ProjectedViewsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectedViewsComponent", function() { return ProjectedViewsComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _content_child_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content-child.component */ "oWrs");
/* harmony import */ var _view_child_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view-child.component */ "3K9R");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");










const _c0 = ["test"];
function ProjectedViewsComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const renderCbVal_r2 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate1"](" renderCallback: ", renderCbVal_r2, " ");
} }
function ProjectedViewsComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "rxa-content-child");
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "div", null, 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
} if (rf & 2) {
    const value_r3 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtextInterpolate"](value_r3);
} }
const _c1 = function () { return ["click"]; };
class ProjectedViewsComponent {
    constructor() {
        this.trigger$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.renderCallback$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.triggerArr$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_0__["combineLatest"])([this.trigger$]);
    }
    set test(t) {
        console.log('ViewChild in ProjectedViewsComponent of type div', t);
    }
    set vcVc(v) {
        console.log('ViewChild in ProjectedViewsComponent of type ViewChildComponent: ', v);
    }
    set vcCc(v) {
        console.log('ViewChild in ProjectedViewsComponent of type ContentChildComponent: ', v);
    }
}
ProjectedViewsComponent.ɵfac = function ProjectedViewsComponent_Factory(t) { return new (t || ProjectedViewsComponent)(); };
ProjectedViewsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: ProjectedViewsComponent, selectors: [["rxa-projected-views"]], viewQuery: function ProjectedViewsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_view_child_component__WEBPACK_IMPORTED_MODULE_2__["ViewChildComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_content_child_component__WEBPACK_IMPORTED_MODULE_1__["ContentChildComponent"], 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.vcVc = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.vcCc = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵloadQuery"]()) && (ctx.test = _t);
    } }, decls: 11, vars: 9, consts: [["visualizerHeader", ""], ["mat-raised-button", "", 3, "unpatch", "click"], [4, "rxLet", "rxLetParent", "rxLetPatchZone"], [4, "rxLet", "rxLetRenderCallback", "rxLetParent", "rxLetPatchZone"], ["test", ""]], template: function ProjectedViewsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, "Parent");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function ProjectedViewsComponent_Template_button_click_4_listener($event) { return ctx.trigger$.next($event.timeStamp); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](5, " tick ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](6, " test1 ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](7, "rxa-view-child");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](8, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](9, ProjectedViewsComponent_div_9_Template, 2, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](10, ProjectedViewsComponent_div_10_Template, 5, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("unpatch", _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵpureFunction0"](8, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rxLet", ctx.renderCallback$)("rxLetParent", false)("rxLetPatchZone", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rxLet", ctx.trigger$)("rxLetRenderCallback", ctx.renderCallback$)("rxLetParent", true)("rxLetPatchZone", false);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_4__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_6__["UnpatchEventsDirective"], _view_child_component__WEBPACK_IMPORTED_MODULE_2__["ViewChildComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_7__["RxLet"], _content_child_component__WEBPACK_IMPORTED_MODULE_1__["ContentChildComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "PJPj":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/projected-views/projected-views.routes.ts ***!
  \****************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _projected_views_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projected-views.component */ "4mWL");

const ROUTES = [
    {
        path: '',
        component: _projected_views_component__WEBPACK_IMPORTED_MODULE_0__["ProjectedViewsComponent"]
    }
];


/***/ }),

/***/ "WTKJ":
/*!****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/projected-views/projected-views.module.ts ***!
  \****************************************************************************************/
/*! exports provided: ProjectedViewsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProjectedViewsModule", function() { return ProjectedViewsModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _shared_debug_helper_strategy_select_strategy_select_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../shared/debug-helper/strategy-select/strategy-select.module */ "9oZ2");
/* harmony import */ var _projected_views_routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./projected-views.routes */ "PJPj");
/* harmony import */ var _projected_views_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./projected-views.component */ "4mWL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer/visualizer.module */ "RtHe");
/* harmony import */ var _content_child_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./content-child.component */ "oWrs");
/* harmony import */ var _view_child_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view-child.component */ "3K9R");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../rx-angular-pocs */ "caVP");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");













class ProjectedViewsModule {
}
ProjectedViewsModule.ɵfac = function ProjectedViewsModule_Factory(t) { return new (t || ProjectedViewsModule)(); };
ProjectedViewsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: ProjectedViewsModule });
ProjectedViewsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_projected_views_routes__WEBPACK_IMPORTED_MODULE_4__["ROUTES"]),
            _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_6__["VisualizerModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["UnpatchEventsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__["RxLetModule"],
            _shared_debug_helper_strategy_select_strategy_select_module__WEBPACK_IMPORTED_MODULE_3__["StrategySelectModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__["RxForModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](ProjectedViewsModule, { declarations: [_projected_views_component__WEBPACK_IMPORTED_MODULE_5__["ProjectedViewsComponent"],
        _content_child_component__WEBPACK_IMPORTED_MODULE_7__["ContentChildComponent"],
        _view_child_component__WEBPACK_IMPORTED_MODULE_8__["ViewChildComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_6__["VisualizerModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["UnpatchEventsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__["RxLetModule"],
        _shared_debug_helper_strategy_select_strategy_select_module__WEBPACK_IMPORTED_MODULE_3__["StrategySelectModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_9__["RxForModule"]] }); })();


/***/ }),

/***/ "oWrs":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/concepts/projected-views/content-child.component.ts ***!
  \*****************************************************************************************/
/*! exports provided: ContentChildComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentChildComponent", function() { return ContentChildComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");


const _c0 = ["*"];
class ContentChildComponent {
}
ContentChildComponent.ɵfac = function ContentChildComponent_Factory(t) { return new (t || ContentChildComponent)(); };
ContentChildComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ContentChildComponent, selectors: [["rxa-content-child"]], ngContentSelectors: _c0, decls: 4, vars: 0, consts: [["visualizerHeader", ""]], template: function ContentChildComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojectionDef"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "ContentChild");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵprojection"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_1__["VisualizerComponent"]], encapsulation: 2, changeDetection: 0 });


/***/ })

}]);
//# sourceMappingURL=projected-views-projected-views-module.js.map