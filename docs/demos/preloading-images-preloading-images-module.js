(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["preloading-images-preloading-images-module"],{

/***/ "1upW":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/preloading-images/preloading-images.module.ts ***!
  \***************************************************************************************************/
/*! exports provided: PreloadingImagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreloadingImagesModule", function() { return PreloadingImagesModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/dirty-checks */ "v95w");
/* harmony import */ var _preloading_images_routes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./preloading-images.routes */ "izyE");
/* harmony import */ var _preloading_images_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./preloading-images.component */ "2uQw");
/* harmony import */ var _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @rx-angular/template */ "WFkj");
/* harmony import */ var ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-skeleton-loader */ "xJkR");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/icon */ "NFeN");
/* harmony import */ var _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider */ "DJi3");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");













const DECLARATIONS = [
    _preloading_images_component__WEBPACK_IMPORTED_MODULE_4__["PreloadingImagesComponent"]
];
class PreloadingImagesModule {
}
PreloadingImagesModule.ɵfac = function PreloadingImagesModule_Factory(t) { return new (t || PreloadingImagesModule)(); };
PreloadingImagesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: PreloadingImagesModule });
PreloadingImagesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_preloading_images_routes__WEBPACK_IMPORTED_MODULE_3__["ROUTES"]),
            _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_2__["DirtyChecksModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__["LetModule"],
            _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__["UnpatchEventsModule"],
            ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_6__["NgxSkeletonLoaderModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
            _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_8__["ValueProvidersModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_9__["VisualizerModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](PreloadingImagesModule, { declarations: [_preloading_images_component__WEBPACK_IMPORTED_MODULE_4__["PreloadingImagesComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"], _shared_debug_helper_dirty_checks__WEBPACK_IMPORTED_MODULE_2__["DirtyChecksModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__["LetModule"],
        _rx_angular_template__WEBPACK_IMPORTED_MODULE_5__["UnpatchEventsModule"],
        ngx_skeleton_loader__WEBPACK_IMPORTED_MODULE_6__["NgxSkeletonLoaderModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
        _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_8__["ValueProvidersModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_9__["VisualizerModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"]] }); })();


/***/ }),

/***/ "2uQw":
/*!******************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/preloading-images/preloading-images.component.ts ***!
  \******************************************************************************************************/
/*! exports provided: PreloadingImagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PreloadingImagesComponent", function() { return PreloadingImagesComponent; });
/* harmony import */ var _shared_debug_helper_value_provider_scheduling_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/scheduling-helper */ "162L");
/* harmony import */ var _shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider */ "DJi3");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _shared_debug_helper_value_provider_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/debug-helper/value-provider/value-provider/value-provider.component */ "eHQV");
/* harmony import */ var _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../../../libs/template/src/lib/let/let.directive */ "cihl");









function PreloadingImagesComponent_img_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 6);
} if (rf & 2) {
    const url_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", url_r4, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
function PreloadingImagesComponent_ng_template_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelement"](0, "img", 6);
} if (rf & 2) {
    const ctx_r3 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("src", ctx_r3.placeholder, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵsanitizeUrl"]);
} }
class PreloadingImagesComponent {
    constructor(domSanitizer) {
        this.domSanitizer = domSanitizer;
        this.sh = Object(_shared_debug_helper_value_provider_scheduling_helper__WEBPACK_IMPORTED_MODULE_0__["schedulingHelper"])();
        this.placeholder = this.domSanitizer.bypassSecurityTrustUrl(_shared_debug_helper_value_provider__WEBPACK_IMPORTED_MODULE_1__["placeholderImg"]);
    }
    reset() {
        this.sh = Object(_shared_debug_helper_value_provider_scheduling_helper__WEBPACK_IMPORTED_MODULE_0__["schedulingHelper"])();
    }
}
PreloadingImagesComponent.ɵfac = function PreloadingImagesComponent_Factory(t) { return new (t || PreloadingImagesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdirectiveInject"](_angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["DomSanitizer"])); };
PreloadingImagesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵdefineComponent"]({ type: PreloadingImagesComponent, selectors: [["rxa-ngif-hack"]], decls: 9, vars: 4, consts: [["visualizerHeader", ""], ["mat-raised-button", "", 3, "click"], [3, "changes$", "buttons", "resetState"], ["valP", "rxaValueProvider"], [3, "src", 4, "rxLet", "rxLetRxSuspense"], ["sV", ""], [3, "src"]], template: function PreloadingImagesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](1, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](2, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("click", function PreloadingImagesComponent_Template_button_click_2_listener() { return ctx.sh.tick(1, [500, 0]); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtext"](3, " Delayed ");
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementStart"](4, "rxa-value-provider", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵlistener"]("resetState", function PreloadingImagesComponent_Template_rxa_value_provider_resetState_4_listener() { return ctx.reset(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](6, PreloadingImagesComponent_img_6_Template, 1, 1, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplate"](7, PreloadingImagesComponent_ng_template_7_Template, 1, 1, "ng-template", null, 5, _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](5);
        const _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵreference"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("changes$", ctx.sh.ticks$)("buttons", true);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_3__["ɵɵproperty"]("rxLet", _r0.imgUrl$)("rxLetRxSuspense", _r2);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_4__["VisualizerComponent"], _angular_material_button__WEBPACK_IMPORTED_MODULE_5__["MatButton"], _shared_debug_helper_value_provider_value_provider_value_provider_component__WEBPACK_IMPORTED_MODULE_6__["ValueProviderComponent"], _libs_template_src_lib_let_let_directive__WEBPACK_IMPORTED_MODULE_7__["LetDirective"]], encapsulation: 2, changeDetection: 0 });


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

/***/ "izyE":
/*!***************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/rx-let/preloading-images/preloading-images.routes.ts ***!
  \***************************************************************************************************/
/*! exports provided: ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ROUTES", function() { return ROUTES; });
/* harmony import */ var _preloading_images_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./preloading-images.component */ "2uQw");

const ROUTES = [
    {
        path: '',
        component: _preloading_images_component__WEBPACK_IMPORTED_MODULE_0__["PreloadingImagesComponent"]
    }
];


/***/ })

}]);
//# sourceMappingURL=preloading-images-preloading-images-module.js.map