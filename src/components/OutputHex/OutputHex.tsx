import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMemo } from 'react';

import { addrArrayToHex } from '@/utils/converter';

import type { AddressArray } from '@/types';

interface ResultOutputProps {
  addrArray: AddressArray | undefined;
}

export const OutputHex = ({ ...props }: ResultOutputProps) => {
  const { addrArray } = props;

  const hex = useMemo(
    () => (addrArray ? addrArrayToHex(addrArray) : undefined),
    [addrArray],
  );

  return (
    <InputGroup size='md'>
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
  );
};
