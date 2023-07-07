import {
  Button,
  Center,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import { useMemo } from 'react';

import { addrArrayToDec, addrArrayToHex } from '@/utils/converter';

interface ResultProps {
  addrArray: number[] | undefined;
}

export const Result = ({ ...props }: ResultProps) => {
  const { addrArray } = props;

  const dec = useMemo(
    () => (addrArray ? addrArrayToDec(addrArray) : undefined),
    [addrArray],
  );

  const hex = useMemo(
    () => (addrArray ? addrArrayToHex(addrArray) : undefined),
    [addrArray],
  );

  return (
    <>
      <Center>
        {hex ? (
          <Center color='white' bgColor='black' aspectRatio='384 / 32'>
            <Text
              className='ff-glyphs'
              fontSize='min(32px, calc((100vw - 32px) / 12))'
              letterSpacing='0'
              fontWeight='400'
              aspectRatio='384 / 32'
              textShadow='0 0 4px #fff, 0 0 2px #fff'
              lineHeight='1'
              overflow='hidden'
            >
              {hex}
            </Text>
          </Center>
        ) : (
          <Center
            border='1px'
            borderColor='gray'
            aspectRatio='384 / 32'
            borderTop='none'
            width='100%'
            maxW='384px'
          >
            <Text color='gray'>Result</Text>
          </Center>
        )}
      </Center>
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
