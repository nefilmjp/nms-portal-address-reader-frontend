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

import type { AddressArray, ImageProfile, Options } from '@/types';

interface SendButtonProps {
  options: Options;
  source: string | undefined;
  profile: ImageProfile;
  addrArray: AddressArray | undefined;
  setAddrArray: (addrArray: AddressArray | undefined) => void;
}

export const SendButton = ({ ...props }: SendButtonProps) => {
  const { options, source, profile, addrArray, setAddrArray } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    if (options.sendImmediately && source) onClick(profile, source);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const onClick = useMemo(
    () => async (profile: ImageProfile, source: string) => {
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
            description: 'Network error or server is dead.',
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
            size='lg'
            isDisabled={!source || isBusy || Boolean(addrArray)}
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            onClick={() => onClick(profile, source!)}
          >
            Send
          </Button>
        </Center>
      )}
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            h='100dvh'
          >
            <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Box>
        </ModalOverlay>
      </Modal>
    </>
  );
};
