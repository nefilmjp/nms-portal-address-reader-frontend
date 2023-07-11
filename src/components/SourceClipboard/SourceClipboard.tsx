import { Box, Button, Center, useToast } from '@chakra-ui/react';

import { getAddressBase64, loadImage } from '@/utils/fileValidator';

interface SourceClipboardProps {
  setSource: (base64: string | undefined) => void;
}

export const SourceClipboard = ({ ...props }: SourceClipboardProps) => {
  const { setSource } = props;

  const toast = useToast();

  return (
    <Box>
      <Center>
        <Button
          size='lg'
          onClick={async () => {
            const clipboardItems = await navigator.clipboard.read();
            const pastedImage = clipboardItems.find(
              (item) =>
                item.types.includes('image/jpeg') ||
                item.types.includes('image/png'),
            );
            if (pastedImage) {
              const type = pastedImage.types.includes('image/jpeg')
                ? 'image/jpeg'
                : 'image/png';
              const blob = await pastedImage.getType(type);
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
                title: 'Clipboard does not contain an image.',
                description: 'Only JPEG or PNG can be accepted.',
                status: 'error',
                duration: 10000,
                isClosable: true,
              });
            }
          }}
        >
          Paste from Clipboard
        </Button>
      </Center>
    </Box>
  );
};
