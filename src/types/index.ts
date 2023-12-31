// eslint-disable-next-line @typescript-eslint/ban-types
export type OnlyTypeKey<T extends Object, ExpectType> = {
  [K in keyof T]: T[K] extends ExpectType ? K : never;
}[keyof T];

export type RecognitionProfile = 'pc' | 'ps4';

export type CropProfile = Record<
  1280 | 1920,
  Record<number, { x: number; y: number; box: number }>
>;

export interface AppSettings {
  /** Decimal output */
  disableDecimal?: boolean;
  /** Hex output */
  disableHex?: boolean;
  /** Image output */
  disableImage?: boolean;
  /** Optional output */
  formattedOutput?: boolean;
  format: 'hexU' | 'hexL' | 'dec1' | 'dec0';
  prefix?: string;
  suffix?: string;
  delimiter?: string;
  /** UI Option */
  sendImmediately?: boolean;
  /** API Option */
  profile: RecognitionProfile;
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

export interface SettingsProps {
  options: AppSettings;
  setOptions: (options: AppSettings) => void;
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
