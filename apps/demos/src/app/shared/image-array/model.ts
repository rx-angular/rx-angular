export interface ImgInfo {
  width: number,
  pixelArray: string[],
  colors: Map<string, number>,
  colorPrios: Map<string, string>
}
export type RGBA = [number, number, number, number];
export type CMYK = [number, number, number, number];
export type RGBAs = RGBA[];
