import { animationFrameScheduler, asyncScheduler, BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { ImgInfo } from './model';
import { map, observeOn, shareReplay, tap } from 'rxjs/operators';
import { imageDataToImgInfo } from './pixel-image';

export interface ImgConverter {
  tearDown: () => void,
  renderImage: (img: CanvasImageSource) => void,
  rotate: (angle: number, x: number, y: number) => void,
  scale: (image: HTMLImageElement, scalex: number, scaley: number) => void,
  imageDataChange$: Observable<ImageData>,
  loading$: Observable<boolean>,
  imgInfoChange$: Observable<ImgInfo>
}

export function createImageConverter(canvas?: HTMLCanvasElement): ImgConverter {
  canvas = canvas || document.createElement('CANVAS') as HTMLCanvasElement;
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
    imgInfoChange$: imageDataChange$.pipe(
      tap(() => loading$.next(true)),
      map(imageDataToImgInfo),
      observeOn(asyncScheduler),
      tap(() => loading$.next(false)),
      shareReplay(1)
    )
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
