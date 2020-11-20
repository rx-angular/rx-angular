import {
  animationFrameScheduler,
  asyncScheduler,
  BehaviorSubject,
  fromEvent,
  Observable,
  Subject,
  Subscription,
  throwError
} from 'rxjs';
import { map, observeOn, switchMap, tap } from 'rxjs/operators';
import { getMemoizedFn } from '../../../../shared/rx-angular-pocs/memo';


export interface ImgInfo {
  width: number,
  pixelArray: string[],
  colors: Map<string, number>
}

export interface ImgConverter {
  tearDown: () => void,
  renderImage: (img: CanvasImageSource) => void,
  rotate: (angle: number, x: number, y: number) => void,
  scale: (image: HTMLImageElement, scalex: number, scaley: number) => void,
  imageDataChange$: Observable<ImageData>,
  loading$: Observable<boolean>,
  pixelArrayChange$: Observable<ImgInfo>
}


export function createImageConverter(canvas: HTMLCanvasElement): ImgConverter {

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
  ).subscribe());

  return {
    tearDown: () => sub.unsubscribe(),
    renderImage: (img: HTMLImageElement) => renderImage$.next(img),
    rotate,
    scale,
    loading$,
    imageDataChange$,
    pixelArrayChange$: imageDataChange$.pipe(
      tap(() => loading$.next(true)),
      map(imageDataToPixelArrayInfo),
      observeOn(asyncScheduler),
      tap(() => loading$.next(false)))
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

const toColor = getMemoizedFn(
  (rgba) => ('rgba(' + rgba.join(',') + ')')
);

export function imageDataToPixelArrayInfo(imgData: ImageData): ImgInfo {
  const data = imgData.data;
  const pixelArray = [];
  const colors = new Map<string, number>();
  for (let x = 0; x < imgData.data.length; x += 4) {
    const rgbaSet = [
      data[x],
      data[x + 1],
      data[x + 2],
      data[x + 3]
    ];
    const color = toColor(rgbaSet);
    const colorCount = colors.get(color) || 0;
    colors.set(color, colorCount + 1);
    pixelArray.push(color);
  }
  return { pixelArray, colors, width: imgData.width };
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


export function imageFromFileReader() {
  return (o$: Observable<FileReader>): Observable<HTMLImageElement> => o$.pipe(
    switchMap((fileReader) => {
      const img: HTMLImageElement = document.createElement('img');
      const fileLoad$ = fromEvent(img, 'load').pipe(map(e => e.target as HTMLImageElement));
      img.src = fileReader.result as string;
      return fileLoad$;
    })
  );
}

export function fileReaderFromBlob() {
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

export function getRatio(img: HTMLImageElement, maxWidth: number = 50, maxHeight: number = 50): [number, number] {
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


