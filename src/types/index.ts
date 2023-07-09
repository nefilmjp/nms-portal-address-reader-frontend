export type ImageProfile = 'pc' | 'ps4';

export interface Options {
  /** UI Option */
  sendImmediately?: boolean;
  /** API Option */
  claheValueThreshold?: number;
  /** API Option */
  claheClipLimit?: number;
  /** API Option */
  claheTileGridSizeX?: number;
  /** API Option */
  claheTileGridSizeY?: number;
  /** API Option */
  bfmLengthLimit?: number;
}

export type GlyphNumber =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export type AddressArray = [
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
  GlyphNumber,
];
