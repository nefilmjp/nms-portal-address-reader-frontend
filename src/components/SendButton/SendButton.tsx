import { Button, Center } from '@chakra-ui/react';
import { useState } from 'react';

interface SendButtonProps {
  source: string | undefined;
  profile: string;
  addrArray: number[] | undefined;
  setAddrArray: (addrArray: number[]) => void;
}

const apiUrl = process.env['NEXT_PUBLIC_API_URL']
  ? process.env['NEXT_PUBLIC_API_URL']
  : '';

export const SendButton = ({ ...props }: SendButtonProps) => {
  const { source, profile, addrArray, setAddrArray } = props;

  const [isBusy, setIsBusy] = useState<boolean>(false);

  return (
    <Center mt='8'>
      <Button
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
            .then((res) => res.json())
            .then((json) => {
              setAddrArray(json.result);
            })
            .catch(() => false);
          setIsBusy(false);
        }}
      >
        Send
      </Button>
    </Center>
  );
};
