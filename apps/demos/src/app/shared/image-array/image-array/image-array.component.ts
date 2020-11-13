import { AfterViewInit, Component, ElementRef, Output } from '@angular/core';
import {
  animationFrameScheduler,
  asyncScheduler, BehaviorSubject,
  fromEvent,
  Observable,
  Subject,
  Subscription,
  throwError
} from 'rxjs';
import { map, observeOn, switchMap, tap } from 'rxjs/operators';
import { RxEffects } from '../../rx-effects.service';
import { Hooks } from '../../debug-helper/hooks';
import { RxState } from '@rx-angular/state';

interface ComponentState {
  loading: boolean;
  image: CanvasImageSource;
  pixelArray: number[][];
  width: number;
  height: number;
}

export interface PixelArrayData {
  width: number,
  pixelArray: number[][]
};

@Component({
  selector: 'rxa-image-array',
  template: `

    <input #fileInput (change)="filesChange$.next(fileInput.files[0])" type="file">
    <mat-progress-bar [mode]="'buffer'" *ngIf="imgConverter?.loading$ | push"></mat-progress-bar>
    <br>
    <div class="display">
      <!-- convas bootstraped here-->
    </div>
    http://pixelartmaker.com
    http://pixelartmaker.com/gallery
  `,
  styles: [`
    .pixel-canvas {
      border: 1px solid red;
    }
  `],
  providers: [RxEffects, RxState]
})
export class ImageArrayComponent extends Hooks implements AfterViewInit {

  filesChange$ = new Subject<any>();
  canvas: HTMLCanvasElement;
  imgConverter: ImgConverter;


  @Output()
  imageChange: Observable<PixelArrayData> = this.afterViewInit$.pipe(
    switchMap(() => this.imgConverter.pixelArrayChange$.pipe(
      map(pixelArray => ({ width: this.canvas.width, pixelArray }))
    ))
  );

  constructor(
    private elemRef: ElementRef,
    private rxEf: RxEffects,
    private state: RxState<ComponentState>
  ) {
    super();

    this.state.connect('image', this.filesChange$.pipe(fileReaderFromBlob(), imageFromFileReader()));
    this.rxEf.hold(this.state.select(map(s => s.image)), (img: CanvasImageSource) => this.imgConverter.renderImage(img));

    this.rxEf.hold(this.afterViewInit$, () => {
      this.setupCanvas(this.elemRef.nativeElement.children[2], 50, 50);
      this.setupConverter();
    });
  }

  setupCanvas(parent: HTMLElement, w: number, h: number) {
    this.canvas = document.createElement('canvas') as HTMLCanvasElement;
    this.canvas.width = w;
    this.canvas.height = h;
    this.canvas.className = 'pixel-canvas';
    parent.appendChild(this.canvas);
  }

  setupConverter(): void {
    this.imgConverter = createImageConverter(this.canvas);
  }

}

/*
(colorArr: number[][]) => {
      const colours =
        colorArr.reduce((acc, c: number[]) => {
          const key = ['rgba(', c.join(','), ')'].join('');
          if (acc[key]) {
            acc[key]++;
          } else {
            acc[key] = 1;
          }
          return acc;
        }, {});
      const sortedcolours = Object.keys(colours).sort(
        function(a, b) {
          return -(colours[a] - colours[b]);
        }
      );

      return sortedcolours;
    })
*/

interface ImgConverter {
  tearDown: () => void,
  renderImage: (img: CanvasImageSource) => void,
  rotate: (angle: number, x: number, y: number) => void,
  scale: (image: HTMLImageElement, scalex: number, scaley: number) => void,
  imageDataChange$: Observable<ImageData>,
  loading$: Observable<boolean>,
  pixelArrayChange$: Observable<number[][]>
}

function createImageConverter(canvas: HTMLCanvasElement): ImgConverter {

  // FileReader support
  if (!FileReader) {
    throw new Error('No FileReader supported.');
  }
  const TO_RADIANS = Math.PI / 180;

  const sub = new Subscription();
  const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
  const loading$ = new BehaviorSubject<boolean>(false);
  const imageDataChange$ = new Subject<ImageData>();

  const renderImage$ = new Subject<HTMLImageElement>();

  sub.add(renderImage$.pipe(
    observeOn(animationFrameScheduler),
    tap(img => renderImage(img))
  ).subscribe())

  return {
    tearDown: () => sub.unsubscribe(),
    renderImage: (img: HTMLImageElement) => renderImage$.next(img),
    rotate,
    scale,
    loading$,
    imageDataChange$,
    pixelArrayChange$: imageDataChange$.pipe(tap(() => loading$.next(true)),map(imageDataToPixelArray), observeOn(asyncScheduler), tap(() => loading$.next(false)))
  };

  // ---

  function rotate(angle: number, x: number, y: number) {
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
    ctx.drawImage(image as any, -(x), -(y));

    // and restore the co-ords to how they were when we began
    ctx.restore();

    _signalImageDataUpdate();
  }

  function scale(image: HTMLImageElement, scalex: number, scaley: number) {
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

function imageDataToPixelArray(imgData: ImageData): number[][] {
  const a = [];
  for (let x = 0; x < imgData.data.length; x += 4) {
    a.push([
      imgData.data[x],
      imgData.data[x + 1],
      imgData.data[x + 2],
      imgData.data[x + 3]
    ]);
  }
  return a;
}

function imageFromFileReader() {
  return (o$: Observable<FileReader>): Observable<HTMLImageElement> => o$.pipe(
    switchMap((fileReader) => {
      const img: HTMLImageElement = document.createElement('img');
      const fileLoad$ = fromEvent(img, 'load').pipe(map(e => e.target as HTMLImageElement));
      img.src = fileReader.result as string;
      return fileLoad$;
    })
  );
}

function fileReaderFromBlob() {
  return (o$: Observable<Blob>): Observable<FileReader> => o$.pipe(
    switchMap((files) => {
        if (files) {
          const fr = new FileReader();
          const o = fromEvent(fr, 'load').pipe(map(e => e.target as FileReader));
          fr.readAsDataURL(files);
          return o;
        } else {
          return throwError('No file given');
        }
      }
    ));

}
function getRatio(img: HTMLImageElement, maxWidth: number = 50, maxHeight: number = 50): [number, number] {
  let ratio = 0;
  const width = img.width;
  const height = img.height;
  const out = [] as unknown as [number, number];

  if (width > maxWidth && width > height) {
    ratio = width / height;
    out.push(maxWidth);
    out.push(maxWidth / ratio);
  } else if (height > maxHeight && height > width) {
    ratio = height / width;
    out.push(maxHeight / ratio);
    out.push(maxHeight);
  } else {
    out.push(maxWidth);
    out.push(maxHeight);
  }

  return out;
}


