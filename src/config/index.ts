import type { RecognitionProfile, AppSettings, CropProfile } from '@/types';

export const API_URL = process.env['NEXT_PUBLIC_API_URL']
  ? process.env['NEXT_PUBLIC_API_URL']
  : '';

export const DEFAULT_SETTINGS: AppSettings = {
  profile: 'pc',
};

export const IMAGE_PROFILES: Record<RecognitionProfile, string> = {
  pc: 'Normal',
  ps4: 'PS4, Switch',
};

export const CROP_PROFILES: CropProfile = {
  1280: {
    720: {
      x: 8,
      y: 676,
      box: 22,
    },
  },
  1920: {
    1080: {
      x: 11,
      y: 1015,
      box: 32,
    },
    1200: {
      x: 11,
      y: 1127,
      box: 32,
    },
    1440: {
      x: 11,
      y: 1352,
      box: 32,
    },
  },
  // 2048: {
  //   1536: {
  //     x: 13,
  //     y: 1440,
  //     box: 34,
  //   },
  // },
  // 2560: {
  //   1440: {
  //     x: 0,
  //     y: 0,
  //     box: 32,
  //   },
  //   1600: {
  //     x: 0,
  //     y: 0,
  //     box: 32,
  //   },
  // },
  // 3840: {
  //   2160: {
  //     x: 22,
  //     y: 2030,
  //     box: 64,
  //   },
  // },
};
