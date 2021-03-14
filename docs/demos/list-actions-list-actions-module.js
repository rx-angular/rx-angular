(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["list-actions-list-actions-module"],{

/***/ "7cnF":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/list-actions/list-actions.module.ts ***!
  \*****************************************************************************************/
/*! exports provided: ListActionsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListActionsModule", function() { return ListActionsModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "3Pt+");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _shared_debug_helper_value_provider_value_providers_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/value-providers.module */ "aUMF");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer.module */ "RtHe");
/* harmony import */ var _shared_template_structures_recursive_recursive_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/template-structures/recursive/recursive.module */ "J2SZ");
/* harmony import */ var _list_actions_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./list-actions.component */ "Bcrp");
/* harmony import */ var _list_actions_routes__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./list-actions.routes */ "liyW");
/* harmony import */ var _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../rx-angular-pocs */ "caVP");
/* harmony import */ var _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../shared/debug-helper/strategy-select */ "eakK");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/core */ "fXoL");



















const DECLARATIONS = [_list_actions_component__WEBPACK_IMPORTED_MODULE_13__["ListActionsComponent"]];
class ListActionsModule {
}
ListActionsModule.ɵfac = function ListActionsModule_Factory(t) { return new (t || ListActionsModule)(); };
ListActionsModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineNgModule"]({ type: ListActionsModule });
ListActionsModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"].forChild(_list_actions_routes__WEBPACK_IMPORTED_MODULE_14__["ROUTES"]),
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__["PushModule"],
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_9__["DirtyChecksModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__["UnpatchEventsModule"],
            _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_11__["VisualizerModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
            _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggleModule"],
            _shared_template_structures_recursive_recursive_module__WEBPACK_IMPORTED_MODULE_12__["RecursiveModule"],
            _shared_debug_helper_value_provider_value_providers_module__WEBPACK_IMPORTED_MODULE_10__["ValueProvidersModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
            _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_16__["StrategySelectModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_15__["RxLetModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_15__["RxForModule"],
            _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_15__["RxIfModule"],
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_17__["ɵɵsetNgModuleScope"](ListActionsModule, { declarations: [_list_actions_component__WEBPACK_IMPORTED_MODULE_13__["ListActionsComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"], _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__["PushModule"],
        _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_9__["DirtyChecksModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_2__["MatButtonModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_8__["UnpatchEventsModule"],
        _shared_debug_helper_visualizer_visualizer_module__WEBPACK_IMPORTED_MODULE_11__["VisualizerModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_4__["MatFormFieldModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormsModule"],
        _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_3__["MatButtonToggleModule"],
        _shared_template_structures_recursive_recursive_module__WEBPACK_IMPORTED_MODULE_12__["RecursiveModule"],
        _shared_debug_helper_value_provider_value_providers_module__WEBPACK_IMPORTED_MODULE_10__["ValueProvidersModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
        _shared_debug_helper_strategy_select__WEBPACK_IMPORTED_MODULE_16__["StrategySelectModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_15__["RxLetModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_15__["RxForModule"],
        _rx_angular_pocs__WEBPACK_IMPORTED_MODULE_15__["RxIfModule"]], exports: [_list_actions_component__WEBPACK_IMPORTED_MODULE_13__["ListActionsComponent"]] }); })();


/***/ }),

/***/ "Bcrp":
/*!********************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/list-actions/list-actions.component.ts ***!
  \********************************************************************************************/
/*! exports provided: ListActionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ListActionsComponent", function() { return ListActionsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @rx-angular/cdk */ "cDIL");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider */ "DJi3");
/* harmony import */ var _shared_debug_helper_value_provider_array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/array-provider/array-provider.component */ "vvYH");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");
/* harmony import */ var _shared_debug_helper_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/debug-helper/hooks */ "XoRM");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_debug_helper_strategy_select_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../shared/debug-helper/strategy-select/strategy-select/strategy-select.component */ "zFhl");
/* harmony import */ var _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/let/rx-let.directive */ "XklV");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/button-toggle */ "jaxi");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/for/rx-for.directive */ "LriG");


















const _c0 = ["arrayP"];
const _c1 = ["workChild"];
function ListActionsComponent_mat_button_toggle_group_8_Template(rf, ctx) { if (rf & 1) {
    const _r8 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-button-toggle-group", 10, 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-button-toggle", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ListActionsComponent_mat_button_toggle_group_8_Template_mat_button_toggle_click_2_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r7 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r7.view.next("tile"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Tile ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-button-toggle", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ListActionsComponent_mat_button_toggle_group_8_Template_mat_button_toggle_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r8); const ctx_r9 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r9.view.next("list"); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "List ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const viewMode_r5 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", viewMode_r5);
} }
function ListActionsComponent_p_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "strong");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Rendered");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const rendered_r10 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", rendered_r10, " ");
} }
const _c2 = function (a0) { return { color: a0 }; };
function ListActionsComponent_p_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const viewBroken_r11 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](2, _c2, viewBroken_r11 ? "red" : "green"));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("VIEW BROKEN ", viewBroken_r11, "");
} }
const _c3 = function (a0) { return { background: a0 }; };
function ListActionsComponent_div_18_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17, 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ListActionsComponent_div_18_div_1_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r23); const ctx_r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r22.clickMe(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "click me");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "small");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const a_r14 = ctx.$implicit;
    const index_r15 = ctx.index;
    const count_r16 = ctx.count;
    const even_r17 = ctx.even;
    const odd_r18 = ctx.odd;
    const first_r19 = ctx.first;
    const last_r20 = ctx.last;
    const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("even", even_r17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("title", a_r14.id + "_" + index_r15 + "_" + count_r16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](12, _c3, ctx_r13.color(a_r14)));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("id: ", a_r14.id, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("value: ", a_r14.value, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("index: ", index_r15, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("count: ", count_r16, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("even: ", even_r17, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("odd: ", odd_r18, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("first: ", first_r19, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("last: ", last_r20, "");
} }
function ListActionsComponent_div_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ListActionsComponent_div_18_div_1_Template, 22, 14, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const viewMode_r12 = ctx.$implicit;
    const ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("list-view", viewMode_r12 === "list");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxForOf", ctx_r4.data$)("rxForRenderCallback", ctx_r4.renderCallback)("rxForTrackBy", ctx_r4.trackById)("rxForStrategy", ctx_r4.strategy$);
} }
let itemIdx = 0;
function getNewItem() {
    const _idx = itemIdx;
    const i = { id: _idx, value: (itemIdx + 1) * 10 };
    ++itemIdx;
    return i;
}
function getItems(num) {
    return new Array(num).fill(null).map((_) => getNewItem());
}
const item0 = getNewItem();
const item1 = getNewItem();
const item2 = getNewItem();
const item3 = getNewItem();
const item4 = getNewItem();
const item5 = getNewItem();
const item6 = getNewItem();
const item7 = getNewItem();
const item8 = getNewItem();
const item9 = getNewItem();
const item10 = getNewItem();
const items10 = [
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
    item7,
    item8,
    item9,
    item10,
];
const items5 = getItems(500);
const items5k = getItems(10);
const firstItems5k = items5k[0];
const lastItems5k = items5k[249];
const items5kSwapped = [...items5k];
items5kSwapped[0] = lastItems5k;
items5kSwapped[249] = firstItems5k;
/*const customChangeSet = [
  [],
  // insert 0,1,2,3,4
  [item0, item1, item2, item3, ...items5],
  // unchanged 0, remove 1, update 2 => 2232, move 3,2
  [item0, item3, { ...item2, value: '2232' }, ...items5],
  [item0, item3, { ...item2, value: '2232' }],
  [],
  // insert 0,1,2,3,4
  [item0, item3, { ...item2, value: '2232' }, ...items5],
  // unchanged 0, remove 1, update 2 => 2232, move 3,2
  [item0, item1, item2, item3, ...items5],
  [item0, item3, { ...item2, value: '2232' }],
  [],
  // insert 0,1,2,3,4
  [item0, ...items5, item1, item2, item3],
  // unchanged 0, remove 1, update 2 => 2232, move 3,2
  [item0, item3, { ...item2, value: '2232' }, ...items5],
  [item0, item3, { ...item2, value: '2232' }],
];*/
/*
 [141, 8191, 8970]
 [8191, 141, 8970]
 [8191, 8970, 141]
 [141, 8970, 8191]
 */
// const items5k
const items5k2 = Object(_shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_3__["shuffleItemsImmutable"])(items5k);
const items5k3 = Object(_shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_3__["shuffleItemsImmutable"])(items5k2);
const items5k4 = Object(_shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_3__["shuffleItemsImmutable"])(items5k3);
const items5k5 = Object(_shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_3__["removeItemsImmutable"])(items5k4, 5);
// const items5k6 = removeItemsImmutable(items5k5, 10);
const customChangeSet = [
    // [],
    [
        item0,
        item1,
        item2,
        item3,
        item4,
    ],
    [
        item0,
        item4,
        item2,
        item3,
        item1,
    ] /*
    [
      item2, item4, item0, item3, item1,
      // item7, item1, item2, item4, item0
    ],*/,
    [
        item0,
        item1,
    ],
];
const moveChangeSet1 = [items5k];
class ListActionsComponent extends _shared_debug_helper_hooks__WEBPACK_IMPORTED_MODULE_6__["Hooks"] {
    constructor(state, cdRef) {
        super();
        this.state = state;
        this.cdRef = cdRef;
        this.numRendered = 0;
        this.view = new rxjs__WEBPACK_IMPORTED_MODULE_2__["BehaviorSubject"]('list');
        this.triggerChangeSet = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.activeChangeSet$ = this.triggerChangeSet.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMapTo"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["scheduled"])(customChangeSet, _rx_angular_cdk__WEBPACK_IMPORTED_MODULE_1__["asyncScheduler"])));
        this.triggerMoveSet = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.triggerMoveSetSwapped = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.activeMoveSet$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(this.triggerMoveSet.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(() => [items5k])), this.triggerMoveSetSwapped.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["switchMap"])(() => [items5kSwapped])));
        this.data$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["defer"])(() => Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["merge"])(this.arrayP.array$, this.activeChangeSet$, this.activeMoveSet$));
        this.renderCallback = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.rendered$ = this.renderCallback.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(() => ++this.numRendered));
        this.viewBroken$ = this.renderCallback.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_7__["map"])(() => {
            const children = Array.from(document.getElementsByClassName('work-child'));
            let broken = false;
            let i = 0;
            for (const child of children) {
                const even = i % 2 === 0;
                if ((even && !child.classList.contains('even')) ||
                    (!even && child.classList.contains('even'))) {
                    broken = true;
                    break;
                }
                i++;
            }
            return broken;
        }));
        this.strategy$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.customChangeSet = customChangeSet;
        this.customChangeSet$ = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        this.trackById = (idx, item) => {
            return item.id;
        };
        this.trackByIdFn = (a) => a.id;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        this.state.hold(this.workChildren.changes, (workChildren) => {
            // console.log('workChildren', this.workChildren.toArray());
        });
    }
    clickMe() {
        console.log('clicked me');
    }
    color(a) {
        return '#' + Math.floor(a.value * 16777215).toString(16);
    }
}
ListActionsComponent.ɵfac = function ListActionsComponent_Factory(t) { return new (t || ListActionsComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_5__["RxState"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
ListActionsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ListActionsComponent, selectors: [["rxa-rx-for-list-actions"]], viewQuery: function ListActionsComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 3, _shared_debug_helper_value_provider_array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_4__["ArrayProviderComponent"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.arrayP = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.workChildren = _t);
    } }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_3__["ArrayProviderService"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 19, vars: 5, consts: [["visualizerHeader", "", 1, "row"], [1, "col-sm-12"], [3, "unpatched", "buttons"], ["arrayP", "rxaArrayProvider"], [3, "strategyChange"], ["name", "visibleExamples", "aria-label", "Visible Examples", 3, "value", 4, "rxLet"], ["mat-raised-button", "", 3, "click"], [4, "rxLet"], [1, "d-flex", "flex-column", "justify-content-start", "w-100"], ["class", "work-container d-flex flex-wrap w-100", 3, "list-view", 4, "rxLet"], ["name", "visibleExamples", "aria-label", "Visible Examples", 3, "value"], ["group", "matButtonToggleGroup"], ["value", "tile", 3, "click"], ["value", "list", 3, "click"], [3, "ngStyle"], [1, "work-container", "d-flex", "flex-wrap", "w-100"], ["class", "work-child d-flex", 3, "title", "even", 4, "rxFor", "rxForOf", "rxForRenderCallback", "rxForTrackBy", "rxForStrategy"], [1, "work-child", "d-flex", 3, "title"], ["workChild", ""], [1, "child-bg", 3, "ngStyle"], [1, "child-context", "flex-column", "flex-wrap"], [3, "click"]], template: function ListActionsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "h2");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Reactive Iterable Differ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "rxa-array-provider", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "rxa-strategy-select", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("strategyChange", function ListActionsComponent_Template_rxa_strategy_select_strategyChange_7_listener($event) { return ctx.strategy$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, ListActionsComponent_mat_button_toggle_group_8_Template, 6, 1, "mat-button-toggle-group", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ListActionsComponent_Template_button_click_9_listener() { return ctx.triggerChangeSet.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " ChangeSet ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ListActionsComponent_Template_button_click_11_listener() { return ctx.triggerMoveSet.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " MoveSet ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ListActionsComponent_Template_button_click_13_listener() { return ctx.triggerMoveSetSwapped.next(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " MoveSet Swapped ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, ListActionsComponent_p_15_Template, 4, 1, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, ListActionsComponent_p_16_Template, 4, 4, "p", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, ListActionsComponent_div_18_Template, 2, 6, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("buttons", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx.view);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx.rendered$);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx.viewBroken$);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("rxLet", ctx.view);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_8__["VisualizerComponent"], _shared_debug_helper_value_provider_array_provider_array_provider_component__WEBPACK_IMPORTED_MODULE_4__["ArrayProviderComponent"], _shared_debug_helper_strategy_select_strategy_select_strategy_select_component__WEBPACK_IMPORTED_MODULE_9__["StrategySelectComponent"], _rx_angular_pocs_template_directives_let_rx_let_directive__WEBPACK_IMPORTED_MODULE_10__["RxLet"], _angular_material_button__WEBPACK_IMPORTED_MODULE_11__["MatButton"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggleGroup"], _angular_material_button_toggle__WEBPACK_IMPORTED_MODULE_12__["MatButtonToggle"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgStyle"], _rx_angular_pocs_template_directives_for_rx_for_directive__WEBPACK_IMPORTED_MODULE_14__["RxFor"]], styles: ["\n      .work-container.list-view {\n        flex-direction: column;\n      }\n\n      .work-container.list-view .work-child {\n        width: 100%;\n        height: 65px;\n        margin: 0.5rem 0;\n        background-color: transparent !important;\n      }\n\n      .child-context {\n        display: none;\n      }\n\n      .work-container.list-view .work-child .child-context {\n        display: flex;\n      }\n\n      .work-container.list-view .work-child .child-bg {\n        margin-right: 0.5rem;\n        width: 50px;\n        position: relative;\n      }\n\n      .work-child {\n        position: relative;\n        width: 10px;\n        height: 10px;\n        margin: 0 2px 2px 0;\n        padding: 0px;\n        outline: 1px solid white;\n        background-color: transparent;\n      }\n\n      .work-child.even {\n        outline: 1px solid black;\n      }\n\n      .work-child .child-bg {\n        position: absolute;\n        width: 100%;\n        height: 100%;\n      }\n\n      .work-child .child-bg.even {\n        background-color: red;\n      }\n    "], encapsulation: 2 });


/***/ }),

/***/ "liyW":
/*!*****************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-for/list-actions/list-actions.routes.ts ***!
  \*****************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _list_actions_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./list-actions.component */ "Bcrp");

const ROUTES = [
    {
        path: '',
        component: _list_actions_component__WEBPACK_IMPORTED_MODULE_0__["ListActionsComponent"]
    }
];


/***/ })

}]);
//# sourceMappingURL=list-actions-list-actions-module.js.map