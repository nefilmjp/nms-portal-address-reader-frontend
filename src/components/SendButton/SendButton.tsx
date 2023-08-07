import {
  Box,
  Button,
  Center,
  Modal,
  ModalOverlay,
  Spinner,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';

import { API_URL } from '@/config';

import type { AddressArray, AppSettings, RecognitionProfile } from '@/types';

interface SendButtonProps {
  options: AppSettings;
  source: string | undefined;
  addrArray: AddressArray | undefined;
  setAddrArray: (addrArray: AddressArray | undefined) => void;
}

export const SendButton = ({ ...props }: SendButtonProps) => {
  const { options, source, addrArray, setAddrArray } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    if (options.sendImmediately && source)
      onClick(options.profile || 'pc', source);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const onClick = useMemo(
    () => async (profile: RecognitionProfile, source: string) => {
      onOpen();
      setIsBusy(true);
      await fetch(`${API_URL}/api/parse`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: source,
          profile,
        }),
      })
        .then((res) => {
          if (res.ok) return res.json();
          toast({
            title: 'Processing failed.',
            description: 'Failed to process the image.',
            status: 'error',
            duration: 10000,
            isClosable: true,
          });
          return false;
        })
        .then((json) => {
          if (json) setAddrArray(json.result);
          else setAddrArray(undefined);
        })
        .catch(() => {
          setAddrArray(undefined);
          toast({
            title: 'The server is not responding.',
            description: 'Network error or server is offline.',
            status: 'error',
            duration: 10000,
            isClosable: true,
          });
        });
      setIsBusy(false);
      onClose();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <>
      {!options.sendImmediately && (
        <Center mt='6'>
          <Button
            isDisabled={!source || isBusy || Boolean(addrArray)}
            onClick={() => onClick(options.profile || 'pc', source!)} // eslint-disable-line @typescript-eslint/no-non-null-assertion
            size='lg'
          >
            Send
          </Button>
        </Center>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay>
          <Box
            alignItems='center'
            display='flex'
            h='100dvh'
            justifyContent='center'
          >
            <Spinner
              color='blue.500'
              emptyColor='gray.200'
              size='xl'
              speed='0.65s'
              thickness='4px'
            />
          </Box>
        </ModalOverlay>
      </Modal>
    </>
  );
};
