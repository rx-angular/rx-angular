(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pixel-priority-pixel-priority-module"],{

/***/ "1lJv":
/*!**************************************************************************************!*\
  !*** ./apps/demos/src/app/shared/image-array/palette-extractors/kmeans.extractor.ts ***!
  \**************************************************************************************/
/*! exports provided: kMeansRunner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "kMeansRunner", function() { return kMeansRunner; });
/* harmony import */ var _pixel_image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pixel-image */ "UIKc");

const RERUN_COUNT = 10;
class KMeansRunner {
    palette(result) {
        // tslint:disable-next-line:no-bitwise
        return result.clusters.map(rgba => Object(_pixel_image__WEBPACK_IMPORTED_MODULE_0__["computeAverageColor"])(rgba).map(v => ~~v));
    }
    run(k, pixels) {
        let clusters = null;
        let error = Infinity;
        // re-run several times and keep the best result
        for (let attempt = 0; attempt < RERUN_COUNT; attempt++) {
            const result = this.cluster(pixels, k);
            if (result.error < error) {
                clusters = result.clusters;
                error = result.error;
            }
        }
        return {
            clusters: clusters,
            error: error
        };
    }
    cluster(pixels, k) {
        // randomly initialize means
        let means = [];
        for (let i = 0; i <= k; i++) {
            const pixel = pixels[Math.floor(Math.random() * pixels.length)];
            means.push(pixel);
        }
        let done = false;
        let result = null;
        while (!done) {
            /* console.log("iterating...");*/
            result = this.groupPointsByMeans(means, pixels);
            const newMeans = this.computeMeans(result.groups);
            done = this.isDone(means, newMeans);
            means = newMeans;
        }
        /* console.log("DONE ===========================");*/
        return {
            clusters: result.groups,
            error: result.error,
            means: result.means
        };
    }
    computeMeans(groups) {
        return groups.map((group) => {
            return Object(_pixel_image__WEBPACK_IMPORTED_MODULE_0__["computeAverageColor"])(group);
        });
    }
    isDone(meansA, meansB) {
        let result = false;
        meansA.forEach((mean) => {
            let meanIsAlsoInMeansB = false;
            meansB.forEach((otherMean) => {
                if ((mean[0].toFixed(2) === otherMean[0].toFixed(2)) &&
                    (mean[1].toFixed(2) === otherMean[1].toFixed(2)) &&
                    (mean[2].toFixed(2) === otherMean[2].toFixed(2))) {
                    meanIsAlsoInMeansB = true;
                }
            });
            // @ts-ignore
            // tslint:disable-next-line:no-bitwise
            result |= meanIsAlsoInMeansB;
        });
        return result;
    }
    groupPointsByMeans(means, pixels) {
        let totalError = 0;
        const groups = new Array(means.length).fill([]);
        pixels.forEach((pixel) => {
            let bestGroupIndex;
            let bestGroupError = Infinity;
            means.forEach((mean, index) => {
                const error = this.distance([pixel[0], pixel[1], pixel[2]], [mean[0], mean[1], mean[2]]);
                if (error < bestGroupError) {
                    bestGroupError = error;
                    bestGroupIndex = index;
                }
            });
            groups[bestGroupIndex].push(pixel);
            totalError += bestGroupError;
        });
        return {
            means: means,
            groups: groups,
            error: totalError
        };
    }
    distance(pointA, pointB) {
        const squaredDiffs = pointA.map((dim, index) => {
            const diff = pointA[index] - pointB[index];
            return diff * diff;
        });
        return Math.sqrt(squaredDiffs.reduce((s, n) => s + n, 0));
    }
}
const kMeansRunner = new KMeansRunner();


/***/ }),

/***/ "GxjU":
/*!***************************************************************************!*\
  !*** ./apps/demos/src/app/shared/image-array/palette-extractors/index.ts ***!
  \***************************************************************************/
/*! exports provided: kMeansRunner */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _kmeans_extractor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kmeans.extractor */ "1lJv");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "kMeansRunner", function() { return _kmeans_extractor__WEBPACK_IMPORTED_MODULE_0__["kMeansRunner"]; });




/***/ }),

/***/ "J2ux":
/*!******************************************************************!*\
  !*** ./apps/demos/src/app/shared/image-array/image-converter.ts ***!
  \******************************************************************/
/*! exports provided: createImageConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createImageConverter", function() { return createImageConverter; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _pixel_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pixel-image */ "UIKc");



function createImageConverter(canvas) {
    canvas = canvas || document.createElement('CANVAS');
    // FileReader support
    if (!FileReader) {
        throw new Error('No FileReader supported.');
    }
    const TO_RADIANS = Math.PI / 180;
    const sub = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subscription"]();
    const ctx = canvas.getContext('2d');
    const loading$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](false);
    const imageDataChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    const renderImage$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
    sub.add(renderImage$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["animationFrameScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(img => renderImage(img))).subscribe());
    return {
        tearDown: () => sub.unsubscribe(),
        renderImage: (img) => renderImage$.next(img),
        rotate,
        scale,
        loading$,
        imageDataChange$,
        imgInfoChange$: imageDataChange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => loading$.next(true)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(_pixel_image__WEBPACK_IMPORTED_MODULE_2__["imageDataToImgInfo"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["observeOn"])(rxjs__WEBPACK_IMPORTED_MODULE_0__["asyncScheduler"]), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["tap"])(() => loading$.next(false)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["shareReplay"])(1))
    };
    // ---
    function rotate(angle, x, y) {
        const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
        x = x || image.width / 2;
        y = y || image.height / 2;
        // save the current co-ordinate system
        // before we screw with it
        ctx.save();
        // move to the middle of where we want to draw our image
        ctx.translate(x, y);
        // rotate around that point, converting our
        // angle from degrees to radians
        ctx.rotate(angle * TO_RADIANS);
        // draw it up and to the left by half the width
        // and height of the image
        ctx.drawImage(image, -(x), -(y));
        // and restore the co-ords to how they were when we began
        ctx.restore();
        _signalImageDataUpdate();
    }
    function scale(image, scalex, scaley) {
        const imgwidth = image.width;
        const imgheight = image.height;
        canvas.width = imgwidth * scalex;
        canvas.height = imgheight * scaley;
        ctx.scale(scalex, scaley);
        ctx.drawImage(image, 0, 0);
        _signalImageDataUpdate();
    }
    function renderImage(img) {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        _signalImageDataUpdate();
    }
    // ---
    function _signalImageDataUpdate() {
        imageDataChange$.next(ctx.getImageData(0, 0, canvas.width, canvas.height));
    }
}


/***/ }),

/***/ "MIAE":
/*!*********************************************************************!*\
  !*** ./apps/demos/src/app/shared/canvas-view/canvas-view.module.ts ***!
  \*********************************************************************/
/*! exports provided: CanvasViewModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasViewModule", function() { return CanvasViewModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _canvas_view_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./canvas-view.component */ "paZY");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");



class CanvasViewModule {
}
CanvasViewModule.ɵfac = function CanvasViewModule_Factory(t) { return new (t || CanvasViewModule)(); };
CanvasViewModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({ type: CanvasViewModule });
CanvasViewModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](CanvasViewModule, { declarations: [_canvas_view_component__WEBPACK_IMPORTED_MODULE_1__["CanvasViewComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"]], exports: [_canvas_view_component__WEBPACK_IMPORTED_MODULE_1__["CanvasViewComponent"]] }); })();


/***/ }),

/***/ "NRzE":
/*!*************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/strategies/pixel-priority/pixel-priority.module.ts ***!
  \*************************************************************************************************/
/*! exports provided: PixelPriorityModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PixelPriorityModule", function() { return PixelPriorityModule; });
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _pixel_priority_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pixel-priority.component */ "nOF9");
/* harmony import */ var _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer */ "cyPU");
/* harmony import */ var _shared_image_array_image_array_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/image-array/image-array.module */ "LXRa");
/* harmony import */ var _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material/checkbox */ "bSwM");
/* harmony import */ var _shared_template_structures_sibling_sibling_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../shared/template-structures/sibling/sibling.module */ "AAm+");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var templateAlpha0__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! templateAlpha0 */ "1tvP");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/button */ "bTqV");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _angular_material_list__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/list */ "MutI");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/select */ "d3UM");
/* harmony import */ var _shared_canvas_view_canvas_view_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../shared/canvas-view/canvas-view.module */ "MIAE");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _rx_angular_pocs_template_directives_unpatch__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/unpatch */ "B09P");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ "fXoL");


















class PixelPriorityModule {
}
PixelPriorityModule.ɵfac = function PixelPriorityModule_Factory(t) { return new (t || PixelPriorityModule)(); };
PixelPriorityModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineNgModule"]({ type: PixelPriorityModule });
PixelPriorityModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵdefineInjector"]({ imports: [[
            _angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
            _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"],
            _shared_image_array_image_array_module__WEBPACK_IMPORTED_MODULE_3__["ImageArrayModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"].forChild([{
                    path: '',
                    component: _pixel_priority_component__WEBPACK_IMPORTED_MODULE_1__["PixelPriorityComponent"]
                }]),
            _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
            _shared_template_structures_sibling_sibling_module__WEBPACK_IMPORTED_MODULE_5__["SiblingModule"],
            templateAlpha0__WEBPACK_IMPORTED_MODULE_7__["LetModule"], templateAlpha0__WEBPACK_IMPORTED_MODULE_7__["PushModule"], _rx_angular_pocs_template_directives_unpatch__WEBPACK_IMPORTED_MODULE_15__["UnpatchEventsModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
            _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatFormFieldModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInputModule"],
            _angular_material_list__WEBPACK_IMPORTED_MODULE_11__["MatListModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_12__["MatSelectModule"],
            _shared_canvas_view_canvas_view_module__WEBPACK_IMPORTED_MODULE_13__["CanvasViewModule"],
            _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__["MatProgressBarModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_16__["ɵɵsetNgModuleScope"](PixelPriorityModule, { declarations: [_pixel_priority_component__WEBPACK_IMPORTED_MODULE_1__["PixelPriorityComponent"]], imports: [_angular_common__WEBPACK_IMPORTED_MODULE_0__["CommonModule"],
        _shared_debug_helper_visualizer__WEBPACK_IMPORTED_MODULE_2__["VisualizerModule"],
        _shared_image_array_image_array_module__WEBPACK_IMPORTED_MODULE_3__["ImageArrayModule"], _angular_router__WEBPACK_IMPORTED_MODULE_6__["RouterModule"], _angular_material_checkbox__WEBPACK_IMPORTED_MODULE_4__["MatCheckboxModule"],
        _shared_template_structures_sibling_sibling_module__WEBPACK_IMPORTED_MODULE_5__["SiblingModule"],
        templateAlpha0__WEBPACK_IMPORTED_MODULE_7__["LetModule"], templateAlpha0__WEBPACK_IMPORTED_MODULE_7__["PushModule"], _rx_angular_pocs_template_directives_unpatch__WEBPACK_IMPORTED_MODULE_15__["UnpatchEventsModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_8__["MatButtonModule"],
        _angular_material_form_field__WEBPACK_IMPORTED_MODULE_9__["MatFormFieldModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInputModule"],
        _angular_material_list__WEBPACK_IMPORTED_MODULE_11__["MatListModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_12__["MatSelectModule"],
        _shared_canvas_view_canvas_view_module__WEBPACK_IMPORTED_MODULE_13__["CanvasViewModule"],
        _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_14__["MatProgressBarModule"]] }); })();


/***/ }),

/***/ "nOF9":
/*!****************************************************************************************************!*\
  !*** ./apps/demos/src/app/features/template/strategies/pixel-priority/pixel-priority.component.ts ***!
  \****************************************************************************************************/
/*! exports provided: PixelPriorityComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PixelPriorityComponent", function() { return PixelPriorityComponent; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs/operators */ "kU1M");
/* harmony import */ var _shared_image_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shared/image-array */ "tai1");
/* harmony import */ var _shared_image_array_pixel_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/image-array/pixel-image */ "UIKc");
/* harmony import */ var _shared_rx_effects_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../shared/rx-effects.service */ "+Gkt");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../shared/debug-helper/visualizer/visualizer/visualizer.component */ "cIVi");
/* harmony import */ var _shared_image_array_controls_image_array_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../shared/image-array/controls/image-array.component */ "q4rW");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common */ "ofXK");
/* harmony import */ var _shared_image_array_controls_color_prio_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../shared/image-array/controls/color-prio.component */ "FFlB");
/* harmony import */ var _shared_canvas_view_canvas_view_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../shared/canvas-view/canvas-view.component */ "paZY");
/* harmony import */ var templateAlpha0__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! templateAlpha0 */ "1tvP");
/* harmony import */ var _shared_template_structures_sibling_sibling_pixel_img_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../shared/template-structures/sibling/sibling-pixel-img.component */ "QAb1");
/* harmony import */ var _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/progress-bar */ "bv9b");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/form-field */ "kmnG");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/input */ "qFsG");
/* harmony import */ var _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../rx-angular-pocs/template/directives/unpatch/unpatch-events.directive */ "OyBQ");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/button */ "bTqV");



















function PixelPriorityComponent_mat_progress_bar_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](0, "mat-progress-bar", 13);
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("mode", "buffer");
} }
function PixelPriorityComponent_mat_form_field_13_Template(rf, ctx) { if (rf & 1) {
    const _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-form-field", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "input", 15, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("input", function PixelPriorityComponent_mat_form_field_13_Template_input_input_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r7); const _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](4); const ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r6.pixelSize$.next(_r5.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const size_r4 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Pixel Size ", size_r4, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", size_r4);
} }
function PixelPriorityComponent_mat_form_field_14_Template(rf, ctx) { if (rf & 1) {
    const _r11 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "mat-form-field", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](1, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](3, "input", 17, 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("input", function PixelPriorityComponent_mat_form_field_14_Template_input_input_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r11); const _r9 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵreference"](4); const ctx_r10 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r10.fillColor$.next(_r9.value); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const fillColor_r8 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"]("Overlay Color ", fillColor_r8, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("value", fillColor_r8);
} }
function PixelPriorityComponent_button_15_Template(rf, ctx) { if (rf & 1) {
    const _r14 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "button", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("click", function PixelPriorityComponent_button_15_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵrestoreView"](_r14); const ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵnextContext"](); return ctx_r13.filled$.next(!ctx_r13.filled$.getValue()); });
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
} if (rf & 2) {
    const a_r12 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtextInterpolate1"](" Repaint ", a_r12 == null ? null : a_r12.length, " Components ");
} }
class PixelPriorityComponent {
    constructor(rxEf) {
        this.rxEf = rxEf;
        this.selectedStrategies = {};
        this.filled$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"](true);
        this.fillColor$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('#ff0000');
        this.pixelSize$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["BehaviorSubject"]('3');
        this.imgChange$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["Subject"]();
        this.imgConverter = Object(_shared_image_array__WEBPACK_IMPORTED_MODULE_2__["createImageConverter"])();
        this.imgInfoChange$ = this.imgConverter.imgInfoChange$;
        this.colors$ = this.imgInfoChange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(r => Object(_shared_image_array_pixel_image__WEBPACK_IMPORTED_MODULE_3__["computeColorPrio"])(r.colors)));
        this.pixelArray$ = this.imgInfoChange$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_1__["map"])(d => d.pixelArray));
        this.rxEf.hold(this.imgChange$, (img) => this.imgConverter.renderImage(img));
    }
    visible(choice) {
        return this.selectedStrategies[choice] === true;
    }
}
PixelPriorityComponent.ɵfac = function PixelPriorityComponent_Factory(t) { return new (t || PixelPriorityComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdirectiveInject"](_shared_rx_effects_service__WEBPACK_IMPORTED_MODULE_4__["RxEffects"])); };
PixelPriorityComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵdefineComponent"]({ type: PixelPriorityComponent, selectors: [["rxa-concurrent-strategies"]], features: [_angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵProvidersFeature"]([_shared_rx_effects_service__WEBPACK_IMPORTED_MODULE_4__["RxEffects"]])], decls: 18, vars: 12, consts: [["visualizerHeader", ""], [1, "mat-headline"], [1, "mb-2", 3, "img"], [1, "w-100", "d-flex", "flex-wrap"], [1, "w-100", "mb-2"], [3, "mode", 4, "ngIf"], [1, "w-100", 3, "colors$"], [1, "w-100", "d-flex", "flex-fill", "mb-5"], [1, "d-flex", "flex-wrap", "mr-2", 2, "width", "300px"], [2, "width", "100px", 3, "img$"], ["class", "mr-2 w-100", 4, "rxLet"], ["style", "width: 200px", "mat-raised-button", "", "color", "primary", 3, "unpatch", "click", 4, "rxLet"], [3, "pixelSize", "imgInfo", "filled", "fillColor"], [3, "mode"], [1, "mr-2", "w-100"], ["matInput", "", "type", "number", 3, "unpatch", "value", "input"], ["i", ""], ["matInput", "", "type", "color", 3, "unpatch", "value", "input"], ["mat-raised-button", "", "color", "primary", 2, "width", "200px", 3, "unpatch", "click"]], template: function PixelPriorityComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](0, "rxa-visualizer");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerStart"](1, 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](2, "h1", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtext"](3, "Pixels with priorities");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](4, "rxa-image-array", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵlistener"]("img", function PixelPriorityComponent_Template_rxa_image_array_img_4_listener($event) { return ctx.imgChange$.next($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementContainerEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](7, PixelPriorityComponent_mat_progress_bar_7_Template, 1, 1, "mat-progress-bar", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipe"](8, "push");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](9, "rxa-color-prio", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](11, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](12, "rxa-canvas-view", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](13, PixelPriorityComponent_mat_form_field_13_Template, 5, 2, "mat-form-field", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](14, PixelPriorityComponent_mat_form_field_14_Template, 5, 2, "mat-form-field", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵtemplate"](15, PixelPriorityComponent_button_15_Template, 2, 1, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementStart"](16, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelement"](17, "rxa-sibling-pixel-img", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("ngIf", _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵpipeBind1"](8, 10, ctx.imgConverter == null ? null : ctx.imgConverter.loading$));
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("colors$", ctx.colors$);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("img$", ctx.imgChange$);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rxLet", ctx.pixelSize$);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rxLet", ctx.fillColor$);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("rxLet", ctx.pixelArray$);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_5__["ɵɵproperty"]("pixelSize", ctx.pixelSize$)("imgInfo", ctx.imgInfoChange$)("filled", ctx.filled$)("fillColor", ctx.fillColor$);
    } }, directives: [_shared_debug_helper_visualizer_visualizer_visualizer_component__WEBPACK_IMPORTED_MODULE_6__["VisualizerComponent"], _shared_image_array_controls_image_array_component__WEBPACK_IMPORTED_MODULE_7__["ImageArrayComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_8__["NgIf"], _shared_image_array_controls_color_prio_component__WEBPACK_IMPORTED_MODULE_9__["ColorPrioComponent"], _shared_canvas_view_canvas_view_component__WEBPACK_IMPORTED_MODULE_10__["CanvasViewComponent"], templateAlpha0__WEBPACK_IMPORTED_MODULE_11__["LetDirective"], _shared_template_structures_sibling_sibling_pixel_img_component__WEBPACK_IMPORTED_MODULE_12__["SiblingPixelImgComponent"], _angular_material_progress_bar__WEBPACK_IMPORTED_MODULE_13__["MatProgressBar"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"], _rx_angular_pocs_template_directives_unpatch_unpatch_events_directive__WEBPACK_IMPORTED_MODULE_16__["UnpatchEventsDirective"], _angular_material_button__WEBPACK_IMPORTED_MODULE_17__["MatButton"]], pipes: [templateAlpha0__WEBPACK_IMPORTED_MODULE_11__["PushPipe"]], encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "paZY":
/*!************************************************************************!*\
  !*** ./apps/demos/src/app/shared/canvas-view/canvas-view.component.ts ***!
  \************************************************************************/
/*! exports provided: CanvasViewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasViewComponent", function() { return CanvasViewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _debug_helper_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../debug-helper/hooks */ "XoRM");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "qCKp");
/* harmony import */ var _rx_angular_state__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @rx-angular/state */ "YYsp");






const _c0 = ["display"];
class CanvasViewComponent extends _debug_helper_hooks__WEBPACK_IMPORTED_MODULE_1__["Hooks"] {
    constructor(elemRef, rxState) {
        super();
        this.elemRef = elemRef;
        this.rxState = rxState;
        this.rxState.hold(this.afterViewInit$, () => {
            this.setupCanvas(this.display.nativeElement, 50, 50);
        });
        this.rxState.hold(this.rxState.select('img'), (img) => {
            this.canvas.width = img.width;
            this.canvas.height = img.height;
            this.canvas.getContext('2d').drawImage(img, 0, 0);
        });
    }
    set img$(img$) {
        this.rxState.connect('img', img$);
    }
    setupCanvas(parent, w, h) {
        this.canvas = document.createElement('canvas');
        this.canvas.width = w;
        this.canvas.height = h;
        this.canvas.className = 'pixel-canvas';
        parent.appendChild(this.canvas);
    }
}
CanvasViewComponent.ɵfac = function CanvasViewComponent_Factory(t) { return new (t || CanvasViewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_rx_angular_state__WEBPACK_IMPORTED_MODULE_3__["RxState"])); };
CanvasViewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CanvasViewComponent, selectors: [["rxa-canvas-view"]], viewQuery: function CanvasViewComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.display = _t.first);
    } }, hostAttrs: [1, "d-block", "w-100"], inputs: { img$: "img$" }, features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_rx_angular_state__WEBPACK_IMPORTED_MODULE_3__["RxState"]]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵInheritDefinitionFeature"]], decls: 2, vars: 0, consts: [["display", ""]], template: function CanvasViewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", null, 0);
    } }, encapsulation: 2, changeDetection: 0 });


/***/ }),

/***/ "tai1":
/*!********************************************************!*\
  !*** ./apps/demos/src/app/shared/image-array/index.ts ***!
  \********************************************************/
/*! exports provided: kMeansRunner, createImageConverter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _palette_extractors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./palette-extractors */ "GxjU");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "kMeansRunner", function() { return _palette_extractors__WEBPACK_IMPORTED_MODULE_0__["kMeansRunner"]; });

/* harmony import */ var _image_converter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./image-converter */ "J2ux");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "createImageConverter", function() { return _image_converter__WEBPACK_IMPORTED_MODULE_1__["createImageConverter"]; });





/***/ })

}]);
//# sourceMappingURL=pixel-priority-pixel-priority-module.js.map