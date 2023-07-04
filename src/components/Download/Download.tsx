import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { ChangeEvent, useMemo, useState } from 'react';

import { extendedFetch } from '@/utils/extendedFetch';

interface DownloadProps {
  setSource: (base64: string | undefined) => void;
}

export const Download = ({ ...props }: DownloadProps) => {
  const {} = props;

  const toast = useToast();

  const [downloadUrl, setDownloadUrl] = useState<string | undefined>();
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
        setDownloadUrl(event.target.value);
      } catch {
        setDownloadUrl(undefined);
      }
    },
    [],
  );

  const handleDownload = useMemo(
    () => async () => {
      console.log('handleDownload', downloadUrl);
      if (!downloadUrl) return;
      setIsBusy(true);
      await extendedFetch(downloadUrl, {
        timeout: 10000,
        maxRetryCount: 0,
      })
        .then((res) => res.blob)
        .then((blob) => {
          if (
            blob instanceof File &&
            (blob.type === 'image/jpeg' || blob.type === 'image/png')
          ) {
          } else {
            toast({
              title: 'Invalid type.',
              description: 'Only JPEG or PNG files can be accepted.',
              status: 'error',
              duration: 10000,
              isClosable: true,
            });
          }
        })
        .catch(() => {
          toast({
            title: 'Download failed.',
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
          pr='6.5rem'
          type='text'
          placeholder='Enter an image URL'
          isDisabled={isBusy}
          onChange={handleInput}
        />
        <InputRightElement width='6.5rem'>
          <Button
            h='1.75rem'
            size='sm'
            isDisabled={!downloadUrl || isBusy}
            onClick={handleDownload}
          >
            Download
          </Button>
        </InputRightElement>
      </InputGroup>
    </div>
  );
};
