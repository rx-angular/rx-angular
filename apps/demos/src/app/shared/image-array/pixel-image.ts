import { fromEvent, Observable, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CMYK, ImgInfo, RGBA } from './model';
import { getMemoizedFn, PriorityNames } from '../../rx-angular-pocs';

// http://pixelartmaker.com/art/556d215ebf25e7f

export const rgbaToStyle = getMemoizedFn(
  (rgba: RGBA) => ('rgba(' + rgba.join(',') + ')')
) as (RGBA) => string;
export const styleToRgba = getMemoizedFn(
  (rgbaStyle: string) => rgbaStyle.slice(5, -1).split(',').map(s => +s)
) as (string) => RGBA;

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

export function rgbaToCmyk(rgba: RGBA): number[] {
  const cmyk: CMYK = [0, 0, 0, 0];

  const r = rgba[0] / 255;
  const g = rgba[1] / 255;
  const b = rgba[2] / 255;

  cmyk[0] = (1 - r - cmyk[3]) / (1 - cmyk[3]);
  cmyk[1] = (1 - g - cmyk[3]) / (1 - cmyk[3]);
  cmyk[2] = (1 - b - cmyk[3]) / (1 - cmyk[3]);
  cmyk[3] = Math.min(1 - r, 1 - g, 1 - b);

  cmyk[0] = Math.round(cmyk[0] * 100);
  cmyk[1] = Math.round(cmyk[1] * 100);
  cmyk[2] = Math.round(cmyk[2] * 100);
  cmyk[3] = Math.round(cmyk[3] * 100);

  return cmyk;
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


export function computeColorPrio(colorCount: Map<string, number>): Map<string, string> {
  const prioMap = new Map<string, string>();
  let lowAndHigh = 0;
  const numPrios = 3;

  return Array.from(colorCount.entries())
    .map(s => ([...s, rgbaToCmyk(styleToRgba(s[0]))] as [string, number, CMYK]))
    .sort((a, b) => {
      const _a = a[2][3];
      const _b = b[2][3];
      return _a < _b ? 1 : _a > _b ? -1 : 0;
    })
    .reduce((acc, entry, idx) => {
      const style = entry[0];
      const k = entry[2][3];
      const remaining = colorCount.size - lowAndHigh;


      /*
        noPriority = 0;
        immediate = 1;
        userBlocking = 2;
        normal = 3;
        low = 4;
        background = 5;
      */
      // transparent
      if (style.slice(style.length - 2, -1) === '0') {
        acc.set(style, PriorityNames.idle);
        lowAndHigh += 1;
      } else {
        // Dark color prio
        if (k > 76) {
          acc.set(style, PriorityNames.immediate);
          lowAndHigh += 1;
        }
        // if there is space add most used colors until a third of all colors are prioritized
        else if (idx < remaining / numPrios * 1) {
          acc.set(style, PriorityNames.userBlocking);
        } else if (idx < remaining / numPrios * 2) {
          acc.set(style, PriorityNames.normal);
        } else {
          acc.set(style, PriorityNames.low);
        }
      }
      return acc;
    }, prioMap);
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
  ] as RGBA;
}

export function imageDataToImgInfo(imgData: ImageData): ImgInfo {
  const data = imgData.data;
  const pixelArray = [];
  const rgbaArray = [];
  const colors = new Map<string, number>();
  for (let x = 0; x < imgData.data.length; x += 4) {
    const rgba = [
      data[x],
      data[x + 1],
      data[x + 2],
      data[x + 3]
    ];
    rgbaArray.push(rgba);
    const color = rgbaToStyle(rgba);
    const colorCount = colors.get(color) || 0;
    colors.set(color, colorCount + 1);
    pixelArray.push(color);
  }

  return { pixelArray, colors, width: imgData.width, colorPrios: computeColorPrio(colors) };
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


