import { Button, HStack, Input, useToast } from '@chakra-ui/react';
import { ChangeEvent, useMemo, useState } from 'react';

import { extendedFetch } from '@/utils/extendedFetch';
import { getAddressBase64, loadImage } from '@/utils/fileValidator';

interface SourceDownloadProps {
  setSource: (base64: string | undefined) => void;
}

export const SourceDownload = ({ ...props }: SourceDownloadProps) => {
  const { setSource } = props;

  const toast = useToast();

  const [value, setValue] = useState('');
  const [downloadUrl, setDownloadUrl] = useState<string | undefined>();
  const [isBusy, setIsBusy] = useState<boolean>(false);

  const handleInput = useMemo(
    () => (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setValue(value);
      try {
        if (!value) throw new Error('Empty');

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

        setDownloadUrl(url.href);
      } catch {
        setDownloadUrl(undefined);
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
            title: 'Download failed.',
            description: 'The server is not responding.',
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
    <>
      <Input
        size='lg'
        border='1px'
        type='text'
        placeholder='Enter the URL'
        isDisabled={isBusy}
        onChange={handleInput}
        value={value}
      />
      <HStack mt='4' spacing='4' justifyContent='center'>
        <Button
          variant='outline'
          isDisabled={!value || isBusy}
          onClick={() => {
            setValue('');
            setDownloadUrl(undefined);
          }}
        >
          Reset
        </Button>
        <Button
          isDisabled={!downloadUrl || isBusy}
          onClick={() => {
            if (downloadUrl) handleDownload(downloadUrl);
          }}
        >
          Download
        </Button>
      </HStack>
    </>
  );
};
