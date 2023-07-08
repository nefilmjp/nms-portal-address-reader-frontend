import { CROP_PROFILES } from '@/config';

export const isFileValid = (file: File | Blob) => {
  if (!('type' in file)) return false;
  if (file.type === 'image/jpeg') return true;
  else if (file.type === 'image/png') return true;
  return false;
};

export const loadImage = async (file: File | Blob): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = URL.createObjectURL(file);
  });

export const getAspectRatio = (
  img: HTMLImageElement,
): [number, number] | undefined => {
  const h = img.naturalHeight;
  switch (img.naturalWidth) {
    case 1920:
      if (h === 1080) return [16, 9];
      else if (h === 1200) return [16, 10];
      else if (h === 1440) return [4, 3];
      break;
    case 2048:
      if (h === 1536) return [4, 3];
      break;
    case 2560:
      if (h === 1440) return [16, 9];
      else if (h === 1600) return [16, 10];
      break;
    case 3840:
      if (h === 2160) return [16, 9];
      break;
    default:
      break;
  }
  return;
};

export const getResizeSpec = (
  img: HTMLImageElement,
): [1920, 1080 | 1200 | 1440] => {
  const h = img.naturalHeight;
  switch (img.naturalWidth) {
    case 1920:
      if (h === 1080) return [1920, 1080];
      else if (h === 1200) return [1920, 1200];
      else if (h === 1440) return [1920, 1440];
      break;
    case 2048:
      if (h === 1536) return [1920, 1440];
      break;
    case 2560:
      if (h === 1440) return [1920, 1080];
      else if (h === 1600) return [1920, 1200];
      break;
    case 3840:
      if (h === 2160) return [1920, 1080];
      break;
    default:
      break;
  }
  return [1920, 1080];
};

export const getAddressBase64 = (img: HTMLImageElement): string | false => {
  // Check aspect ratio (16:9, 16:10, 4:3)
  const aspectRatio = getAspectRatio(img);
  if (!aspectRatio) return false;

  // Resize
  const canvas = document.createElement('canvas');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext('2d')!;
  const [canvasWidth, canvasHeight] = getResizeSpec(img);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    0,
    0,
    canvasWidth,
    canvasHeight,
  );

  // Crop portal address
  const cropProfile = CROP_PROFILES[canvasWidth][canvasHeight];
  const addrImage = ctx.getImageData(
    cropProfile.x,
    cropProfile.y,
    cropProfile.box * 12,
    cropProfile.box,
  );
  const addrCanvas = document.createElement('canvas');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const addrCtx = addrCanvas.getContext('2d')!;
  addrCanvas.width = cropProfile.box * 12;
  addrCanvas.height = cropProfile.box;
  addrCtx.putImageData(addrImage, 0, 0);

  // Convert to Base64
  return addrCanvas.toDataURL('image/jpeg', 0.9);
};
