import {
  Alert,
  AlertIcon,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useMemo, useState } from 'react';

import { extendedFetch } from '@/utils/extendedFetch';
import { getAddressBase64, loadImage } from '@/utils/fileValidator';

interface SourceDownloadProps {
  setSource: (base64: string | undefined) => void;
}

export const SourceDownload = ({ ...props }: SourceDownloadProps) => {
  const { setSource } = props;

  const toast = useToast();

  const [downloadUrl, setSourceDownloadUrl] = useState<string | undefined>();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const handleInput = useMemo(
    () => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      try {
        const url = new URL(value);

        if (url.protocol !== 'https:' && url.protocol !== 'http:')
          throw new Error('Invalid protocol');

        if (url.pathname.length < 2) throw new Error('Pathname too short');

        if (
          url.hostname === 'pbs.twimg.com' &&
          url.searchParams.get('name') &&
          url.searchParams.get('name') !== 'orig'
        ) {
          url.searchParams.get('name');
          url.searchParams.delete('name');
          url.searchParams.append('name', 'orig');
        }

        setSourceDownloadUrl(url.href);
      } catch {
        setSourceDownloadUrl(undefined);
      }
    },
    [],
  );

  const handleDownload = useMemo(
    () => async (downloadUrl: string) => {
      setSource(undefined);
      if (!downloadUrl) return;
      setIsBusy(true);
      await extendedFetch(downloadUrl, {
        timeout: 10000,
        maxRetryCount: 0,
      })
        .then((res) => res.blob())
        .then(async (blob) => {
          fetch;
          if (blob.type === 'image/jpeg' || blob.type === 'image/png') {
            const img = await loadImage(blob);
            const base64 = getAddressBase64(img);
            if (base64) setSource(base64);
            else {
              toast({
                title: 'Invalid image.',
                description:
                  'The image does not acceptable. Mostly, the size is wrong.',
                status: 'error',
                duration: 10000,
                isClosable: true,
              });
              setSource(undefined);
            }
          } else {
            toast({
              title: 'Invalid type.',
              description: 'Only JPEG or PNG can be accepted.',
              status: 'error',
              duration: 10000,
              isClosable: true,
            });
          }
        })
        .catch(() => {
          toast({
            title: 'SourceDownload failed.',
            description: 'Server is not responding.',
            status: 'error',
            duration: 10000,
            isClosable: true,
          });
        });
      setIsBusy(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div>
      <InputGroup size='md'>
        <Input
          border='1px'
          borderColor='blue.800'
          bgColor='blue.50'
          pr='6.5rem'
          type='text'
          placeholder='Enter the image URL'
          isDisabled={isBusy}
          onChange={handleInput}
        />
        <InputRightElement width='6.5rem'>
          <Button
            colorScheme='blue'
            fontWeight='400'
            h='1.75rem'
            size='sm'
            isDisabled={!downloadUrl || isBusy}
            onClick={() => {
              if (downloadUrl) handleDownload(downloadUrl);
            }}
          >
            Download
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
