import { Center, Image, Text } from '@chakra-ui/react';

interface SourcePreviewProps {
  source: string | undefined;
}

export const SourcePreview = ({ ...props }: SourcePreviewProps) => {
  const { source } = props;

  return (
    <Center mt='6'>
      {source ? (
        <Image src={source} alt='' aspectRatio='384 / 32' objectFit='contain' />
      ) : (
        <Center
          border='1px'
          borderBottom='none'
          aspectRatio='384 / 32'
          width='100%'
          maxW='384px'
        >
          <Text color='gray'>Source</Text>
        </Center>
      )}
    </Center>
  );
};
