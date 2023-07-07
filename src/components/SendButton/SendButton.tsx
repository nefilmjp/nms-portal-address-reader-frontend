import { Button, Center, useToast } from '@chakra-ui/react';
import { useState } from 'react';

interface SendButtonProps {
  source: string | undefined;
  profile: string;
  addrArray: number[] | undefined;
  setAddrArray: (addrArray: number[] | undefined) => void;
}

const apiUrl = process.env['NEXT_PUBLIC_API_URL']
  ? process.env['NEXT_PUBLIC_API_URL']
  : '';

export const SendButton = ({ ...props }: SendButtonProps) => {
  const { source, profile, addrArray, setAddrArray } = props;

  const [isBusy, setIsBusy] = useState<boolean>(false);

  const toast = useToast();

  return (
    <Center mt='6'>
      <Button
        size='lg'
        colorScheme='blue'
        isDisabled={!source || isBusy || Boolean(addrArray)}
        onClick={async () => {
          setIsBusy(true);
          await fetch(`${apiUrl}/api/parse`, {
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
                title: 'Server not respond.',
                description: 'Network error or server is dead.',
                status: 'error',
                duration: 10000,
                isClosable: true,
              });
            });
          setIsBusy(false);
        }}
      >
        Send
      </Button>
    </Center>
  );
};
