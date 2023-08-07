import { Center, Text } from '@chakra-ui/react';
import { useId } from 'react';

import { ResultGlyph } from './ResultGlyph';

import type { AddressArray } from '@/types';

interface ResultProps {
  addrArray: AddressArray | undefined;
  setAddrArray: (addrArray: AddressArray | undefined) => void;
}

export const Result = ({ ...props }: ResultProps) => {
  const { addrArray, setAddrArray } = props;

  const id = useId();

  return (
    <>
      <Center mb='6'>
        {addrArray ? (
          addrArray.map((_, idx) => (
            <ResultGlyph
              addrArray={addrArray}
              index={idx}
              key={`${id}-${idx}`}
              setAddrArray={setAddrArray}
            />
          ))
        ) : (
          <Center aspectRatio='384 / 32' border='1px' maxW='384px' width='100%'>
            <Text color='gray'>Result</Text>
          </Center>
        )}
      </Center>
    </>
  );
};
