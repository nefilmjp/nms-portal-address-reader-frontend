import { Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useMemo } from 'react';

import { addrArrayToDec } from '@/utils/converter';

import type { AddressArray } from '@/types';

interface ResultOutputProps {
  addrArray: AddressArray | undefined;
}

export const OutputDecimal = ({ ...props }: ResultOutputProps) => {
  const { addrArray } = props;

  const dec = useMemo(
    () => (addrArray ? addrArrayToDec(addrArray, ',', 1) : undefined),
    [addrArray],
  );

  return (
    <InputGroup size='md'>
      <Input
        isDisabled={!dec}
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
  );
};
