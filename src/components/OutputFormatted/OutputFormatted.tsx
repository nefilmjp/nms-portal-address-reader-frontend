import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMemo } from 'react';

import { addrArrayToHex } from '@/utils/converter';

import type { AddressArray, AppSettings } from '@/types';

interface FormattedOutputProps {
  options: AppSettings;
  addrArray: AddressArray | undefined;
}

export const OutputFormatted = ({ ...props }: FormattedOutputProps) => {
  const { options, addrArray } = props;

  const formatHex = useMemo(
    () => (str: string) =>
      str
        .split('')
        .map(
          (letter) => `${options.prefix || ''}${letter}${options.suffix || ''}`,
        )
        .join(options.delimiter || ''),
    [options.delimiter, options.prefix, options.suffix],
  );

  const formatDec = useMemo(
    () => (addrArray: AddressArray) =>
      addrArray
        .map(
          (letter) => `${options.prefix || ''}${letter}${options.suffix || ''}`,
        )
        .join(options.delimiter || ''),
    [options.delimiter, options.prefix, options.suffix],
  );

  const formatted = useMemo(() => {
    if (!addrArray) return undefined;

    switch (options.format) {
      case 'hexL':
        return formatHex(addrArrayToHex(addrArray).toLowerCase());
      case 'dec1':
        return formatDec(addrArray.map((l) => l + 1) as AddressArray);
      case 'dec0':
        return formatDec(addrArray);
      case 'hexU':
      default:
        return formatHex(addrArrayToHex(addrArray));
    }
  }, [addrArray, options, formatHex, formatDec]);

  return (
    <>
      <InputGroup size='md'>
        <Input
          isDisabled={!formatted}
          placeholder='User-specified format'
          pr='4.5rem'
          type='text'
          value={formatted || ''}
        />
        <InputRightElement width='4.5rem'>
          <Button
            h='1.75rem'
            isDisabled={!formatted}
            size='sm'
            onClick={() => {
              navigator.clipboard.writeText(formatted || '');
            }}
          >
            Copy
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};
