import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMemo } from 'react';

import { addrArrayToDec, addrArrayToHex } from '@/utils/converter';

import type { AddressArray } from '@/types';

interface ResultOutputProps {
  addrArray: AddressArray | undefined;
}

export const ResultOutput = ({ ...props }: ResultOutputProps) => {
  const { addrArray } = props;

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
      <InputGroup mt='6' size='md'>
        <Input
          pr='4.5rem'
          type='text'
          value={dec || ''}
          placeholder='Comma-separated decimal'
          isDisabled={!hex}
        />
        <InputRightElement width='4.5rem'>
          <Button
            h='1.75rem'
            size='sm'
            onClick={() => {
              navigator.clipboard.writeText(dec || '');
            }}
            isDisabled={!dec}
          >
            Copy
          </Button>
        </InputRightElement>
      </InputGroup>
      <InputGroup mt='4' size='md'>
        <Input
          pr='4.5rem'
          type='text'
          value={hex || ''}
          placeholder='12-digit hex'
          isDisabled={!hex}
        />
        <InputRightElement width='4.5rem'>
          <Button
            h='1.75rem'
            size='sm'
            onClick={() => {
              navigator.clipboard.writeText(hex || '');
            }}
            isDisabled={!hex}
          >
            Copy
          </Button>
        </InputRightElement>
      </InputGroup>
    </>
  );
};
