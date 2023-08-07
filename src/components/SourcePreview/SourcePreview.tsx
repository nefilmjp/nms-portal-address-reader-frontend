import { Center, Image, Text } from '@chakra-ui/react';

interface SourcePreviewProps {
  source: string | undefined;
}

export const SourcePreview = ({ ...props }: SourcePreviewProps) => {
  const { source } = props;

  return (
    <Center mt='6'>
      {source ? (
        <Image
          alt=''
          aspectRatio='384 / 32'
          maxW='384px'
          objectFit='contain'
          src={source}
          w='100%'
        />
      ) : (
        <Center
          aspectRatio='384 / 32'
          border='1px'
          borderBottom='none'
          maxW='384px'
          w='100%'
        >
          <Text color='gray'>Source</Text>
        </Center>
      )}
    </Center>
  );
};
