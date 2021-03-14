(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["nested-lists-nested-lists-routed-module"],{

/***/ "+cgW":
/*!************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/nested-lists/nested-lists.routed.module.ts ***!
  \************************************************************************************************/
/*! exports provided: NestedListsRoutedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestedListsRoutedModule", function() { return NestedListsRoutedModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _nested_lists_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nested-lists.routes */ "puIo");
/* harmony import */ var _nested_lists_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./nested-lists.module */ "bBEN");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");





class NestedListsRoutedModule {
}
NestedListsRoutedModule.ɵfac = function NestedListsRoutedModule_Factory(t) { return new (t || NestedListsRoutedModule)(); };
NestedListsRoutedModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineNgModule"]({ type: NestedListsRoutedModule });
NestedListsRoutedModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineInjector"]({ imports: [[
            _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(_nested_lists_routes__WEBPACK_IMPORTED_MODULE_1__["ROUTES"]),
            _nested_lists_module__WEBPACK_IMPORTED_MODULE_2__["NestedListsModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsetNgModuleScope"](NestedListsRoutedModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"], _nested_lists_module__WEBPACK_IMPORTED_MODULE_2__["NestedListsModule"]] }); })();


/***/ }),

/***/ "7Dfg":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/nested-lists/nested-lists.component.ts ***!
  \********************************************************************************************/
/*! exports provided: RxForNestedListsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxForNestedListsComponent", function() { return RxForNestedListsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "StYM");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/experimental/unpatch/events/unpatch-events.experimental.directive */ "QZMm");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _rx_for_value_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./rx-for-value.component */ "Lm2D");
/* harmony import */ var _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/for/rx-for.directive */ "LriG");
/* harmony import */ var _shared_debug_helper_strategy_select_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../shared/debug-helper/strategy-select/strategy-select/strategy-select.component */ "zFhl");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks/dirty-checks.component */ "qnLR");



















const _c0 = ["spanChild"];
function RxForNestedListsComponent_p_5_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Rows");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "input", 7, 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function RxForNestedListsComponent_p_5_Template_input_input_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](5); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.set({ rows: +_r5.value }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-form-field");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Columns");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "input", 7, 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("input", function RxForNestedListsComponent_p_5_Template_input_input_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const _r6 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](10); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.set({ columns: +_r6.value }); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const table_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", (table_r4 == null ? null : table_r4.rows) + "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", (table_r4 == null ? null : table_r4.columns) + "");
} }
function RxForNestedListsComponent_div_16_rxa_visualizer_10_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "rxa-rx-for-value", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const i_r13 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", i_r13);
} }
function RxForNestedListsComponent_div_16_rxa_visualizer_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, RxForNestedListsComponent_div_16_rxa_visualizer_10_ng_container_1_Template, 2, 1, "ng-container", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const value_r11 = ctx.$implicit;
    const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", value_r11.arr)("ngForTrackBy", ctx_r10.trackById);
} }
function RxForNestedListsComponent_div_16_Template(rf, ctx) { if (rf & 1) {
    const _r15 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "*ngFor");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RxForNestedListsComponent_div_16_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r14 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r14.changeOneClick$.next(1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " update ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RxForNestedListsComponent_div_16_Template_button_click_6_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r16 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r16.changeAllClick$.next(10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Change all ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RxForNestedListsComponent_div_16_Template_button_click_8_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r15); const ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r17.toggleIntervalClick$.next(10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " toggle interval ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, RxForNestedListsComponent_div_16_rxa_visualizer_10_Template, 2, 2, "rxa-visualizer", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](11, "async");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r2 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](11, 2, ctx_r2.array$))("ngForTrackBy", ctx_r2.trackById);
} }
const _c1 = function () { return ["strategyChange"]; };
function RxForNestedListsComponent_div_17_p_3_Template(rf, ctx) { if (rf & 1) {
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RxForNestedListsComponent_div_17_p_3_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const ctx_r21 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r21.changeOneClick$.next(1); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, " update ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RxForNestedListsComponent_div_17_p_3_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const t_r20 = ctx.$implicit; const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r23.changeAllClick$.next(t_r20.changes); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " Change many ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function RxForNestedListsComponent_div_17_p_3_Template_button_click_5_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const ctx_r24 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r24.toggleIntervalClick$.next(10); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, " toggle interval ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "rxa-strategy-select", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("strategyChange", function RxForNestedListsComponent_div_17_p_3_Template_rxa_strategy_select_strategyChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r22); const ctx_r25 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r25.strategy$.next($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("unpatch", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](1, _c1));
} }
const _c2 = function (a0, a1) { return { red: a0, green: a1 }; };
function RxForNestedListsComponent_div_17_rxa_visualizer_4_ng_container_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "rxa-dirty-check");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const o_r32 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction2"](2, _c2, !o_r32, o_r32));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", o_r32 ? "check" : "highlight_off", " ");
} }
const _c3 = function () { return ["arr"]; };
function RxForNestedListsComponent_div_17_rxa_visualizer_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "span", null, 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, RxForNestedListsComponent_div_17_rxa_visualizer_4_ng_container_3_Template, 4, 5, "ng-container", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const select_r29 = ctx.select;
    const ctx_r19 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxFor", select_r29(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](3, _c3)))("rxForStrategy", ctx_r19.strategy$)("rxForTrackBy", ctx_r19.trackById);
} }
function RxForNestedListsComponent_div_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "*rxFor");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, RxForNestedListsComponent_div_17_p_3_Template, 8, 2, "p", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, RxForNestedListsComponent_div_17_rxa_visualizer_4_Template, 4, 4, "rxa-visualizer", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx_r3.table$)("rxLetPatchZone", true);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxForOf", ctx_r3.array$)("rxForStrategy", ctx_r3.strategy$)("rxForTrackBy", ctx_r3.trackById)("rxForParent", true)("rxForRenderCallback", ctx_r3.childrenRendered$);
} }
class RxForNestedListsComponent extends _rx_angular_state__WEBPACK_IMPORTED_MODULE_3__["RxState"] {
    constructor() {
        super();
        this.tK = 'id';
        this.displayStates = {
            none: -1,
            all: 0,
            native: 1,
            nativeReactive: 2,
            rxAngularReactive: 3,
            rxAngularReactive2: 4,
            rxAngularMinimalReactive: 5,
        };
        this.childrenRendered = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.numChildrenRendered = 0;
        this.childrenRendered$ = this.childrenRendered
            .pipe();
        this.childrenRendered2 = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.numChildrenRendered2 = 0;
        this.childrenRendered2$ = this.childrenRendered2.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["tap"])((v) => console.log('rcb2', v)));
        this.table$ = this.select();
        this.strategy$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.changeOneClick$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.changeAllClick$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.toggleIntervalClick$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.changesFromTick$ = this.toggleIntervalClick$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["scan"])((a) => !a, false), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])((b) => (b ? Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["interval"])(100) : rxjs__WEBPACK_IMPORTED_MODULE_1__["EMPTY"])));
        this.array$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([this.changeOneClick$, this.table$]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(([_, { rows, columns }]) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["immutableArr"])(rows, columns)(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(1)))), Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["combineLatest"])([
            Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["merge"])(this.changesFromTick$, this.changeAllClick$),
            this.table$
        ]).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchMap"])(([_, { rows, columns, changes }]) => Object(_utils__WEBPACK_IMPORTED_MODULE_4__["immutableArr"])(rows, columns)(Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(rows))))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        this.load$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](0);
        this.trackById = (i, v) => v.id;
        this.dK = (a, b) => a.value === b.value;
        this.set({ columns: 5, rows: 10 });
    }
    ngAfterViewInit() {
        this.hold(this.spanChildren.changes, console.log);
    }
}
RxForNestedListsComponent.ɵfac = function RxForNestedListsComponent_Factory(t) { return new (t || RxForNestedListsComponent)(); };
RxForNestedListsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: RxForNestedListsComponent, selectors: [["rxa-rx-for-nested-lists"]], viewQuery: function RxForNestedListsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.spanChildren = _t);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 18, vars: 7, consts: [["visualizerHeader", ""], [4, "rxLet"], ["name", "visibleExamples", "aria-label", "Visible Examples", 3, "value"], ["group", "matButtonToggleGroup"], [3, "value"], [1, "row", "w-100"], ["class", "col", 4, "ngIf"], ["matInput", "", "min", "1", "type", "number", "unpatch", "", 3, "value", "input"], ["r", ""], ["c", ""], [1, "col"], ["mat-raised-button", "", 3, "click"], ["viewType", "embedded-view", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["viewType", "embedded-view"], [4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "rxLet", "rxLetPatchZone"], ["viewType", "embedded-view", 4, "rxFor", "rxForOf", "rxForStrategy", "rxForTrackBy", "rxForParent", "rxForRenderCallback"], ["mat-raised-button", "", 3, "unpatch", "click"], [3, "unpatch", "strategyChange"], ["spanChild", ""], [4, "rxFor", "rxForStrategy", "rxForTrackBy"], [1, "item", 3, "ngClass"]], template: function RxForNestedListsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Nested Lists");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, RxForNestedListsComponent_p_5_Template, 11, 2, "p", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-button-toggle-group", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "*ngFor");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "*rxFor ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-button-toggle", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "All");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "br");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, RxForNestedListsComponent_div_16_Template, 12, 4, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, RxForNestedListsComponent_div_17_Template, 5, 7, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx.table$);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.displayStates.native);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.displayStates.rxAngularReactive2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r1.value === ctx.displayStates.native || _r1.value === ctx.displayStates.all);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", _r1.value === ctx.displayStates.rxAngularReactive2 || _r1.value === ctx.displayStates.all);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_5__["VisualizerComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_6__["RxLet"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__["MatButtonToggleGroup"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_7__["MatButtonToggle"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInput"], _libs_template_src_lib_experimental_unpatch_events_unpatch_events_experimental_directive__WEBPACK_IMPORTED_MODULE_11__["UnpatchEventsDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgForOf"], _rx_for_value_component__WEBPACK_IMPORTED_MODULE_13__["RxForValueComponent"], _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_14__["RxFor"], _shared_debug_helper_strategy_select_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_15__["StrategySelectComponent"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_16__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgClass"], _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_17__["DirtyChecksComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_8__["AsyncPipe"]], encapsulation: 2 });


/***/ }),

/***/ "DJi3":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/index.ts ***!
  \************************************************************************/
/*! exports provided: compareIdFn, withCompleteAndError, toTick, toInt, toRandom, toBoolean, toImgUrl, toRandomItems, toNewItems, getRandomItems, getRandomRecords, getItems, updateItemMutable, updateItemImmutable, addItemMutable, addItemImmutable, moveItemMutable, moveItemImmutable, moveItemsImmutable, shuffleItemsImmutable, removeItemsMutable, removeItemsImmutable, GliphyApi, placeholderImg, SchedulingPriority, PrimitivesProviderService, ArrayProviderService, ValueProviderComponent, ValueProvidersModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "eXvN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "compareIdFn", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["compareIdFn"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "withCompleteAndError", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["withCompleteAndError"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toTick", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toTick"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toInt", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toInt"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRandom", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toRandom"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toBoolean", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toBoolean"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toImgUrl", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toImgUrl"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toRandomItems", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toRandomItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "toNewItems", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["toNewItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomItems", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getRandomItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getRandomRecords", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getRandomRecords"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "getItems", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["getItems"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateItemMutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["updateItemMutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "updateItemImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["updateItemImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addItemMutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["addItemMutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "addItemImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["addItemImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "moveItemMutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["moveItemMutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "moveItemImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["moveItemImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "moveItemsImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["moveItemsImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "shuffleItemsImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["shuffleItemsImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeItemsMutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["removeItemsMutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "removeItemsImmutable", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["removeItemsImmutable"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GliphyApi", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["GliphyApi"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "placeholderImg", function() { return _utils__WEBPACK_IMPORTED_MODULE_0__["placeholderImg"]; });

/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "V6pN");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "SchedulingPriority", function() { return _model__WEBPACK_IMPORTED_MODULE_1__["SchedulingPriority"]; });

/* harmony import */ var _primitives_provider_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./primitives-provider.service */ "pvtS");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "PrimitivesProviderService", function() { return _primitives_provider_service__WEBPACK_IMPORTED_MODULE_2__["PrimitivesProviderService"]; });

/* harmony import */ var _array_provider_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./array-provider.service */ "AjVs");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ArrayProviderService", function() { return _array_provider_service__WEBPACK_IMPORTED_MODULE_3__["ArrayProviderService"]; });

/* harmony import */ var _value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./value-provider/value-provider.component */ "eHQV");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueProviderComponent", function() { return _value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_4__["ValueProviderComponent"]; });

/* harmony import */ var _value_providers_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./value-providers.module */ "aUMF");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ValueProvidersModule", function() { return _value_providers_module__WEBPACK_IMPORTED_MODULE_5__["ValueProvidersModule"]; });









/***/ }),

/***/ "Lm2D":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/nested-lists/rx-for-value.component.ts ***!
  \********************************************************************************************/
/*! exports provided: RxForValueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxForValueComponent", function() { return RxForValueComponent; });
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider */ "DJi3");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks/dirty-checks.component */ "qnLR");










const _c0 = function (a0, a1) { return { red: a0, green: a1 }; };
function RxForValueComponent_ng_container_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementStart"](1, "mat-icon", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelement"](3, "rxa-dirty-check");
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const v_r1 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵpureFunction2"](2, _c0, !v_r1, v_r1));
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtextInterpolate1"](" ", v_r1 ? "check" : "highlight_off", " ");
} }
class RxForValueComponent {
    constructor(state) {
        this.state = state;
        this.value$ = this.state.select(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(s => Object(_shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_3__["toBoolean"])(s.item.value, 0.5)));
    }
    set value(o) {
        this.state.connect('item', Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["isObservable"])(o) ? o : Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(o));
    }
}
RxForValueComponent.ɵfac = function RxForValueComponent_Factory(t) { return new (t || RxForValueComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"])); };
RxForValueComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵdefineComponent"]({ type: RxForValueComponent, selectors: [["rxa-rx-for-value"]], hostAttrs: [1, "d-flex", "justify-content-center", "align-items-center", "flex-column", "w-100", "m-1", "p-1", "dh-embedded-view"], inputs: { value: "value", strategy$: "strategy$" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵProvidersFeature"]([_rx_angular_state__WEBPACK_IMPORTED_MODULE_0__["RxState"]])], decls: 1, vars: 2, consts: [[4, "rxLet", "rxLetStrategy"], [1, "item", 3, "ngClass"]], template: function RxForValueComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵtemplate"](0, RxForValueComponent_ng_container_0_Template, 4, 5, "ng-container", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_4__["ɵɵproperty"]("rxLet", ctx.value$)("rxLetStrategy", ctx.strategy$);
    } }, directives: [_rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_5__["RxLet"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_6__["MatIcon"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgClass"], _shared_debug_helper_dirty_checks_dirty_checks_component__WEBPACK_IMPORTED_MODULE_8__["DirtyChecksComponent"]], styles: [".item.red[_ngcontent-%COMP%] {\n      color: red;\n    }\n    .item.green[_ngcontent-%COMP%] {\n      color: green;\n    }\n    .value.number[_ngcontent-%COMP%] {\n    }\n    .value.string[_ngcontent-%COMP%] {\n    }\n    .value.object[_ngcontent-%COMP%] {\n    }\n    .value.array[_ngcontent-%COMP%] {\n    }"], changeDetection: 0 });


/***/ }),

/***/ "MOG2":
/*!*********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/nested-lists/rx-for-normal.directive.ts ***!
  \*********************************************************************************************/
/*! exports provided: RxForNormal */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxForNormal", function() { return RxForNormal; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "kU1M");






class RxForNormal {
    constructor(strategyProvider, cdRef, templateRef, viewContainerRef, iterableDiffers) {
        this.strategyProvider = strategyProvider;
        this.cdRef = cdRef;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.iterableDiffers = iterableDiffers;
        this.differ = null;
        this.observables$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["ReplaySubject"](1);
        this.strategies = this.strategyProvider.strategies;
        this.values$ = this.observables$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["shareReplay"])({ refCount: true, bufferSize: 1 }));
        this.sub = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subscription"]();
        this.rxForDistinctBy = (a, b) => a.value === b.value;
    }
    set rxForNormal(potentialObservable) {
        this._rxFor = potentialObservable;
        this.observables$.next(potentialObservable);
    }
    set rxForNormalOf(potentialObservable) {
        this._rxFor = potentialObservable;
        this.observables$.next(potentialObservable);
    }
    set renderCallback(renderCallback) {
        this._renderCallback = renderCallback;
    }
    set strategy(strategy) {
        this._strategy = strategy;
    }
    get strategy() {
        return this._strategy || this.strategyProvider.primaryStrategy;
    }
    set rxForNormalTrackBy(fn) {
        this._trackByFn = fn;
    }
    /**
     * Asserts the correct type of the context for the template that `NgForOf` will render.
     *
     * The presence of this method is a signal to the Ivy template type-check compiler that the
     * `NgForOf` structural directive renders its template with a specific context type.
     */
    static ngTemplateContextGuard(dir, ctx) {
        return true;
    }
    initDiffer(iterable = []) {
        this.differ = this.iterableDiffers
            .find(iterable)
            .create(this._trackByFn);
    }
    ngOnInit() {
        this.sub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["concat"])(this.values$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(value => this.initDiffer(value || []))), this.values$)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(i => this.differ.diff(i)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["filter"])(diff => !!diff), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(diff => this.applyChanges(diff)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(e => {
            console.error(e);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(this === null || this === void 0 ? void 0 : this._renderCallback))
            .subscribe());
    }
    ngOnDestroy() {
        this.sub.unsubscribe();
        this.viewContainerRef.clear();
    }
    applyChanges(changes) {
        let detectParent = false;
        const behaviors$ = [];
        const strat = this.strategies[this.strategy];
        const insertMap = new Map();
        const scheduleInsert = (idx, ctx) => {
            if (!insertMap.has(idx)) {
                insertMap.set(idx, ctx);
                const insert = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
                const work = () => {
                    try {
                        const view = this.viewContainerRef.createEmbeddedView(this.templateRef, insertMap.get(idx), idx);
                        strat.work(view);
                    }
                    catch (e) {
                        // console.error(e);
                        // console.error('destroyed', this.destroyed);
                    }
                };
                this.sub.add(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null)
                    .pipe(strat.behavior(work, insertMap.get(idx)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1))
                    .subscribe(insert));
                behaviors$.push(insert);
            }
        };
        const updateMap = new WeakMap();
        const scheduleUpdate = (idx, update) => {
            const view = this.viewContainerRef.get(idx);
            if (view) {
                if (updateMap.has(view)) {
                    updateMap.get(view).push(update);
                    // update(updateMap.get(view));
                }
                else {
                    view.detach();
                    updateMap.set(view, [update]);
                    // detach the view so that the parent cd cycle does not render this view
                    const work = () => {
                        view.reattach();
                        updateMap.get(view).forEach(u => u(view.context));
                        strat.work(view);
                    };
                    behaviors$.push(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["of"])(null).pipe(strat.behavior(work, view), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(1)));
                }
            }
            else if (insertMap.has(idx)) {
                update(insertMap.get(idx));
            }
        };
        changes.forEachOperation((r, previousIndex, currentIndex) => {
            const idx = currentIndex == null ? undefined : currentIndex;
            // insert
            if (r.previousIndex == null) {
                const context = new _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxDefaultListViewContext"](r.item);
                // console.log('scheduleInsert', idx);
                scheduleInsert(idx, context);
                // the view got inserted, so the parent has to get notified about this change
                detectParent = true;
            }
            else if (currentIndex == null) {
                // remove
                const i = previousIndex === null ? undefined : previousIndex;
                if (this.viewContainerRef.get(i)) {
                    this.viewContainerRef.remove(i);
                    // a view got removed, notify parent about the change
                    detectParent = true;
                }
            }
            else if (previousIndex !== null) {
                // move
                const view = (this.viewContainerRef.get(previousIndex));
                this.viewContainerRef.move(view, idx);
                const $implicit = r.item;
                scheduleUpdate(idx, ctx => {
                    ctx.$implicit = $implicit;
                });
            }
        });
        // if views only had identityChanges, update the $implict value
        changes.forEachIdentityChange((record) => {
            const $implicit = record.item;
            scheduleUpdate(record.currentIndex, ctx => (ctx.$implicit = $implicit));
        });
        // update view contexts (index, count, odd/even and stuff)
        const count = this.viewContainerRef.length + insertMap.size;
        for (const [index] of insertMap.entries()) {
            const even = index % 2 === 0;
            const newCtx = {
                index,
                count,
                first: index === 0,
                last: index === count - 1,
                even,
                odd: !even
            };
            scheduleUpdate(index, ctx => {
                ctx.updateContext(newCtx);
            });
        }
        for (let index = 0; index < this.viewContainerRef.length; index++) {
            const even = index % 2 === 0;
            const newCtx = {
                index,
                count,
                first: index === 0,
                last: index === count - 1,
                even,
                odd: !even
            };
            scheduleUpdate(index, ctx => {
                ctx.updateContext(newCtx);
            });
        }
        if (detectParent) {
            Promise.resolve().then(() => {
                this.strategyProvider.scheduleCD(this.cdRef, {
                    afterCD: () => {
                        // console.log('parent notified');
                    },
                    strategy: this.strategy,
                    scope: this.cdRef.context
                });
            });
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["forkJoin"])(behaviors$);
    }
}
RxForNormal.ɵfac = function RxForNormal_Factory(t) { return new (t || RxForNormal)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["RxStrategyProvider"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"])); };
RxForNormal.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: RxForNormal, selectors: [["", "rxForNormal", ""]], inputs: { rxForNormal: "rxForNormal", rxForNormalOf: "rxForNormalOf", renderCallback: ["rxForNormalRenderCallback", "renderCallback"], strategy: ["rxForNormalStrategy", "strategy"], rxForNormalTrackBy: "rxForNormalTrackBy", rxForDistinctBy: "rxForDistinctBy" } });


/***/ }),

/***/ "StYM":
/*!***************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/nested-lists/utils.ts ***!
  \***************************************************************************/
/*! exports provided: rand, randArray, immutableIncArr, mutableIncArr, immutableArr, mutableArr */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rand", function() { return rand; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "randArray", function() { return randArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "immutableIncArr", function() { return immutableIncArr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutableIncArr", function() { return mutableIncArr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "immutableArr", function() { return immutableArr; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mutableArr", function() { return mutableArr; });
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider */ "DJi3");


const children1 = 10;
const children2 = 3;
const rand = (n = 2) => {
    // tslint:disable-next-line:no-bitwise
    return ~~(Math.random() * n);
};
const randArray = (items = children1) => {
    return Array(items).fill(0).map((_, idx) => ({ id: idx % items, value: rand() }));
};
const immutableIncArr = (rows = children1, columns = children2) => (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["scan"])((a, i, idx) => {
    const arr = randArray(children2);
    const value = rand(100);
    if (i === 1) {
        a[idx % rows] = { id: idx % rows, value, arr };
    }
    else if (i === 0) {
        const id = rand(1);
        a[id] = { id, value, arr };
    }
    else {
        a.splice(idx % rows, 1);
    }
    return a;
}, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["tap"])(console.log), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["share"])());
const mutableIncArr = (rows = children1, columns = children2) => {
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["scan"])((a, i, idx) => {
        const arr = randArray(children2);
        a[idx % rows].value = rand();
        a[idx % rows].arr = arr;
        return a;
    }, []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["share"])());
};
const immutableArr = (rows = children1, columns = children2) => (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(() => randArray(rows).map((r) => Object(_shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_1__["toInt"])(1) ? (Object.assign(Object.assign({}, r), { arr: randArray(columns) })) : r)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["share"])());
const mutableArr = (rows = children1, columns = children2) => {
    const arr = Array(rows);
    return (o$) => o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["map"])(v => arr.forEach((i, idx) => {
        i.value = rand();
        i.arr = randArray(children2);
    })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_0__["share"])());
};


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

/***/ "V6pN":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/shared/debug-helper/value-provider/model.ts ***!
  \************************************************************************/
/*! exports provided: SchedulingPriority */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SchedulingPriority", function() { return SchedulingPriority; });
var SchedulingPriority;
(function (SchedulingPriority) {
    SchedulingPriority[SchedulingPriority["sync"] = 0] = "sync";
    SchedulingPriority[SchedulingPriority["animationFrame"] = 1] = "animationFrame";
    SchedulingPriority[SchedulingPriority["Promise"] = 2] = "Promise";
    SchedulingPriority[SchedulingPriority["setTimeout"] = 3] = "setTimeout";
    SchedulingPriority[SchedulingPriority["setInterval"] = 4] = "setInterval";
    SchedulingPriority[SchedulingPriority["postMessage"] = 5] = "postMessage";
    SchedulingPriority[SchedulingPriority["idleCallback"] = 6] = "idleCallback";
    SchedulingPriority[SchedulingPriority["userBlocking"] = 7] = "userBlocking";
    SchedulingPriority[SchedulingPriority["userVisible"] = 8] = "userVisible";
    SchedulingPriority[SchedulingPriority["background"] = 9] = "background";
})(SchedulingPriority || (SchedulingPriority = {}));


/***/ }),

/***/ "bBEN":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/nested-lists/nested-lists.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: NestedListsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NestedListsModule", function() { return NestedListsModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _shared_debug_helper_work__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/debug-helper/work */ "6sZn");
/* harmony import */ var _nested_lists_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./nested-lists.component */ "7Dfg");
/* harmony import */ var _rx_for_minimal_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./rx-for-minimal.directive */ "y59q");
/* harmony import */ var _rx_for_value_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rx-for-value.component */ "Lm2D");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../shared/debug-helper/strategy-select */ "eakK");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../rx-angular-pocs */ "caVP");
/* harmony import */ var _rx_for_normal_directive__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./rx-for-normal.directive */ "MOG2");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ "fXoL");

















const DECLARATIONS = [
    _nested_lists_component__WEBPACK_IMPORTED_MODULE_6__["RxForNestedListsComponent"],
    _rx_for_minimal_directive__WEBPACK_IMPORTED_MODULE_7__["RxMinimalForOf"],
    _rx_for_normal_directive__WEBPACK_IMPORTED_MODULE_15__["RxForNormal"],
    _rx_for_value_component__WEBPACK_IMPORTED_MODULE_8__["RxForValueComponent"]
];
class NestedListsModule {
}
NestedListsModule.ɵfac = function NestedListsModule_Factory(t) { return new (t || NestedListsModule)(); };
NestedListsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({ type: NestedListsModule });
NestedListsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["UnpatchEventsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_4__["DirtyChecksModule"],
            _shared_debug_helper_work__WEBPACK_IMPORTED_MODULE_5__["ValueModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_9__["MatButtonToggleModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_14__["RxLetModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_14__["RxForModule"],
            _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_13__["StrategySelectModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_14__["PushModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](NestedListsModule, { declarations: [_nested_lists_component__WEBPACK_IMPORTED_MODULE_6__["RxForNestedListsComponent"],
        _rx_for_minimal_directive__WEBPACK_IMPORTED_MODULE_7__["RxMinimalForOf"],
        _rx_for_normal_directive__WEBPACK_IMPORTED_MODULE_15__["RxForNormal"],
        _rx_for_value_component__WEBPACK_IMPORTED_MODULE_8__["RxForValueComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_1__["VisualizerModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_2__["UnpatchEventsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_3__["MatButtonModule"],
        _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_4__["DirtyChecksModule"],
        _shared_debug_helper_work__WEBPACK_IMPORTED_MODULE_5__["ValueModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_9__["MatButtonToggleModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_10__["MatFormFieldModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_12__["MatIconModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_14__["RxLetModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_14__["RxForModule"],
        _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_13__["StrategySelectModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_14__["PushModule"]], exports: [_nested_lists_component__WEBPACK_IMPORTED_MODULE_6__["RxForNestedListsComponent"],
        _rx_for_minimal_directive__WEBPACK_IMPORTED_MODULE_7__["RxMinimalForOf"],
        _rx_for_normal_directive__WEBPACK_IMPORTED_MODULE_15__["RxForNormal"],
        _rx_for_value_component__WEBPACK_IMPORTED_MODULE_8__["RxForValueComponent"]] }); })();


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

/***/ "puIo":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/nested-lists/nested-lists.routes.ts ***!
  \*****************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _nested_lists_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nested-lists.component */ "7Dfg");

const ROUTES = [
    {
        path: '',
        component: _nested_lists_component__WEBPACK_IMPORTED_MODULE_0__["RxForNestedListsComponent"]
    }
];


/***/ }),

/***/ "y59q":
/*!**********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/nested-lists/rx-for-minimal.directive.ts ***!
  \**********************************************************************************************/
/*! exports provided: RxForViewContext, RxMinimalForOf */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxForViewContext", function() { return RxForViewContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RxMinimalForOf", function() { return RxMinimalForOf; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shared_rx_effects_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/rx-effects.service */ "+Gkt");






class RxForViewContext {
    constructor(_$implicit, rxFor, distinctBy = (a, b) => a === b) {
        this._$implicit = _$implicit;
        this.rxFor = rxFor;
        this.distinctBy = distinctBy;
        this._record = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this._record$ = this._record.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(this.distinctBy), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["share"])());
        this._index = new rxjs__WEBPACK_IMPORTED_MODULE_1__["BehaviorSubject"](-1);
        this.select = (props) => {
            return this._record$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["pluck"])(...props));
        };
        // tslint:disable-next-line:no-unused-expression
        this._record.next(_$implicit);
    }
    set index(index) {
        this._index.next(index);
    }
    set $implicit(record) {
        this._implicit = record;
        this._record.next(record);
    }
    get $implicit() {
        return this._implicit;
    }
    get record$() {
        return this._record$;
    }
}
class RxMinimalForOf {
    constructor(rxEffects, cdRef, templateRef, viewContainerRef, iterableDiffers) {
        this.rxEffects = rxEffects;
        this.cdRef = cdRef;
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.iterableDiffers = iterableDiffers;
        this.evMap = new Map();
        this.differ = null;
        this.observables$ = new rxjs__WEBPACK_IMPORTED_MODULE_1__["ReplaySubject"](1);
        this.values$ = this.observables$
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["switchAll"])());
        this.records$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["defer"])(() => this.values$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeMap"])(arr => arr), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["groupBy"])(r => r[this._rxTrackBy]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["scan"])((records, o$) => (Object.assign(Object.assign({}, records), { [o$.key]: o$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["distinctUntilChanged"])(this.rxMinimalForDistinctBy)) })), {}), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])({ refCount: true, bufferSize: 1 })));
        this._rxTrackBy = 'id';
        this.rxMinimalForDistinctBy = (a, b) => a.value === b.value;
    }
    set rxMinimalFor(potentialObservable) {
        this.observables$.next(potentialObservable);
    }
    set rxMinimalForOf(potentialObservable) {
        this.observables$.next(potentialObservable);
    }
    set rxMinimalForTrackBy(key) {
        if (key) {
            this._rxTrackBy = key;
        }
        else {
            this._rxTrackBy = 'id';
        }
    }
    initDiffer(iterable = []) {
        this.differ = this.iterableDiffers.find(iterable).create((index, item) => item[this._rxTrackBy]);
        this.rxEffects.hold(this.values$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["startWith"])(iterable), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(i => ({ diff: this.differ.diff(i), iterable: i })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(r => r.diff != null), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["shareReplay"])(1)), (r) => this.applyChanges(r.diff, r.iterable));
    }
    ngOnInit() {
        this.rxEffects.hold(this.values$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["take"])(1)), (value) => this.initDiffer(value));
    }
    ngOnDestroy() {
        this.viewContainerRef.clear();
    }
    applyChanges(changes, iterable) {
        changes.forEachOperation((r, previousIndex, currentIndex) => {
            const idx = currentIndex == null ? undefined : currentIndex;
            const recordId = r.item[this._rxTrackBy];
            const name = 'rxNext';
            const evName = name + recordId;
            // enter
            if (r.previousIndex == null) {
                const evc = new RxForViewContext(r.item, iterable, this.rxMinimalForDistinctBy);
                const view = this.viewContainerRef
                    .createEmbeddedView(this.templateRef, evc, idx);
                this.evMap.set(evName, view);
                view.detectChanges();
            }
            else if (currentIndex == null) {
                this.viewContainerRef.remove(previousIndex === null ? undefined : previousIndex);
            }
            else if (previousIndex !== null) {
                const view = this.viewContainerRef.get(previousIndex);
                this.viewContainerRef.move(view, idx);
                view.context.$implicit = r.item;
            }
        });
        changes.forEachIdentityChange((record) => {
            const viewRef = this.viewContainerRef.get(record.currentIndex);
            viewRef.context.$implicit = record.item;
        });
        /*
         // behavior like *ngFor
         const tuplesToDetectChanges: RecordViewTuple<T, U>[] = [];
         // TODO: dig into `IterableDiffer`
         changes.forEachOperation(
         (
         changeRecord: IterableChangeRecord<T>,
         previousIndex: number | null,
         currentIndex: number | null
         ) => {
         const id = changeRecord.item[this._rxTrackBy];
         // Insert
         if (changeRecord.previousIndex == null) {
         const evName = 'rxNext' + id;
         // this is basically the first run
         // create the embedded view for each value with default values
         this.templateManager.displayView('rxNext', id);
         tuplesToDetectChanges.push({
         view: this.templateManager.getEmbeddedView(evName),
         record: changeRecord
         });
    
         } else if (currentIndex == null) {
    
         this.viewContainerRef.remove(
         previousIndex === null ? undefined : previousIndex);
    
         } else if (previousIndex !== null) {
    
         const view = <EmbeddedViewRef<RxForViewContext<T, U>>>this.viewContainerRef.get(previousIndex);
         this.viewContainerRef.move(view, currentIndex);
         tuplesToDetectChanges.push({
         view,
         record: changeRecord
         });
         }
         });
    
         for (let i = 0; i < tuplesToDetectChanges.length; i++) {
         this._perViewChange(tuplesToDetectChanges[i].view, tuplesToDetectChanges[i].record);
         }
    
         for (let index = 0, count = this.viewContainerRef.length; index < count; index++) {
         this.templateManager.updateViewContext({
         index, count,
         rxFor: iterable,
         record$: this.records$.pipe(map(records => records[this._rxTrackBy]))
         });
    
         }
    
         changes.forEachIdentityChange((record: IterableChangeRecord<T>) => {
         const viewRef =
         <EmbeddedViewRef<RxForViewContext<T, U>>>this.viewContainerRef.get(record.currentIndex);
         viewRef.context.$implicit = record.item;
         viewRef.detectChanges();
         });
    
         */
    }
    _perViewChange(view, record) {
        view.context.$implicit = record.item;
        view.detectChanges();
    }
}
RxMinimalForOf.ɵfac = function RxMinimalForOf_Factory(t) { return new (t || RxMinimalForOf)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_rx_effects_service__WEBPACK_IMPORTED_MODULE_3__["RxEffects"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["IterableDiffers"])); };
RxMinimalForOf.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: RxMinimalForOf, selectors: [["", "rxMinimalFor", ""]], inputs: { rxMinimalFor: "rxMinimalFor", rxMinimalForOf: "rxMinimalForOf", rxMinimalForDistinctBy: "rxMinimalForDistinctBy", rxMinimalForTrackBy: "rxMinimalForTrackBy" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_shared_rx_effects_service__WEBPACK_IMPORTED_MODULE_3__["RxEffects"]])] });


/***/ })

}]);
//# sourceMappingURL=nested-lists-nested-lists-routed-module.js.map