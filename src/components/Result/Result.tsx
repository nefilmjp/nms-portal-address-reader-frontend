import {
  Box,
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
      <Box
        mt='8'
        border='1px'
        borderRadius='md'
        borderColor={hex ? 'gray.200' : 'gray.100'}
      >
        <Center h='64px'>
          {hex ? (
            <Text fontSize='4xl' className='ff-glyphs'>
              {hex}
            </Text>
          ) : (
            <Text color='gray.400'>Portal Glyphs</Text>
          )}
        </Center>
      </Box>
      <InputGroup mt='4' size='md'>
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
