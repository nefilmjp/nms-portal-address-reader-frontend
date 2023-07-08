import type { AddressArray } from '@/types';

/**
 * Conver portal address to string (12-digit hex)
 * @param arr - Int array of portal address
 * @returns 12-digit hex as string
 */
export const addrArrayToHex = (arr: AddressArray): string =>
  arr
    .map((num) => num.toString(16))
    .join('')
    .toUpperCase();

/**
 * Conver portal address to string (decimal CSV)
 * @param arr - Int array of portal address
 * @returns 12-elements decimal array as string
 */
export const addrArrayToDec = (arr: AddressArray): string =>
  arr.map((num) => (num + 1).toString(10)).join(',');
