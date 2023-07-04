export const addrArrayToHex = (arr: number[]): string =>
  arr
    .map((num) => num.toString(16))
    .join('')
    .toUpperCase();

export const addrArrayToDec = (arr: number[]): string =>
  arr.map((num) => (num + 1).toString(10)).join(',');
