import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMemo } from 'react';

import { addrArrayToHex } from '@/utils/converter';

import type { AddressArray, AppSettings } from '@/types';

interface FormattedOutputProps {
  options: AppSettings;
  addrArray: AddressArray | undefined;
}

export const FormattedOutput = ({ ...props }: FormattedOutputProps) => {
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

  if (!options.formattedOutput) return null;

  return (
    <>
      <InputGroup mt='4' size='md'>
        <Input
          pr='4.5rem'
          type='text'
          value={formatted || ''}
          placeholder='User-specified format'
          isDisabled={!formatted}
        />
        <InputRightElement width='4.5rem'>
          <Button
            h='1.75rem'
            size='sm'
            onClick={() => {
              navigator.clipboard.writeText(formatted || '');
            }}
            isDisabled={!formatted}
          >
            Copy
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};
