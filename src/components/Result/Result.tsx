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
      <Center>
        {addrArray ? (
          addrArray.map((_, idx) => (
            <ResultGlyph
              key={`${id}-${idx}`}
              addrArray={addrArray}
              setAddrArray={setAddrArray}
              index={idx}
            />
          ))
        ) : (
          <Center
            border='1px'
            borderColor='gray'
            aspectRatio='384 / 32'
            // aspectRatio='384 / 55'
            borderTop='none'
            width='100%'
            maxW='384px'
          >
            <Text color='gray'>Result</Text>
          </Center>
        )}
      </Center>
    </>
  );
};
