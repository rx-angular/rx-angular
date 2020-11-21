import { fromEvent, Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ImgInfo, RGBA } from './model';
import { getMemoizedFn } from '../rx-angular-pocs/memo';


export const rgbaToStyle = getMemoizedFn(
  (rgba) => ('rgba(' + rgba.join(',') + ')')
);

export function rgbToHsl(r: number, g: number, b: number): number[] {
  r /= 255, g /= 255, b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  // tslint:disable-next-line:prefer-const
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h, s, l];
}

export function getPixelLuminance(pixel: RGBA): number {
  return (pixel[0] * 0.2126) + (pixel[1] * 0.7152) + (pixel[2] * 0.0722);
}

export function pixelToString(pixel: RGBA): string {
  return 'r: ' + pixel[0] + ', g: ' + pixel[1] + ', b: ' + pixel[2];
}

export function numberToPaddedHexString(number: number | string): string {
  const hexString: string = (+number).toString(16);
  if (hexString.length === 1) {
    return '0' + hexString;
  }
  return hexString;
}

export function pixelToHexString(pixel: RGBA): string {
  const hexString = '#' +
    numberToPaddedHexString(pixel[0]) +
    numberToPaddedHexString(pixel[1]) +
    numberToPaddedHexString(pixel[2]);
  return hexString;
}

// @TODO decide on transparency handling
export function computeAverageColor(pixels: RGBA[], ignoreTransparentColors = true): RGBA {
  const totalRed = pixels
    .map(p => p[0])
    .reduce((s, n) => s + n, 0);
  const totalGreen = pixels
    .map(p => p[1])
    .reduce((s, n) => s + n, 0);
  const totalBlue = pixels
    .map(p => p[2])
    .reduce((s, n) => s + n, 0);
  return [
    (totalRed / pixels.length),
    (totalGreen / pixels.length),
    (totalBlue / pixels.length),
    // @TODO decide on transparency handling
    255
  ];
}

export function imageDataToImgInfo(imgData: ImageData): ImgInfo {
  const data = imgData.data;
  const pixelArray = [];
  const colors = new Map<string, number>();
  for (let x = 0; x < imgData.data.length; x += 4) {
    const rgba = [
      data[x],
      data[x + 1],
      data[x + 2],
      data[x + 3]
    ];

    const color = rgbaToStyle(rgba);
    const colorCount = colors.get(color) || 0;
    colors.set(color, colorCount + 1);

    pixelArray.push(color);
  }
  return { pixelArray, colors, width: imgData.width };
}

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


