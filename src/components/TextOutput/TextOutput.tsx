import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMemo } from 'react';

import { addrArrayToDec, addrArrayToHex } from '@/utils/converter';

import type { AddressArray, AppSettings } from '@/types';

interface ResultOutputProps {
  options: AppSettings;
  addrArray: AddressArray | undefined;
}

export const TextOutput = ({ ...props }: ResultOutputProps) => {
  const { options, addrArray } = props;

  const dec = useMemo(
    () => (addrArray ? addrArrayToDec(addrArray, ',', 1) : undefined),
    [addrArray],
  );

  const hex = useMemo(
    () => (addrArray ? addrArrayToHex(addrArray) : undefined),
    [addrArray],
  );

  return (
    <>
      {!options.disableDecimal && (
        <InputGroup mt='4' size='md'>
          <Input
            isDisabled={!hex}
            placeholder='Comma-separated decimal'
            pr='4.5rem'
            type='text'
            value={dec || ''}
          />
          <InputRightElement width='4.5rem'>
            <Button
              h='1.75rem'
              isDisabled={!dec}
              size='sm'
              onClick={() => {
                navigator.clipboard.writeText(dec || '');
              }}
            >
              Copy
            </Button>
          </InputRightElement>
        </InputGroup>
      )}
      {!options.disableHex && (
        <InputGroup mt='4' size='md'>
          <Input
            isDisabled={!hex}
            placeholder='12-digit hex'
            pr='4.5rem'
            type='text'
            value={hex || ''}
          />
          <InputRightElement width='4.5rem'>
            <Button
              h='1.75rem'
              isDisabled={!hex}
              size='sm'
              onClick={() => {
                navigator.clipboard.writeText(hex || '');
              }}
            >
              Copy
            </Button>
          </InputRightElement>
        </InputGroup>
      )}
    </>
  );
};
